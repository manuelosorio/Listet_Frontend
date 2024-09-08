import {
  Component,
  Inject,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '@services/lists.service';
import { ListDataService } from '@app/shared/list-data.service';
import { CommentEvents } from '@helpers/comment.events';
import { WebsocketService } from '@services/websocket.service';
import { CommentModel } from '@models/comment.model';
import { CharacterCounterComponent } from '@app/shared/character-counter/character-counter.component';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.sass'],
  standalone: true,
  imports: [ReactiveFormsModule, CharacterCounterComponent],
})
export class CreateCommentComponent implements OnInit, OnDestroy {
  public listData;
  public commentForm: UntypedFormGroup;
  public commentData?: CommentModel;
  public commentCharacterCount: number = 0;

  private id?: number;
  public commentsEnabled?: boolean;
  private readonly username: string;
  private readonly slug: string;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private formBuilder: UntypedFormBuilder,
    private listService: ListsService,
    private listDataService: ListDataService,
    private route: ActivatedRoute,
    private websocketService: WebsocketService
  ) {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.listData = this.listDataService.listData$.subscribe((data: any) => {
      this.commentsEnabled = data.allow_comments === 1;
    });
    this.commentForm = formBuilder.group({
      comment: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(500),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.listData = this.listDataService.listData$.subscribe((results: any) => {
      this.id = results.id;
    });
  }
  get comment(): AbstractControl {
    const comment = this.commentForm.get('comment') as AbstractControl<
      any,
      string
    >;
    this.commentCharacterCount = comment.value
      ? comment.value.trim().length
      : 0;
    return comment;
  }
  onSubmit(data: CommentModel): void {
    if (!this.id) {
      return;
    }
    data.list_id = this.id;
    data.listInfo = this.slug;
    this.listService.createComment(data).subscribe({
      next: () => {
        this.commentData = data;
        this.websocketService.emit(
          CommentEvents.CREATE_COMMENT,
          this.commentData
        );
        this.commentForm.reset();
        this.commentCharacterCount = 0;
      },
      error: error => {
        console.error(error);
      },
    });
  }
  ngOnDestroy(): void {
    this.listData.unsubscribe();
  }
}
