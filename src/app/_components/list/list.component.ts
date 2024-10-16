import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListsService } from '@services/lists.service';
import { SeoService } from '@services/seo.service';
import { SearchDataService } from '@shared/search-data.service';
import { ListModel } from '@models/list.model';
import { DateUtil } from '@utilities/dateUtil';
import { MasonryDirective } from '../../_directives/masonry.directive';
import { AlertService } from '@services/alert.service';
import { DeadlineComponent } from '@shared/deadline/deadline.component';
import { DatePipe } from '@angular/common';
import { WebsocketService } from '@services/websocket.service';
import { MetaTagModel } from '@models/metatag.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
  imports: [DeadlineComponent, RouterLink, MasonryDirective, DatePipe],
  providers: [SeoService, AlertService, SearchDataService, WebsocketService],
  standalone: true,
  host: { ngSkipHydration: 'true' },
})
export class ListComponent implements OnInit, OnDestroy {
  private listSearchData$!: Subscription;
  @Input() public pageType!:
    | 'Lists'
    | 'Home'
    | 'User'
    | 'AuthedUser'
    | 'SearchResults';
  @Input() public profileUser?: string;
  private errorMessage?: String;
  lists: ListModel[];

  @ViewChild(MasonryDirective, { static: false })
  masonryDirective!: MasonryDirective;
  public masonryLists: ListModel[] = [];
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private listService: ListsService,
    private router: Router,
    private route: ActivatedRoute,
    private seoService: SeoService,
    private searchData: SearchDataService,
    private alertService: AlertService
  ) {
    this.lists = [];
  }

  async ngOnInit(): Promise<void> {
    switch (this.pageType) {
      case 'AuthedUser': {
        this.listService.getAuthUserLists().subscribe({
          next: async (data?: any) => {
            this.lists = data as ListModel[];
            this.show(this.lists);
          },
        });
        break;
      }
      case 'SearchResults': {
        this.listSearchData$ = this.searchData.listResults$.subscribe(
          async (res: ListModel[]) => {
            this.lists = res;
            this.show(this.lists);
          }
        );
        break;
      }
      case 'User': {
        const meta = this.getMeta();
        meta.title = `Listet App - ${this.route.snapshot.params['username']}'s Lists`;
        this.listService.getLists().subscribe({
          next: async (data: any) => {
            this.lists = (data as unknown) as ListModel[];
            this.show(this.lists);
          },
          error: err => {
            this.errorMessage = err.message;
          },
        });
        break;
      }
      default: {
        this.listService.getLists().subscribe({
          next: async (data: any) => {
            this.lists = (data as unknown) as ListModel[];
            this.show(this.lists);
          },
          error: err => {
            this.errorMessage = err.message;
          },
        });
      }
    }
    const meta = this.getMeta();
    if (meta) {
      this.seoService.updateInfo(meta);
    }
  }
  getMeta(): MetaTagModel {
    return this.route?.snapshot?.data[0] ?? {};
  }
  private show(listsObj: ListModel[]): void {
    if (!Array.isArray(listsObj)) {
      this.alertService.error('Invalid data structure. Expected an array.');
      return;
    }
    this.parseLists(this.lists).then(
      () => {},
      err => {
        this.errorMessage = err.message;
        this.alertService.error(err.message);
      }
    );
    switch (this.pageType) {
      case 'Home': {
        for (let index = 0; index < listsObj.length; index++) {
          if (listsObj.hasOwnProperty(index) && this.lists[index].featured) {
            this.masonryLists.push(this.lists[index]);
          }
        }
        break;
      }
      case 'User': {
        const listArr = this.lists.reduce<ListModel[]>((acc, list) => {
          if (list.owner_username === this.profileUser) {
            this.masonryLists.push(list);
            acc.push(list);
          }
          return acc;
        }, []);
        if (!listArr.length) {
          this.router
            .navigateByUrl('404', {
              skipLocationChange: true,
            })
            .then(() => {});
        }
        break;
      }
      case 'SearchResults': {
        this.masonryLists.length = 0;
        for (const listObj of listsObj) {
          const list = listObj as ListModel;
          this.masonryLists.push(list);
        }
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
        for (let index = 0; index < listsObj.length; index++) {
          if (listsObj.hasOwnProperty(index)) {
            this.masonryLists.push(this.lists[index]);
          }
        }
      }
    }
  }

  ngOnDestroy() {
    this.listSearchData$?.unsubscribe();
  }

  async parseLists(lists: ListModel[]): Promise<unknown> {
    return new Promise((resolve, reject) => {
      if (!lists) return reject({ message: 'No Lists found' });
      return resolve(
        lists.filter((list: ListModel) => {
          list.creation_date = new DateUtil(list.creation_date).format();
        })
      );
    });
  }
}
