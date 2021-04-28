import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ListsService } from '../../_services/lists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MetaTagModel } from '../../models/metatag.model';
import { SeoService } from '../../_services/seo.service';
import { ListDataService } from '../../shared/list-data.service';
import { UsersService } from '../../_services/users.service';
import { DateUtil } from '../../utils/dateUtil';
import { ListModel } from '../../models/list.model';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../_services/websocket.service';
import { AlertService } from '../../_services/alert.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.sass']
})
export class ListHeaderComponent implements OnInit, OnDestroy {
  header;
  private readonly username: any;
  private readonly slug: any;
  private meta: MetaTagModel;
  listId: string;
  listData;
  isOwner: boolean;
  formattedCreationDate: string;
  deadline: Date;
  private onDelete$: Subscription;
  private username$: Subscription;
  private getList$: Subscription;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private listService: ListsService,
    private route: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
    private listDataService: ListDataService,
    private userService: UsersService,
    private websocketService: WebsocketService,
    private alertService: AlertService
  ) {
    userService.isAuth();
    this.username = this.route.snapshot.params.slug.split('-')[0];
    this.slug = this.route.snapshot.params.slug;
    this.username$ = userService.username$.subscribe(res => {
      this.isOwner = this.username === res;
    });

    if (this.isBrowser) {
      this.onDelete$ = this.websocketService.onDeleteList().subscribe(() => {
        this.alertService.warning('List has been deleted. Redirecting...', false);
        setTimeout(() => {
          return this.router.navigateByUrl('/lists');
        }, 3000);
      });
    }
  }

  ngOnInit(): void {
    this.getList$ = this.listService.getList(this.slug).subscribe((data: ListModel) => {
      const creationDate = new DateUtil(data[0].creation_date);
      if (!!data[0].deadline) {
        this.deadline = new Date(data[0].deadline);
      }
      this.formattedCreationDate = creationDate.format();
      this.header = data;
      this.listId = data[0].id;
      this.listData = {
        id: this.listId,
        allow_comments: data[0].allow_comments,
        isOwner: this.isOwner
      };
      this.listDataService.setData(this.listData);
      this.metaTags(data);
      this.seoService.updateInfo(this.meta);
      return this.header;
    }, (error => {
      if (error.status === 404) {
        this.router.navigateByUrl('/404', {
          skipLocationChange: true
        }).then();
      }
    }));
  }

  edit() {
    console.log('edit');
  }

  delete() {
    if (confirm('Are sure you want to delete this list?')){
      this.listService.deleteList(this.listId).subscribe(res => {
        console.log(res);
      });
    }
  }

  private metaTags(data: ListModel) {
    let listDescription;
    if (data[0].description !== null) {
      listDescription = data[0].description;
    } else {
      listDescription = 'Listet is a social todo list tool.';
    }
    this.meta = {
      author: data[0].firstName + ' ' + data[0].lastName,
      description: listDescription,
      title: 'Listet App - ' + data[0].name,
      openGraphImage: 'https://listet.manuelosorio.me/assets/images/listet-open-graph.jpg',
      twitterImage: 'https://listet.manuelosorio.me/assets/images/listet-twitter.jpg',
      url: `https://listet.manuelosorio.me/l/${this.slug}`
    };
  }

  ngOnDestroy() {
    this.username$.unsubscribe();
    this.getList$.unsubscribe();
    if (this.isBrowser) {
      this.onDelete$.unsubscribe();
    }
  }
}
