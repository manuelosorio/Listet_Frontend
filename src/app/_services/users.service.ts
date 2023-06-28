import { Injectable, OnDestroy } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
  BehaviorSubject,
  catchError,
  Observable,
  of,
  Subject,
  takeUntil,
  throwError,
} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorResponse } from '../models/response/errors/error.response';
import { AlertService } from './alert.service';
import { UserModel, UserResponse } from '../models/user.model';
import { EndpointResponse } from '../models/response/endpoint.response';

@Injectable({
  providedIn: 'root',
})
export class UsersService implements OnDestroy {
  authenticated: boolean;
  private authenticatedSubject: BehaviorSubject<boolean>;
  public authenticated$: Observable<boolean>;

  private verifiedSubject: Subject<boolean>;
  public verified: Observable<boolean>;

  userInfo: UserModel;
  private userInfoSubject: BehaviorSubject<UserModel>;
  public userInfo$: Observable<UserModel>;

  private authenticationErrSubject: Subject<ErrorResponse>;
  public authenticationErr: Observable<ErrorResponse>;

  private onDestroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
  constructor(
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router
  ) {
    this.userInfo = {} as UserModel;
    this.authenticated = false;
    this.authenticatedSubject = new BehaviorSubject<boolean>(
      this.authenticated
    );
    this.authenticationErrSubject = new Subject();
    this.authenticated$ = this.authenticatedSubject.asObservable();
    this.authenticationErr = this.authenticationErrSubject.asObservable();
    this.verifiedSubject = new Subject();
    this.verified = this.verifiedSubject.asObservable();
    this.userInfoSubject = new BehaviorSubject(this.userInfo);
    this.userInfo$ = this.userInfoSubject.asObservable();
    this.isAuth().subscribe();
    this.isVerified();
  }

  getUsers() {
    return this.http.get(environment.host + '/users');
  }

