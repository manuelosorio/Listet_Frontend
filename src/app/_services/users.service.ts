import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UserError} from '../models/errors/user.error';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private authenticatedSubject: Subject<boolean>;
  public authenticated: Observable<boolean>;

  private verifiedSubject: Subject<boolean>;
  public verified: Observable<boolean>;

  private usernameSubject: Subject<string>;
  public username$: Observable<string>;

  private authenticationErrSubject: Subject<UserError>;
  public authenticationErr: Observable<UserError>;
  constructor(
    private http: HttpClient,
    private router: Router,
    private alertService: AlertService
  ) {
    this.authenticatedSubject = new Subject();
    this.authenticationErrSubject = new Subject();
    this.authenticated = this.authenticatedSubject.asObservable();
    this.authenticationErr = this.authenticationErrSubject.asObservable();
    this.verifiedSubject = new Subject();
    this.verified = this.verifiedSubject.asObservable();
    this.usernameSubject = new Subject<string>();
    this.username$ = this.usernameSubject.asObservable();
    this.isAuth();
    this.isVerified();
  }

  getUsers() {
    return this.http.get(environment.host + '/users');
  }

  createUser(value) {
    return this.http.post(environment.host + '/register', value, {
      withCredentials: true
    })
      .subscribe(
      (res) => {
        console.log(res);
        this.router.navigate(['/login']).then();
      }, err => {
        if (err) {
          this.authenticationErrSubject.next({error: {message: err.error.message, code: err.status}});
          console.log(err.error.message);
        }
      }
    );
  }
  loginUser(value) {
    this.http.post(environment.host + '/login', value, {
      withCredentials: true
    }).subscribe(
      (res: any) => {
        this.authenticatedSubject.next(true);
        this.usernameSubject.next(res.username);
        console.log(res && res.firstName && res.lastName ? this.alertService.success(`Welcome ${res.firstName} ${res.lastName}`)
          : this.alertService.success(res.message));
        setTimeout(() => {
          this.router.navigate(['/']).then();
        }, 2000);
      }, (err) => {
        this.authenticatedSubject.next(false);
        err.error ? this.authenticationErrSubject.next({error: {message: err.error.message, code: err.error.status}})
          : this.authenticationErrSubject.next({error: {message: 'Unknown error has occurred!', code: 502}});
      }
    );
  }
  requestPasswordReset(value) {
    this.http.post(environment.host + '/reset-password', value, {
      withCredentials: true
    }).subscribe(
    (res: string) => {
      console.log('response', res);
      console.log('data', value);
      this.router.navigate(['/login']).then();
    }, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
  resetPassword(token, value) {
    this.http.put(environment.host + '/reset-password/' + token, value, {
      withCredentials: true
    }).subscribe(
    (res: string) => {
      console.log('response', res);
      this.router.navigate(['/login']).then();
    }, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
  logoutUser() {
    this.http.post(environment.host + '/logout', {}, {
      withCredentials: true
    }).subscribe(() => {
      this.authenticatedSubject.next(false);
    });
  }
  isAuth() {
    return this.http.get(environment.host + '/session', {
      withCredentials: true
    }).subscribe((res: any) => {

      this.authenticatedSubject.next(res.authenticated);
      this.usernameSubject.next(res.username);
    }, () => {
      console.log('Oops, something went wrong getting the logged in status');
    });
  }
  isVerified() {
    return this.http.get(environment.host + '/session', {
      withCredentials: true
    }).subscribe((res: any) => {
      this.verifiedSubject.next(res.verified);
      if (res.verified === false) {
        console.log(res.verified);
        // this.alertService.warning('In order to use this site your account must be verified. Check your inbox or spam folder.', true);
      }
    }, () => {
      console.log('Oops, something went wrong getting the verification status');
    });
  }
  isLoggedIn() {
    return this.http.get(environment.host + '/session', {
      withCredentials: true
    }).pipe(map(res => {
      return res;
    }));
  }
  verifyAccount(token) {
    return this.http.get(environment.host + '/verify-account/' + token, {
      withCredentials: true
      }
    ).subscribe(res => {
      console.log(res);
      this.router.navigate(['/']);
    });
  }
}
