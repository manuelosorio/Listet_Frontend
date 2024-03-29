import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorResponse } from '../models/response/errors/error.response';
import { AlertService } from './alert.service';
import { UserModel } from '../models/user.model';
import { EndpointResponse } from '../models/response/endpoint.response';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private authenticated: boolean;
  private authenticatedSubject: BehaviorSubject<boolean>;
  public authenticated$: Observable<boolean>;

  private verifiedSubject: Subject<boolean>;
  public verified: Observable<boolean>;

  private userInfo: UserModel;
  private userInfoSubject: BehaviorSubject<UserModel>;
  public userInfo$: Observable<UserModel>;

  private authenticationErrSubject: Subject<ErrorResponse>;
  public authenticationErr: Observable<ErrorResponse>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {
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
    this.isAuth();
    this.isVerified();
  }

  getUsers() {
    return this.http.get(environment.host + '/users');
  }

  createUser(value) {
    return this.http
      .post(environment.host + '/register', value, {
        withCredentials: true,
      })
      .subscribe(
        () => {
          this.router.navigate(['/login']).then();
        },
        err => {
          if (err) {
            this.authenticationErrSubject.next({
              error: { message: err.error.message, code: err.status },
            });
            console.error(err.error.message);
          }
        }
      );
  }

  loginUser(value, returnURL) {
    this.http
      .post(environment.host + '/login', value, {
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
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
            : this.alertService.success(res.message);
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
        err => {
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
        }
      );
  }

  requestPasswordReset(value) {
    this.http
      .post(environment.host + '/reset-password', value, {
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.alertService.success(res.message, null, 5000, true);
          setTimeout(() => {
            this.router.navigate(['/login']).then(() => {
              this.isVerified();
            });
          }, 2500);
        },
        err => {
          if (err) {
            console.error(err);
          }
        }
      );
  }

  resetPassword(token, value) {
    this.http
      .put(environment.host + '/reset-password/' + token, value, {
        withCredentials: true,
      })
      .subscribe(
        () => {
          this.router.navigate(['/login']).then();
        },
        err => {
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
        }
      );
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
      .subscribe(() => {
        this.authenticatedSubject.next(false);
      });
  }

  isAuth() {
    return this.http
      .get(environment.host + '/session', {
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.authenticatedSubject.next(res.authenticated);
          this.userInfoSubject.next({
            email: res.email,
            firstName: res.firstName,
            lastName: res.lastName,
            username: res.username,
          });
        },
        () => {
          this.alertService.error(
            'Oops, something went wrong getting the logged in status'
          );
        }
      );
  }

  isVerified() {
    return this.http
      .get(environment.host + '/session', {
        withCredentials: true,
      })
      .subscribe(
        (res: any) => {
          this.verifiedSubject.next(res.verified);
          if (res.verified === false) {
            this.alertService.warning(
              'In order to use this site your account must be verified. Check your inbox or spam folder.',
              {
                text: 'Generate a new token',
                url: '#',
              },
              null,
              true
            );
          }
        },
        () => {
          this.alertService.error(
            'Oops, something went wrong getting the verification status'
          );
        }
      );
  }

  isLoggedIn() {
    return this.http
      .get(environment.host + '/session', {
        withCredentials: true,
      })
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  verifyAccount(token) {
    return this.http
      .get(environment.host + '/verify-account/' + token, {
        withCredentials: true,
      })
      .subscribe(
        _res => {
          this.router.navigate(['/']).then();
        },
        err => {
          console.error(err);
        }
      );
  }

  changePassword(data) {
    return this.http.put(`${environment.host}/update-password`, data, {
      withCredentials: true,
    });
  }
  updateAccountInfo(data) {
    return this.http
      .put(`${environment.host}/update-account-info`, data, {
        withCredentials: true,
      })
      .subscribe(
        (res: EndpointResponse) => {
          this.alertService.success(res.message);
          this.userInfoSubject.next(data);
        },
        (error: ErrorResponse) => {
          console.error(error);
          this.alertService.error(error.error.message);
        }
      );
  }
  deactivateAccount(data) {
    return this.http
      .put(environment.host + '/deactivate-account', data, {
        withCredentials: true,
      })
      .subscribe(
        (res: EndpointResponse) => {
          if (!!res.status) {
            return this.alertService.warning(res.message);
          }
          this.router.navigate(['/']).then(() => {
            location.reload();
          });
          return this.alertService.success(res.message);
        },
        (error: ErrorResponse) => {
          console.error(error);
          this.alertService.error(error.error.message);
        }
      );
  }
  reactivateAccount(data) {
    return this.http.put(`${environment.host}/reactivate-account`, data, {
      withCredentials: true,
    });
  }

  deleteAccount(data) {
    return this.http
      .delete(environment.host + '/delete-account', {
        withCredentials: true,
        body: data,
      })
      .subscribe(
        (res: EndpointResponse) => {
          if (!!res.status) {
            return this.alertService.warning(res.message);
          }
          this.router.navigate(['/']).then(() => {
            location.reload();
          });
          return this.alertService.success(res.message, null, null, true);
        },
        (error: ErrorResponse) => {
          console.error(error);
          this.alertService.error(error.error.message);
        }
      );
  }
}