  createUser(value: any) {
    return this.http
      .post(environment.host + '/register', value, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/login']).then();
        },
        error: err => {
          if (err) {
            this.authenticationErrSubject.next({
              error: { message: err.error.message, code: err.status },
            });
            console.error(err.error.message);
          }
        },
      });
  }

  loginUser(value: any, returnURL: string) {
    this.http
      .post(environment.host + '/login', value, {
        withCredentials: true,
      })
      .subscribe({
        next: (response: unknown) => {
          const res = response as UserResponse;
          this.authenticatedSubject.next(true);
          this.userInfoSubject.next({
            email: res.email,
            firstName: res.firstName,
            lastName: res.lastName,
            username: res.username,
          });
          res && res.firstName && res.lastName
            ? this.alertService.success(
                `Welcome back, ${res.firstName} ${res.lastName}`
              )
            : this.alertService.success('Welcome back!');
          if (!res.verified) {
            this.alertService.warning(
              'In order to use this site your account must be verified. Check your inbox or spam folder.',
              null,
              10000,
              true
            );
          }
          setTimeout(() => {
            this.router.navigate([returnURL ?? '/']).then();
          }, 1000);
        },
        error: err => {
          this.authenticatedSubject.next(false);
          err.error
            ? this.authenticationErrSubject.next({
                error: {
                  message: err.error.message,
                  code: err.error.status,
                },
              })
            : this.authenticationErrSubject.next({
                error: {
                  message: 'Unknown error has occurred!',
                  code: 502,
                },
              });
        },
      });
  }

  requestPasswordReset(value: any) {
    this.http
      .post(environment.host + '/reset-password', value, {
        withCredentials: true,
      })
      .subscribe({
        next: (response: unknown) => {
          const res = response as EndpointResponse;
          this.alertService.success(res.message, null, 5000, true);
          setTimeout(() => {
            this.router.navigate(['/login']).then(() => {
              this.isVerified();
            });
          }, 2500);
        },
        error: err => {
          if (err) {
            console.error(err);
          }
        },
      });
  }

  resetPassword(token: string, value: any) {
    this.http
      .put(environment.host + '/reset-password/' + token, value, {
        withCredentials: true,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['/login']).then();
        },
        error: err => {
          if (err) {
            this.alertService.warning(
              'Reset token has expired or been deleted',
              {
                text: 'Create new token',
                url: '/forgot-password',
              },
              30000,
              true
            );
          }
        },
      });
  }

  logoutUser() {
    this.http
      .post(
        environment.host + '/logout',
        {},
        {
          withCredentials: true,
        }
      )
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.authenticatedSubject.next(false);
      });
  }

  setAuthenticated(value: boolean) {
    this.authenticatedSubject.next(value);
  }
  isAuth() {
    return this.http
      .get(environment.host + '/session', {
        withCredentials: true,
      })
      .pipe(
        map((response: unknown) => {
          const res = response as UserResponse;
          console.log('isAuth response: ', res);
          this.authenticatedSubject.next(res.authenticated);
          this.userInfoSubject.next({
            email: '',
            firstName: res.firstName,
            lastName: res.lastName,
            username: res.username,
          });
          return res.authenticated;
        }),
        catchError(err => {
          console.info('Error: ', { environment });
          // console.error(err);
          // if (err.error) {
          //   this.authenticationErrSubject.next({
          //     error: { message: err.error.message, code: err.status },
          //   });
          //   console.error(err.error.message);
          // }
          return of(false);
        }),
        takeUntil(this.onDestroy$)
      );
  }

  isVerified() {
    return this.http
      .get(environment.host + '/session', {
        withCredentials: true,
      })
      .subscribe({
        next: (response: unknown) => {
          const res = response as any;
          this.verifiedSubject.next(res.verified);
          if (res.verified === false) {
            this.alertService.warning(
              'In order to use this site your account must be verified. Check your inbox or spam folder.',
              {
                text: 'Generate a new token',
                url: '#',
              },
              0,
              true
            );
          }
        },
        error: () => {
          this.alertService.error(
            'Oops, something went wrong getting the verification status'
          );
        },
      });
  }

  isLoggedIn() {
    return this.http
      .get(environment.host + '/session', {
        withCredentials: true,
      })
      .pipe(
        map(res => {
          return res as UserResponse;
        })
      );
  }

  verifyAccount(token: string) {
    return this.http
      .get(environment.host + '/verify-account/' + token, {
        withCredentials: true,
      })
      .subscribe({
        next: _res => {
          this.router.navigate(['/']).then();
        },
        error: err => {
          console.error(err);
        },
      });
  }

  changePassword(data: any) {
    return this.http.put(`${environment.host}/update-password`, data, {
      withCredentials: true,
    });
  }
  updateAccountInfo(data: UserModel) {
    return this.http
      .put(`${environment.host}/update-account-info`, data, {
        withCredentials: true,
      })
      .subscribe({
        next: (response: unknown) => {
          const res = response as EndpointResponse;
          this.alertService.success(res.message);
          this.userInfoSubject.next(data);
        },
        error: (error: ErrorResponse) => {
          console.error(error);
          this.alertService.error(error.error.message);
        },
      });
  }
  deactivateAccount(data: string) {
    return this.http
      .put(environment.host + '/deactivate-account', data, {
        withCredentials: true,
      })
      .subscribe({
        next: response => {
          const res = response as EndpointResponse;
          if (!!res.status) {
            return this.alertService.warning(res.message, null, 0, true);
          }
          this.router.navigateByUrl('/').then(() => {
            this.router.navigated = false;
            this.router.navigate([this.router.url]).then(() => {});
          });
          return this.alertService.success(res.message);
        },
        error: (error: ErrorResponse) => {
          console.error(error);
          this.alertService.error(error.error.message);
        },
      });
  }
  reactivateAccount(data: unknown) {
    return this.http.put(`${environment.host}/reactivate-account`, data, {
      withCredentials: true,
    });
  }

  deleteAccount(data: string) {
    return this.http
      .delete(environment.host + '/delete-account', {
        withCredentials: true,
        body: data,
      })
      .subscribe({
        next: (response: unknown) => {
          const res = response as EndpointResponse;
          if (!!res.status) {
            return this.alertService.warning(res.message, null, 0, true);
          }
          this.router.navigateByUrl('/').then(() => {
            this.router.navigated = false;
            this.router.navigate([this.router.url]).then(r => {});
          });
          return this.alertService.success(res.message, null, 0, true);
        },
        error: (error: ErrorResponse) => {
          console.error(error);
          this.alertService.error(error.error.message);
        },
      });
  }
}
