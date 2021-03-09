import { Component, Inject, OnInit, OnDestroy, PLATFORM_ID } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { ListsService } from '../../_services/lists.service';
import { ListDataService } from '../../shared/list-data.service';
import { CommentEvents } from "../../helper/comment.events";
import { WebsocketService } from "../../_services/websocket.service";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.sass']
})
export class CreateCommentComponent implements OnInit, OnDestroy {
  listData;
  commentForm: FormGroup;
  commentData;

  private id;
  public commentsEnabled: boolean;
  private readonly username: string;
  private readonly slug: string;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private formBuilder: FormBuilder,
    private listService: ListsService,
    private listDataService: ListDataService,
    private route: ActivatedRoute,
    private websocketService: WebsocketService

  ) {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.listData = this.listDataService.listData.subscribe((data: any) => {
      this.commentsEnabled = data.allow_comments === 1;
    });
    this.commentForm = formBuilder.group({
      comment: ['', [
        Validators.required,
        Validators.minLength(20)
      ]]
    });
  }

  ngOnInit(): void {
    this.listData = this.listDataService.listData.subscribe((results: any) => {
      this.id = results.id;
    });
  }
  get comment() {
    return this.commentForm.get('comment');
  }
  onSubmit(data) {
    data.list_id = this.id;
    data.listInfo = `${this.username}-${this.slug}`
    this.listService.createComment(data).subscribe(() => {
      data.listInfo
      this.commentData = data;
      this.websocketService.emit(CommentEvents.CREATE_COMMENT, this.commentData);
      this.commentForm.reset();
    }, error => {
      console.error(error);
    });
  }
  ngOnDestroy(): void {
    this.listData.unsubscribe();
  }
}