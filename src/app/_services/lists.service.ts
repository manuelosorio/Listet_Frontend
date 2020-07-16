import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor(private http: HttpClient) {
  }
  getLists() {
    return this.http.get(environment.host + '/lists');
  }

  getList(username, slug) {
    return this.http.get(environment.host + `/list/${username}/${slug}`);
  }
  getListItems(username, slug) {
    return this.http.get(environment.host + `/list/${username}/${slug}/items`);
  }
  getListComments(id, slug) {
    return this.http.get(environment.host + `/list/${id}/${slug}/comments`);
  }
}
