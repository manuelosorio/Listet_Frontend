 import { Component } from '@angular/core';
import { SearchService } from "../../_services/search.service";
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from "@angular/router";
import { Subscription } from "rxjs";
import { ListModel } from "../../models/list.model";
import { filter } from "rxjs/operators";
import { SearchDataService } from "../../shared/search-data.service";
import { ListComponent } from '../../_components/list/list.component';
import { UserCardComponent } from '../../_components/user-card/user-card.component';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.sass'],
    standalone: true,
    imports: [NgFor, UserCardComponent, RouterLink, ListComponent]
})
export class SearchResultsComponent {
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

}
