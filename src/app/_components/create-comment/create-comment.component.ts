import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListsService} from '../../_services/lists.service';
import {ListDataService} from '../../shared/list-data.service';
import {WebsocketService} from '../../_services/websocket.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.sass']
})
export class CreateCommentComponent implements OnInit, OnDestroy {
  listData;
  commentForm: FormGroup;
  commentData;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private id;
  public commentsEnabled: boolean;
  constructor(
    // tslint:disable-next-line:ban-types
    @Inject(PLATFORM_ID) private platformId: Object,
    private formBuilder: FormBuilder,
    private listService: ListsService,
    private listDataService: ListDataService,
    private websocketService: WebsocketService
  ) {
    this.commentForm = formBuilder.group({
      comment: ['', [
        Validators.required,
        Validators.minLength(20)
      ]]
    });
    // if (this.isBrowser) {
    //   this.websocketService.connect();
    // }
  }

  ngOnInit(): void {
  this.listData = this.listDataService.listData;
  this.listDataService.listData.subscribe((results: any) => {
      this.id = results.id;
      console.log(results);
    });
  }
  get comment() {
    return this.commentForm.get('comment');
  }
  onSubmit(data) {
    data.list_id = this.id;
    this.listService.createComment(data).subscribe(() => {
      this.commentData = data;
      if (this.isBrowser) {
        this.websocketService.emit('CreateComment', this.commentData);
      }
      this.commentForm.reset();
    }, error => {
      console.error(error);
    });
  }
  ngOnDestroy(): void {
  }
}
