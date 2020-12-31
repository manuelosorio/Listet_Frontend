import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListDataService {
  private listDataSubject: Subject<object>;
  listData: Observable<object>;
  constructor() {
    this.listDataSubject = new Subject<object>();
    this.listData = this.listDataSubject.asObservable();
  }
  setData(data: object) {
    this.listDataSubject.next(data);
  }
}
