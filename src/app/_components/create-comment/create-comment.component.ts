import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListsService} from '../../_services/lists.service';
import {ListDataService} from '../../shared/list-data.service';
import {WebsocketService} from '../../_services/websocket.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.sass']
})
export class CreateCommentComponent implements OnInit {
  listData;
  commentForm: FormGroup;
  commentData;
  private id;
  constructor(
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
      this.websocketService.emit('CreateComment', this.commentData);
      this.commentForm.reset();
    }, error => {
      console.error(error);
    });
  }
}
