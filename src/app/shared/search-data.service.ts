import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListModel } from '@models/list.model';
import { UserModel } from '@models/user.model';
export class SearchDataService {
  @Injectable({
    providedIn: 'root',
  })
  private listSearchData!: ListModel[];
  private listResultsBehaviorSubject: BehaviorSubject<ListModel[]>;
  public listResults$: Observable<ListModel[]>;

  private userSearchData!: UserModel[];
  private userResultsBehaviorSubject: BehaviorSubject<UserModel[]>;
  public userResults$: Observable<UserModel[]>;

  constructor() {
    this.listResultsBehaviorSubject = new BehaviorSubject(this.listSearchData);
    this.listResults$ = this.listResultsBehaviorSubject.asObservable();

    this.userResultsBehaviorSubject = new BehaviorSubject(this.userSearchData);
    this.userResults$ = this.userResultsBehaviorSubject.asObservable();
  }
  async setListData(results: ListModel[]) {
    this.listResultsBehaviorSubject.next(results);
  }

  setUserData(results: UserModel[]) {
    this.userResultsBehaviorSubject.next(results);
  }
}
