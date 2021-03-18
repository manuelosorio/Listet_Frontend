import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import {ListsService} from '../../_services/lists.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {WebsocketService} from '../../_services/websocket.service';
import { isPlatformBrowser } from '@angular/common';
import { ListDataService } from '../../shared/list-data.service';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.sass']
})
export class ListCommentsComponent implements OnInit, OnDestroy {
  private readonly username: string;
  private readonly slug: string;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private getComments: Subscription;
  public commentsEnabled: boolean;
  public comments: Array<object>;
  private listData: Subscription;
  private onCreateComment$: Subscription;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private listService: ListsService,
    private listDataService: ListDataService,
    private route: ActivatedRoute,
    private websocketService: WebsocketService
  ) {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.listService.getListComments(this.username, this.slug);
    if (this.isBrowser) {
      this.onCreateComment$ = websocketService.onCreateComment().subscribe(comment => {
        this.comments.unshift(comment);
      });
    }
  }
  ngOnInit(): void {
    this.listData = this.listDataService.listData.subscribe((data: any) => {
      this.commentsEnabled = data.allow_comments === 1;
    });
    this.getComments = this.listService.comment$.subscribe(comments => {
      this.comments= comments;
      return this.comments;
    });
  }
  ngOnDestroy(): void {
    this.listData.unsubscribe();
    this.getComments.unsubscribe();
    if (this.isBrowser) {
      this.onCreateComment$.unsubscribe();
    }
  }
}
