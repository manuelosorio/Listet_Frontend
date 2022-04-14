import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ListsService } from '../../_services/lists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../_services/websocket.service';
import { formatDate, isPlatformBrowser } from '@angular/common';
import { ListDataService } from '../../shared/list-data.service';
import { DateUtil } from '../../utils/dateUtil';
import { CommentModel } from '../../models/comment.model';
import { UsersService } from '../../_services/users.service';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.sass']
})
export class ListCommentsComponent implements OnInit, OnDestroy {
  private username: string;
  private readonly slug: string;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private getComments: Subscription;
  public commentsEnabled: boolean;
  public comments: Array<CommentModel>;
  private listData: Subscription;
  private onCreateComment$: Subscription;
  private onDeleteComment$: Subscription;
  private onEditComment$: Subscription;
  public count: number;
  public isListOwner: boolean;
  public isAuth: boolean;
  private authenticated$: Subscription;
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
        this.username = res.username
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
        this.comments.filter(comment => {
          return this.isCommentOwner(comment);
        });
        this.updateTimeDifference();
        this.count = this.comments.length;
        return this.comments;
      });

      this.onCreateComment$ = this.websocketService.onCreateComment().subscribe((comment: CommentModel) => {
        this.count += 1;
        this.updateTimeDifference();
        this.isCommentOwner(comment);
        const creationDate = new DateUtil(new Date(), comment.comment);
        comment.time_difference = creationDate.getFormattedTimeDifference();
        comment.formatted_creation_date = creationDate.format();
        this.comments.unshift(comment);
      });
      this.onDeleteComment$ = this.websocketService.onDeleteComment().subscribe((id) => {
        this.count -= 1;
        this.comments = this.comments.filter((comment) => {
          return comment.id != id as unknown as CommentModel['id'];
        });
      });
      this.onEditComment$ = this.websocketService.onUpdateComment().subscribe((res: CommentModel) => {
        this.comments.filter(comment => {
          if (comment.id == res.id) {
            comment.comment = res.comment;
            comment.date_updated = res.date_updated;
            this.updateTimeDifference();
          }
        })
      })
    }
  }
  public edit(comment) {
    comment.isEditing = true;
  }
  public delete(id) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.listService.deleteComment(id).subscribe();
    }
  }
  private updateTimeDifference() {
    this.comments.filter((comment: CommentModel) => {
      if (comment.date_updated) {
        const dateUpdated = new DateUtil(comment.date_updated, comment.comment);
        comment.time_difference = dateUpdated.getFormattedTimeDifference();
        comment.formatted_creation_date = formatDate(comment.creation_date, 'MMM d, YYYY', 'en');
        return comment;
      }
      const creationDate = new DateUtil(comment.creation_date, comment.comment);
      comment.time_difference = creationDate.getFormattedTimeDifference();
      comment.formatted_creation_date = formatDate(comment.creation_date, 'MMM d, YYYY', 'en');
      return comment;
    });
  }
  private isCommentOwner(comment: CommentModel) {
    comment.is_owner = comment.username === this.username;
    return comment;
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
