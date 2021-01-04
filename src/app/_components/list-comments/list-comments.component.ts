import {Component, OnInit, OnDestroy} from '@angular/core';
import {ListsService} from '../../_services/lists.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {WebsocketService} from '../../_services/websocket.service';

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
  private connect: Subscription;

  constructor(private listService: ListsService,
              private route: ActivatedRoute,
              private websocketService: WebsocketService
  ) {}
  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.getComments  = this.listService.getListComments(this.username, this.slug).subscribe(data => {
      this.comments = data;
      return this.comments;
  });
    this.connect = this.websocketService.listen('connect').subscribe(() => {
      console.log('connected');
    });
    this.commentWS = this.websocketService.listen('CreateComment').subscribe(data => {
      console.log('Created Comment:', data);
      this.ngOnInit();
    });
  }
  ngOnDestroy(): void {

    this.connect.unsubscribe();
    this.websocketService.listen('disconnect').subscribe(() => {
      console.log('disconnected');
    }).unsubscribe();
  }

}
// New comment test. Hopefully this works.
