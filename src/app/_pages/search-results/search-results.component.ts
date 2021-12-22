 import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchService } from "../../_services/search.service";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ListModel } from "../../models/list.model";
import { filter } from "rxjs/operators";
import { SearchDataService } from "../../shared/search-data.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.sass']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  private listSearch$: Subscription;
  private userSearch$: Subscription;
  public currentRoute: string;
  public listResult;
  public userResult;
  public listResultAmount;
  public userResultAmount;
  public lists;
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private searchData: SearchDataService
  ) {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((_event: NavigationEnd) => {
      this.currentRoute = this.route.snapshot.params.query;
      this.getSearchResults(this.currentRoute);
    })
  }
  private getSearchResults(query): void {
    this.listSearch$ = this.searchService.listSearch(query).subscribe((res: ListModel[]) => {
      this.listResult = res;
      this.listResultAmount = this.listResult.length;
      this.searchData.setListData(this.listResult).then();
    });
    this.userSearch$ = this.searchService.userSearch(query).subscribe(res => {
      this.userResult = res;
      this.userResultAmount = this.userResult.length;
    });
  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {

  }

}
