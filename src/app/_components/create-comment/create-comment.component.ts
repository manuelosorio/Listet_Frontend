import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListsService} from '../../_services/lists.service';
import {ListDataService} from '../../shared/list-data.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.sass']
})
export class CreateCommentComponent implements OnInit {
  listData;
  commentForm: FormGroup;
  private id;
  constructor(
    private formBuilder: FormBuilder,
    private listService: ListsService,
    private listDataService: ListDataService
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
    console.log(data);
    this.listService.createComment(data).subscribe(res => {
      console.log(res);
      this.commentForm.reset();
    }, error => {
      console.error(error);
    }, () => {
      console.log('complete');
    });
  }
}
