import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ListDataService } from '@app/shared/list-data.service';
import { Subscription } from 'rxjs';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { FeatherModule } from 'angular-feather';

import { DeadlineComponent } from '@app/shared/deadline/deadline.component';
import { EditListComponent } from '@components/edit-list/edit-list.component';
import { environment } from '@environments/environment';
import { ListModel } from '@models/list.model';
import { MetaTagModel } from '@models/metatag.model';
import { AlertService } from '@services/alert.service';
import { ListsService } from '@services/lists.service';
import { ListDataModel } from '@models/list-data.model';
import { SeoService } from '@services/seo.service';
import { WebsocketService } from '@services/websocket.service';
import { UsersService } from '@services/users.service';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.sass'],
  standalone: true,
  imports: [
    RouterLink,
    DeadlineComponent,
    FeatherModule,
    EditListComponent,
    DatePipe,
  ],
})
export class ListHeaderComponent implements OnInit, OnDestroy {
  public header: ListModel[] = [];
  public listId!: number;
  public listData?: ListDataModel;
  public isOwner?: boolean;
  public deadline?: Date | string;
  private readonly username: any;
  private readonly slug: any;
  private meta?: MetaTagModel;
  private onDelete$: Subscription = new Subscription();
  private onEdit$: Subscription = new Subscription();
  private getList$: Subscription = new Subscription();
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private prevSlug?: string;
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
    this.userService.isAuth();
    this.username = this.route.snapshot.params.slug.split('-')[0];
    this.slug = this.route.snapshot.params.slug;

    if (this.isBrowser) {
      this.onDelete$ = this.websocketService.onDeleteList().subscribe(() => {
        this.alertService.warning(
          'List has been deleted. Redirecting...',
          null,
          2900,
          true
        );
        setTimeout(() => {
          return this.router.navigateByUrl('/lists');
        }, 3000);
      });
      this.onEdit$ = this.websocketService.onEditList().subscribe(res => {
        this.prevSlug = this.header[0].slug;
        this.editHeader(res);
      });
    }
  }

  ngOnInit(): void {
    this.getList$ = this.listService.getList(this.slug).subscribe({
      next: (httpData: object) => {
        const data = httpData as ListModel[];
        if (!!data[0].deadline) {
          this.deadline = new Date(data[0].deadline);
        }
        this.header = data;
        this.header[0].isEditing = false;
        this.listId = data[0].id;
        this.isOwner = data[0].is_owner;
        this.listData = {
          id: this.listId,
          allow_comments: data[0].allow_comments,
          isOwner: this.isOwner,
        };
        this.listDataService.setData(this.listData);
        this.metaTags(data);
        if (this.meta) {
          this.seoService.updateInfo(this.meta);
        }
        return this.header;
      },
      error: error => {
        if (error.status === 404 || error.status === 403) {
          this.router
            .navigateByUrl('/404', {
              skipLocationChange: true,
            })
            .then();
        }
      },
    });
  }

  edit() {
    this.header[0].isEditing = true;
  }

  delete() {
    if (confirm('Are sure you want to delete this list?')) {
      this.listService.deleteList(this.listId).subscribe(
        () => {},
        error => {
          console.error(error);
        }
      );
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
      url: `${environment.url}/l/${this.slug}`,
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
      head.deadline = data.deadline;
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
      isOwner: this.isOwner ?? false,
    };
    this.listDataService.setData(this.listData);
    return this.header;
  }
}
