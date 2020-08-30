import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {UserError} from '../models/errors/user.error';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private authenticatedSubject: Subject<boolean>;
  public authenticated: Observable<boolean>;
  private authenticationErrSubject: Subject<UserError>;
  public authenticationErr: Observable<UserError>;
  constructor(private http: HttpClient, private router: Router) {
    this.authenticatedSubject = new Subject();
    this.authenticationErrSubject = new Subject();
    this.authenticated = this.authenticatedSubject.asObservable();
    this.authenticationErr = this.authenticationErrSubject.asObservable();
    this.isAuth();
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
        console.log(res && res.firstName && res.lastName ?
          `Welcome ${res.firstName} ${res.lastName}` : 'Logged in!');
        this.router.navigate(['/']).then();
      }, (err) => {
        this.authenticatedSubject.next(false);
        err.error ? this.authenticationErrSubject.next({error: {message: err.error.message, code: err.error.status}})
          : this.authenticationErrSubject.next({error: {message: 'Unknown error has occurred!', code: 502}});
      }
    );
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
    }, () => {
      console.log('Oops, something went wrong getting the logged in status');
    });
  }
  isLoggedIn() {
    return this.http.get(environment.host + '/session', {
      withCredentials: true
    }).pipe(map(res => {
      return res;
    }));
  }
}
