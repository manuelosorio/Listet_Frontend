import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(window.location.protocol + '//' + window.location.hostname + ':3000/users');
  }

  createUser(value) {
    const postUrl = window.location.protocol + '//' + window.location.hostname + ':3000/register';
    this.http.post(postUrl, value)
      .subscribe(
      (res) => {
        console.log(res);
      }
    );
  }
}
