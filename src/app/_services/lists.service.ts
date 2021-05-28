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

  getList(slug) {
    return this.http.get(environment.host + `/list/${slug}`);
  }
  getListItems(username, slug) {
    return this.http.get(environment.host + `/list/${slug}/items`);
  }

  getListComments(slug) {
    return this.http.get(environment.host + `/list/${slug}/comments`).subscribe((data) => {
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
    });
  }
  completeListItem(data) {
    return this.http.put(environment.host + '/update-item-status', data, {
      withCredentials: true
    });
  }
  updateList(data, id: number) {
    return this.http.put(environment.host + `/update-list/${id}`, data, {
      withCredentials: true
    })
  }
  updateItem(data, id: number) {
    return this.http.put(environment.host + '/update-item/' + id, data, {
      withCredentials: true
    })
  }
  deleteList(id) {
    return this.http.delete(environment.host + `/delete-list/${id}`, {
      withCredentials: true,
    });
  }
  deleteListItem(id) {
    return this.http.delete(environment.host + `/delete-item/${id}`, {
      withCredentials: true,
    });
  }
  deleteComment(id) {
    return this.http.delete(environment.host + `/delete-comment/${id}`, {
      withCredentials: true,
    });
  }
}
