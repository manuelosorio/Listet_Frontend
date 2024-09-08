import { Component, Input, OnInit } from '@angular/core';
import { CommentModel } from '@models/comment.model';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ListsService } from '@services/lists.service';
import { CharacterCounterComponent } from '@shared/character-counter/character-counter.component';
import { ActionButtonComponent } from '@shared/action-button/action-button.component';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.sass'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ActionButtonComponent,
    CharacterCounterComponent,
  ],
})
export class EditCommentComponent implements OnInit {
  @Input() commentModel!: CommentModel;
  public commentForm!: UntypedFormGroup;
  public commentCharacterCount: number = 0;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private listService: ListsService
  ) {}

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(500),
        ],
      ],
    });
    this.commentForm.setValue({
      comment: this.commentModel.comment,
    });
  }
  cancel(): void {
    this.commentModel.isEditing = false;
  }
  submit(data: CommentModel): void {
    data.list_id = this.commentModel.list_id;
    this.listService.updateComment(data, this.commentModel.id).subscribe(
      () => {
        this.commentModel.isEditing = false;
      },
      error => {
        console.error(error);
      }
    );
  }
  get comment(): AbstractControl {
    const comment = this.commentForm.get('comment') as AbstractControl<
      any,
      string
    >;
    this.commentCharacterCount = comment!.value.length ?? 0;
    return comment;
  }
}
