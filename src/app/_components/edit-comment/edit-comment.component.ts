import { Component, Input, OnInit } from '@angular/core';
import { CommentModel } from '../../models/comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListsService } from '../../_services/lists.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.sass']
})
export class EditCommentComponent implements OnInit {
  @Input() commentModel: CommentModel;
  public commentForm: FormGroup;
  public commentCharacterCount: number;
  constructor(
    private formBuilder: FormBuilder,
    private listService: ListsService
  ) {
  }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: ['', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(500)
      ]]
    });
    this.commentForm.setValue({
      comment: this.commentModel.comment
    })
  }
  cancel() {
    this.commentModel.isEditing = false;
  }
  submit(data) {
    data.list_id = this.commentModel.list_id;
    this.listService.updateComment(data, this.commentModel.id).subscribe(_res => {
      this.commentModel.isEditing = false;
    }, error => {
      console.error(error);
    });
  }
  get comment() {
    const comment = this.commentForm.get('comment');
    this.commentCharacterCount = comment.value.length ?? 0;
    return comment;
  }
}
