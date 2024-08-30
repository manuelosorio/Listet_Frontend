import { Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from "rxjs";
import { NgxMasonryComponent, NgxMasonryOptions } from '../../shared/ngx-masonry/ngx-masonry-api';
import { ListsService } from '../../_services/lists.service';
import { MetaTagModel } from '../../models/metatag.model';
import { SeoService } from '../../_services/seo.service';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';
import { SearchDataService } from "../../shared/search-data.service";
import { ListModel } from "../../models/list.model";
import { DateUtil } from "../../utils/dateUtil";
import { DeadlineComponent } from '../../shared/deadline/deadline.component';
import { NgxMasonryDirective } from '../../shared/ngx-masonry/ngx-masonry.directive';
import { NgxMasonryComponent as NgxMasonryComponent_1 } from '../../shared/ngx-masonry/ngx-masonry.component';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.sass'],
    standalone: true,
    imports: [NgxMasonryComponent_1, NgFor, NgxMasonryDirective, RouterLink, NgIf, DeadlineComponent]
})
export class ListComponent implements OnInit, OnDestroy {
  private readonly meta: MetaTagModel;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private listSearchData$: Subscription;
  @Input() public pageType?: 'Lists' | 'Home' | 'User' | 'AuthedUser' | 'SearchResults';
  @Input() private profileUser?: string;
  private errorMessage: String;
  private lists: ListModel[];
  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    animations: {},
  };
  public masonryLists = [];

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

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
  async ngOnInit(): Promise<void> {
    switch (this.pageType) {
      case "AuthedUser": {
        this.listService.getAuthUserLists().subscribe(async (data: ListModel[]) => {
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
        this.listService.getLists().subscribe(async (data: ListModel[]) => {
          this.lists = data;
          await this.show(this.lists);
        });
        break;
      }
      default: {
        this.listService.getLists().subscribe(async (data: ListModel[]) => {
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
        await this.parseLists(this.lists);
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
        await this.parseLists(this.lists);
        break;
      }
      // case 'AuthedUser': {
      //   {
      //     for (const index in listsObj) {
      //       if (listsObj.hasOwnProperty(index)) {
      //         this.masonryLists.push(this.lists[index]);
      //         this.reloadMasonry();
      //       }
      //     }
      //     this.parseLists(this.lists).catch(err => {
      //       this.errorMessage = err.message;
      //     })
      //     break;
      //   }
      // }
      default: {
        for (const index in listsObj) {
          if (listsObj.hasOwnProperty(index)) {
            this.masonryLists.push(this.lists[index]);
            this.reloadMasonry();
          }
        }
        this.parseLists(this.lists).catch(err => {
          this.errorMessage = err.message
          console.error(this.errorMessage)
        })
      }
    }
  }
  private reloadMasonry() {
    if (this.isBrowser) {
      if (this.masonry) {
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

  async parseLists(lists): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (!lists)
        return reject({ message: 'No Lists found' });
      return resolve(lists.filter((list: ListModel) => {
        list.creation_date = new DateUtil(list.creation_date).format();
      }))
    });
  }
}
