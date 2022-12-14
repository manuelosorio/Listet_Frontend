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
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.sass']
})
export class ListHeaderComponent implements OnInit, OnDestroy {
  public header: Array<ListModel>;
  public listId: number;
  public listData;
  public isOwner: boolean;
  public formattedCreationDate: string;
  public deadline: Date | string;
  private readonly username: any;
  private readonly slug: any;
  private meta: MetaTagModel;
  private onDelete$: Subscription;
  private onEdit$: Subscription;
  private getList$: Subscription;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private prevSlug: string;
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

    if (this.isBrowser) {
      this.onDelete$ = this.websocketService.onDeleteList().subscribe(() => {
        this.alertService.warning('List has been deleted. Redirecting...', false);
        setTimeout(() => {
          return this.router.navigateByUrl('/lists');
        }, 3000);
      });
      this.onEdit$ = this.websocketService.onEditList().subscribe(res => {
        this.prevSlug = this.header[0].slug;
        this.editHeader(res);
      })
    }
  }

  ngOnInit(): void {
    this.getList$ = this.listService.getList(this.slug).subscribe((data: Array<ListModel>) => {
      const creationDate = new DateUtil(data[0].creation_date);
      if (!!data[0].deadline) {
        this.deadline = new Date(data[0].deadline);
      }
      this.formattedCreationDate = creationDate.format();
      this.header = data;
      this.header[0].isEditing = false;
      this.listId = data[0].id;
      this.isOwner = data[0].is_owner;
      console.log(data, this.isOwner);
      this.listData = {
        id: this.listId,
        allow_comments: data[0].allow_comments,
        isOwner: this.isOwner,
      };
      this.listDataService.setData(this.listData);
      this.metaTags(data);
      this.seoService.updateInfo(this.meta);
      return this.header;
    }, (error => {
      if (error.status === 404 || error.status === 403) {
        this.router.navigateByUrl('/404', {
          skipLocationChange: true
        }).then();
      }
    }));
  }

  edit() {
    this.header[0].isEditing = true;
  }

  delete() {
    if (confirm('Are sure you want to delete this list?')){
      this.listService.deleteList(this.listId).subscribe(() => {
      }, error => {
        console.error(error);
      } );
    }
  }

  private metaTags(data: Array<ListModel>) {
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
      openGraphImage: `${environment.url}/assets/images/listet-open-graph.jpg`,
      twitterImage: `${environment.url}/assets/images/listet-twitter.jpg`,
      url: `${environment.url}/l/${this.slug}`
    };
  }

  ngOnDestroy() {
    this.getList$.unsubscribe();
    if (this.isBrowser) {
      this.onDelete$.unsubscribe();
      this.onEdit$.unsubscribe();
    }
  }

  private editHeader(data: ListModel) {
    if (data.deadline) {
      this.deadline = new Date(data.deadline);
    }
    (this.header as ListModel[]).filter((head: ListModel) => {
      head.id = data.id;
      head.name = data.name;
      head.deadline = new DateUtil(data.deadline).format();
      head.description = data.description;
      head.visibility = data.visibility;
      head.allow_comments = data.allow_comments;
      head.slug = data.slug;
      head.isEditing = false;
      return head;
    });

    this.listId = data.id;
    this.listData = {
      id: this.listId,
      allow_comments: data.allow_comments,
      isOwner: this.isOwner,
    };
    this.listDataService.setData(this.listData);
    return this.header;
  }
}
