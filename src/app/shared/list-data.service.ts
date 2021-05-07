import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListDataModel } from '../models/list-data.model';
@Injectable({
  providedIn: 'root'
})
export class ListDataService {
  private listData: any = [];
  // public listDataSubject: Subject<ListDataModel[]>;
  private listDataBehaviorSubject: BehaviorSubject<ListDataModel[]>;
  public listData$: Observable<ListDataModel[]>;
  constructor() {
    // this.listDataSubject = new Subject<ListDataModel[]>();
    this.listDataBehaviorSubject = new BehaviorSubject(this.listData);
    this.listData$ = this.listDataBehaviorSubject.asObservable();
  }
  setData(data: ListDataModel[]) {
    this.listDataBehaviorSubject.next(data);
  }
}
