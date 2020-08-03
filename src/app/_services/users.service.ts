import {Injectable} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private authenticatedSubject: Subject<boolean>;
  public authenticated: Observable<boolean>;
  constructor(private http: HttpClient) {
    this.authenticatedSubject = new Subject();
    this.authenticated = this.authenticatedSubject.asObservable();
    this.isAuth();
  }

  getUsers() {
    return this.http.get(environment.host + '/users');
  }

  createUser(value) {
    this.http.post(environment.host + '/register', value, {
      withCredentials: true
    })
      .subscribe(
      (res) => {
        console.log(res);
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
      }, (err) => {
        this.authenticatedSubject.next(false);
        err.error ? console.error(err.error)
          : console.log('Unknown error has occurred!');
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
