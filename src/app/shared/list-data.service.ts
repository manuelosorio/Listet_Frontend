import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListDataModel } from '@models/list-data.model';

@Injectable({
  providedIn: 'root',
})
export class ListDataService {
  private readonly listData: ListDataModel;
  private listDataBehaviorSubject: BehaviorSubject<ListDataModel>;
  public listData$: Observable<ListDataModel>;
  constructor() {
    this.listData = {} as ListDataModel;
    this.listDataBehaviorSubject = new BehaviorSubject(this.listData);
    this.listData$ = this.listDataBehaviorSubject.asObservable();
  }
  setData(data: ListDataModel) {
    this.listDataBehaviorSubject.next(data);
  }
}
