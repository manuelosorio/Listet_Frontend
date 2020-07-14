import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(private http: HttpClient) {
  }
  getLists() {
    return this.http.get(environment.host + '/lists');
  }
}
