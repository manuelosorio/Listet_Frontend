import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '@environments/environment';
import { ListItemModel } from '@models/list-item.model';
import { CommentModel } from '@models/comment.model';
import { ListModel } from '@models/list.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  private commentSubject$: Subject<any>;
  public comment$: Observable<any>;

  constructor(private http: HttpClient, private userService: UsersService) {
    this.commentSubject$ = new Subject<any>();
    this.comment$ = this.commentSubject$.asObservable();
  }

  getLists() {
    return this.http.get(environment.host + '/lists', {
      withCredentials: true,
    });
  }

  getAuthUserLists() {
    return this.http.get(environment.host + '/your-lists', {
      withCredentials: true,
    });
  }

  getList(slug: any) {
    return this.http.get(environment.host + `/list/${slug}`, {
      withCredentials: true,
    });
  }

  getListItems(username: any, slug: any) {
    return this.http.get(environment.host + `/list/${slug}/items`, {
      withCredentials: true,
    });
  }

  getListComments(slug: string) {
    return this.http
      .get(environment.host + `/list/${slug}/comments`, {
        withCredentials: true,
      })
      .subscribe(data => {
        this.commentSubject$.next(data);
      });
  }

  createList(data: ListModel) {
    return this.http.post(environment.host + '/create-list', data, {
      withCredentials: true,
    });
  }

  createComment(data: CommentModel) {
    return this.http.post(environment.host + '/create-comment', data, {
      withCredentials: true,
    });
  }

  commentDeletePermissible(id: number) {
    return this.http
      .get(environment.host + `/comment/${id}/delete-permissible`, {
        withCredentials: true,
      })
      .subscribe(data => {
        return data;
      });
  }

  createListItem(data: ListItemModel) {
    return this.http.post(environment.host + '/add-item', data, {
      withCredentials: true,
    });
  }

  completeListItem(data: ListItemModel) {
    return this.http.put(environment.host + '/update-item-status', data, {
      withCredentials: true,
    });
  }

  updateList(data: any, id: number) {
    return this.http.put(environment.host + `/update-list/${id}`, data, {
      withCredentials: true,
    });
  }

  updateItem(data: ListItemModel, id: number) {
    return this.http.put(environment.host + `/update-item/${id}`, data, {
      withCredentials: true,
    });
  }

  updateComment(data: CommentModel, id: number) {
    return this.http.put(environment.host + `/update-comment/${id}`, data, {
      withCredentials: true,
    });
  }
  deleteList(id: number) {
    return this.http.delete(environment.host + `/delete-list/${id}`, {
      withCredentials: true,
    });
  }
  deleteListItem(id: number) {
    return this.http.delete(environment.host + `/delete-item/${id}`, {
      withCredentials: true,
    });
  }
  deleteComment(id: number) {
    return this.http.delete(environment.host + `/delete-comment/${id}`, {
      withCredentials: true,
    });
  }
}
