import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private http = inject(HttpClient);

  listSearch(query: string) {
    return this.http.get(`${environment.host}/search/list/${query}`, {
      withCredentials: true,
    });
  }
  userSearch(query: string) {
    return this.http.get(`${environment.host}/search/user/${query}`, {
      withCredentials: true,
    });
  }
}
