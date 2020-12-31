import {Component, OnInit, OnDestroy} from '@angular/core';
import {ListsService} from '../../_services/lists.service';
import {ActivatedRoute} from '@angular/router';
import {interval, Subscription} from 'rxjs';
import {timeInterval} from 'rxjs/operators';

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
  private interval: Subscription;
  constructor(private listService: ListsService,
              private route: ActivatedRoute) {
    // TODO:
    //  Find a way to reload component on new comment creation without running ngOnInit every 800ms
    this.interval  = interval(800).pipe(timeInterval()).subscribe(() => {
      this.ngOnInit();
    });
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
  // Attempts memory leaks prevention caused by this interval ngOnInit hack
    this.interval.unsubscribe();
  }

}
