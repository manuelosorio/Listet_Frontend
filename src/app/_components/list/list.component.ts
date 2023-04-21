import {
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ListsService } from '../../_services/lists.service';
import { MetaTagModel } from '../../models/metatag.model';
import { SeoService } from '../../_services/seo.service';
import { SearchDataService } from '../../shared/search-data.service';
import { ListModel } from '../../models/list.model';
import { DateUtil } from '../../utils/dateUtil';
import { MasonryDirective } from '../../_directives/masonry.directive';
import { AlertService } from '../../_services/alert.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass'],
})
export class ListComponent implements OnInit, OnDestroy {
  private readonly meta: MetaTagModel;
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
    this.meta = this.route.snapshot.data[0];
    this.lists = [];
  }

  async ngOnInit(): Promise<void> {
    switch (this.pageType) {
      case 'AuthedUser': {
        this.listService.getAuthUserLists().subscribe({
          next: async (data?: any) => {
            this.lists = data as ListModel[];
            await this.show(this.lists);
          },
        });
        break;
      }
      case 'SearchResults': {
        this.listSearchData$ = this.searchData.listResults$.subscribe(
          async (res: ListModel[]) => {
            this.lists = res;
            await this.show(this.lists);
          }
        );
        break;
      }
      case 'User': {
        this.meta.title += `${this.route.snapshot.params['username']}'s Lists`;
        this.listService.getLists().subscribe({
          next: async (data: any) => {
            this.lists = (data as unknown) as ListModel[];
            await this.show(this.lists);
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
            await this.show(this.lists);
          },
          error: err => {
            this.errorMessage = err.message;
          },
        });
      }
    }
    this.meta ? this.seoService.updateInfo(this.meta) : '';
  }

  private show(listsObj: any): void {
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
