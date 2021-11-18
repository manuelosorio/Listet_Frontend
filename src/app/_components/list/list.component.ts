import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from "rxjs";
import { NgxMasonryComponent, NgxMasonryOptions } from '../../shared/ngx-masonry/ngx-masonry-api';
import { ListsService } from '../../_services/lists.service';
import { MetaTagModel } from '../../models/metatag.model';
import { SeoService } from '../../_services/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { SearchDataService } from "../../shared/search-data.service";
import { ListModel } from "../../models/list.model";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit, OnDestroy {
  private readonly meta: MetaTagModel;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private listSearchData$: Subscription;
  @Input() private pageType?: 'Lists' | 'Home' | 'User' | 'AuthedUser' | 'SearchResults';
  @Input() private profileUser?: string;


  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private listService: ListsService,
    private router: Router,
    private route: ActivatedRoute,
    private seoService: SeoService,
    private searchData: SearchDataService
  ) {
    this.meta = this.route.snapshot.data[0];
  }
  lists: any = [];
  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    animations: {},
  };
  masonryLists = [];

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
  async ngOnInit(): Promise<void> {
    switch (this.pageType) {
      case "AuthedUser": {
        this.listService.getAuthUserLists().subscribe(async (data) => {
          this.lists = data;
          await this.show(this.lists);
        });
        break;
      }
      case "SearchResults": {
        this.listSearchData$ = this.searchData.listResults$.subscribe(async (res: ListModel[]) => {
          this.lists = res;
          await this.show(this.lists);
        });
        break;
      }
      case 'User': {
        this.meta.title += `${this.route.snapshot.params.username}'s Lists`;
        this.listService.getLists().subscribe(async (data) => {
          this.lists = data;
          await this.show(this.lists);
        });
        break;
      }
      default: {
        this.listService.getLists().subscribe(async (data) => {
          this.lists = data;
          await this.show(this.lists);
        });
      }
    }
    this.meta ? this.seoService.updateInfo(this.meta) : '';
  }
  private async show(listsObj: any) {
    switch (this.pageType) {
      case 'Home': {
        for (const index in listsObj) {
          if (listsObj.hasOwnProperty(index) && !!this.lists[index].featured) {
            this.masonryLists.push(this.lists[index]);
          }
          this.reloadMasonry();
        }
        break;
      }
      case 'User': {
        const listArr = this.lists.reduce((acc, list) => {
          if (list.owner_username === this.profileUser) {
            this.masonryLists.push(list);
            acc.push(list);
          }
          return acc;
        }, []);
        if (!listArr.length) {
          return await this.router.navigateByUrl('404', { skipLocationChange: true });
        }
        this.reloadMasonry();
        break;
      }
      case 'SearchResults': {
        this.masonryLists.length = 0;
        for (const index in listsObj) {
          if (listsObj.hasOwnProperty(index)) {
            this.masonryLists.push(this.lists[index]);
            this.reloadMasonry();
          }
        }
        break;
      }
      case 'AuthedUser':
      case 'Lists':
      default: {
        for (const index in listsObj) {
          if (listsObj.hasOwnProperty(index)) {
            this.masonryLists.push(this.lists[index]);
            this.reloadMasonry();
          }
        }
      }
    }
  }
  private iterator: number = 0;
  private reloadMasonry() {
    if (this.isBrowser) {
      if (this.masonry) {
        console.log(this.iterator++)
        this.masonry.reloadItems();
        this.masonry.layout();
      }
    }
  }
  ngOnDestroy() {
    try {
      this.listSearchData$.unsubscribe();
    } catch (e) {
    }
  }
}
