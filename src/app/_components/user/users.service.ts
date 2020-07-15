import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  authenticated: Subject<boolean>;
  constructor(private http: HttpClient) {
    this.authenticated = new Subject();
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
        this.authenticated.next(true);
        console.log(res && res.firstName && res.lastName ?
          `Welcome ${res.firstName} ${res.lastName}` : 'Logged in!');
      }, (err) => {
        this.authenticated.next(false);
        err.error ? console.error(err.error)
          : console.log('Unknown error has occurred!');
      }
    );
  }
  logoutUser() {
    this.http.post(environment.host + '/logout', {}, {
      withCredentials: true
    }).subscribe(() => {
      this.authenticated.next(false);
    });
  }
  isAuth() {
    return this.http.get(environment.host + '/session', {
      withCredentials: true
    }).subscribe((res: any) => {
      this.authenticated.next(res.authenticated);
      console.log(res.authenticated);
    }, () => {
      console.log('Oops, something went wrong getting the logged in status');
    });
  }
}
