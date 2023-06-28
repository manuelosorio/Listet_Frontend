import { Component } from '@angular/core';
import { SearchService } from '../../_services/search.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListModel } from '../../models/list.model';
import { filter } from 'rxjs/operators';
import { SearchDataService } from '../../shared/search-data.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.sass'],
})
export class SearchResultsComponent {
  private listSearch$!: Subscription;
  private userSearch$!: Subscription;
  public currentRoute: string = '';
  public listResult: ListModel[] = [];
  public userResult: UserModel[] = [];
  public listResultAmount: number = 0;
  public userResultAmount = 0;
  public lists: ListModel[] = [];
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private searchData: SearchDataService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe({
        next: () => {
          this.currentRoute = this.route.snapshot.params['query'];

          this.getSearchResults(this.currentRoute);
        },
      });
  }
  private getSearchResults(query: string): void {
    this.listSearch$ = this.searchService.listSearch(query).subscribe({
      next: (response: any) => {
        this.listResult = response as ListModel[];
        this.listResultAmount = this.listResult.length;
        this.searchData.setListData(this.listResult).then();
      },
    });
    this.userSearch$ = this.searchService.userSearch(query).subscribe(res => {
      this.userResult = res as [];
      this.userResultAmount = this.userResult.length;
    });
  }
}
