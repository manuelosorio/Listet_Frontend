import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { ListDataModel } from '../models/list-data.model';
@Injectable({
  providedIn: 'root'
})
export class ListDataService {
  private listDataSubject: Subject<ListDataModel>;
  listData: Observable<ListDataModel>;
  constructor() {
    this.listDataSubject = new Subject<ListDataModel>();
    this.listData = this.listDataSubject.asObservable();
  }
  setData(data: ListDataModel) {
    this.listDataSubject.next(data);
  }
}
