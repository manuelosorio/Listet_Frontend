import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ListsService } from '@services/lists.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketService } from '@services/websocket.service';
import { formatDate, isPlatformBrowser } from '@angular/common';
import { ListDataService } from '@app/shared/list-data.service';
import { DateUtil } from '@utilities/dateUtil';
import { CommentModel } from '@models/comment.model';
import { UsersService } from '@services/users.service';
import { EditCommentComponent } from '@components/edit-comment/edit-comment.component';
import { FeatherModule } from 'angular-feather';
import { CreateCommentComponent } from '@components/create-comment/create-comment.component';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.sass'],
  standalone: true,
  imports: [
    CreateCommentComponent,
    RouterLink,
    FeatherModule,
    EditCommentComponent,
  ],
  host: { ngSkipHydration: 'true' },
})
export class ListCommentsComponent implements OnInit, OnDestroy {
  private username?: string;
  private readonly slug: string;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private getComments: Subscription = new Subscription();
  public commentsEnabled?: boolean;
  public comments: Array<CommentModel> = [];
  private listData: Subscription = new Subscription();
  private onCreateComment$: Subscription = new Subscription();
  private onDeleteComment$: Subscription = new Subscription();
  private onEditComment$: Subscription = new Subscription();
  public count: number = 0;
  public isListOwner?: boolean;
  public isAuth?: boolean;
  private authenticated$: Subscription = new Subscription();
  public returnUrl: string;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private listService: ListsService,
    private listDataService: ListDataService,
    private route: ActivatedRoute,
    private router: Router,
    private websocketService: WebsocketService,
    private userService: UsersService
  ) {
    this.slug = this.route.snapshot.params.slug;
    this.returnUrl = this.router.routerState.snapshot.url;
    this.listService.getListComments(this.slug);

    this.userService.userInfo$.subscribe(res => {
      try {
        this.username = res.username;
      } catch (e) {}
    });
  }
  ngOnInit(): void {
    this.authenticated$ = this.userService.authenticated$.subscribe(res => {
      this.isAuth = res;
    });
    if (this.isBrowser) {
      this.listData = this.listDataService.listData$.subscribe((data: any) => {
        this.isListOwner = data.isOwner;
        this.commentsEnabled = data.allow_comments === 1;
      });
      this.getComments = this.listService.comment$.subscribe(comments => {
        this.comments = comments;
        this.updateTimeDifference();
        this.count = this.comments.length;
        return this.comments;
      });

      this.onCreateComment$ = this.websocketService
        .onCreateComment()
        .subscribe((comment: CommentModel) => {
          this.count += 1;
          this.updateTimeDifference();
          const creationDate = new DateUtil(new Date(), comment.comment);
          comment.time_difference = creationDate.getFormattedTimeDifference();
          comment.formatted_creation_date = creationDate.format();
          this.comments.unshift(comment);
        });
      this.onDeleteComment$ = this.websocketService
        .onDeleteComment()
        .subscribe(id => {
          this.count -= 1;
          this.comments = this.comments.filter(comment => {
            return comment.id != ((id as unknown) as CommentModel['id']);
          });
        });
      this.onEditComment$ = this.websocketService
        .onUpdateComment()
        .subscribe((res: CommentModel) => {
          this.comments.filter(comment => {
            if (comment.id == res.id) {
              comment.comment = res.comment;
              comment.date_updated = res.date_updated;
              this.updateTimeDifference();
            }
          });
        });
    }
  }
  public edit(comment: CommentModel) {
    comment.isEditing = true;
  }
  public delete(id: number) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.listService.deleteComment(id).subscribe();
    }
  }
  private updateTimeDifference() {
    this.comments.filter((comment: CommentModel) => {
      if (comment.date_updated) {
        const dateUpdated = new DateUtil(comment.date_updated, comment.comment);
        comment.time_difference = dateUpdated.getFormattedTimeDifference();
        comment.formatted_creation_date = formatDate(
          comment.creation_date,
          'MMM d, YYYY',
          'en'
        );
        return comment;
      }
      const creationDate = new DateUtil(comment.creation_date, comment.comment);
      comment.time_difference = creationDate.getFormattedTimeDifference();
      comment.formatted_creation_date = formatDate(
        comment.creation_date,
        'MMM d, YYYY',
        'en'
      );
      return comment;
    });
  }

  ngOnDestroy(): void {
    this.authenticated$.unsubscribe();
    if (this.isBrowser) {
      this.getComments.unsubscribe();
      this.listData.unsubscribe();
      this.onCreateComment$.unsubscribe();
      this.onDeleteComment$.unsubscribe();
      this.onEditComment$.unsubscribe();
    }
  }
}
