import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import {ListsService} from '../../_services/lists.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {WebsocketService} from '../../_services/websocket.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.sass']
})
export class ListCommentsComponent implements OnInit, OnDestroy {
  comments: object;
  private username: any;
  private slug: any;
  private getComments: Subscription;
  private commentWS;
  // commentSubscription: Subscription;
  // private connect: Subscription;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    // tslint:disable-next-line:ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private listService: ListsService,
    private route: ActivatedRoute,
    private websocketService: WebsocketService
  ) {
    if (this.isBrowser) {
      // console.log('PlatformID: %s IsBrowser: %s', this.platformId, this.isBrowser);
      // this.connect = this.websocketService.listen('connect').subscribe(() => {
      //   console.log('connected');
      // });
      this.commentWS = this.websocketService.listen('CreateComment').subscribe(data => {
        console.log('Created Comment:', data);
        this.ngOnInit();
      });
    }
  }
  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.getComments  = this.listService.getListComments(this.username, this.slug).subscribe(data => {
      this.comments = data;
      return this.comments;
  });
  }
  ngOnDestroy(): void {
    // this.connect.unsubscribe();
    // this.websocketService.disconnect();
  }

}
// New comment test. Hopefully this works.
