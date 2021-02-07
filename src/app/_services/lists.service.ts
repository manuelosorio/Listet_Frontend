import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private commentSubject$: Subject<any>;
  public comment$: Observable<any>;

  constructor(private http: HttpClient) {
    this.commentSubject$ = new Subject<any>();
    this.comment$ = this.commentSubject$.asObservable();
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

  getListComments(username, slug) {
    return this.http.get(environment.host + `/list/${username}/${slug}/comments`).subscribe((data) => {
      this.commentSubject$.next(data);
    });
  }


  createList(data) {
    return this.http.post(environment.host + '/create-list', data, {
      withCredentials: true
    });
  }
  createComment(data) {
    return this.http.post(environment.host + '/create-comment', data, {
      withCredentials: true
    });
  }

  createListItem(data) {
    return this.http.post(environment.host + '/add-item', data, {
      withCredentials: true
    })
  }
}
