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
import { ListsService } from '../../_services/lists.service';
import { ListDataService } from '../../shared/list-data.service';
import { CommentEvents } from '../../helper/comment.events';
import { WebsocketService } from '../../_services/websocket.service';
import { CommentModel } from '../../models/comment.model';
import { CharacterCounterComponent } from '../../shared/character-counter/character-counter.component';

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
  public commentData;
  public commentCharacterCount: number;

  private id;
  public commentsEnabled: boolean;
  private readonly username: string;
  private readonly slug: string;
  constructor(
    // eslint-disable-next-line @typescript-eslint/ban-types
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
    const comment = this.commentForm.get('comment');
    this.commentCharacterCount = comment.value
      ? comment.value.trim().length
      : 0;
    return comment;
  }
  onSubmit(data: CommentModel): void {
    data.list_id = this.id;
    data.listInfo = this.slug;
    this.listService.createComment(data).subscribe(
      () => {
        this.commentData = data;
        this.websocketService.emit(
          CommentEvents.CREATE_COMMENT,
          this.commentData
        );
        this.commentForm.reset();
        this.commentCharacterCount = 0;
      },
      error => {
        console.error(error);
      }
    );
  }
  ngOnDestroy(): void {
    this.listData.unsubscribe();
  }
}
