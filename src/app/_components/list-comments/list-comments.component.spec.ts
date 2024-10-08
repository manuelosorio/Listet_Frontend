import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListCommentsComponent } from './list-comments.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BackButtonComponent } from '../back-button/back-button.component';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { WebsocketService } from '@services/websocket.service';
import { of, Subject } from 'rxjs';
import { CommentModel } from '@models/comment.model';
import { ListsService } from '@services/lists.service';

describe('ListCommentsComponent', () => {
  let component: ListCommentsComponent;
  let fixture: ComponentFixture<ListCommentsComponent>;
  beforeEach(
    waitForAsync(() => {
      const listServiceMock = {
        comment$: new Subject<CommentModel[]>(),
        deleteComment: jest.fn().mockReturnValue(of({})),
        getListComments: jest.fn().mockReturnValue(of([])),
        updateComment: jest.fn().mockReturnValue(of({})),
        createComment: jest.fn().mockReturnValue(of({})),
      };

      const websocketServiceMock = {
        onCreateComment: jest.fn(() => of()),
        onDeleteComment: jest.fn(() => of()),
        onUpdateComment: jest.fn(() => of()),

        connect: jest.fn(),
        disconnect: jest.fn(),

        emit: jest.fn(),
      };
      TestBed.configureTestingModule({
        imports: [ListCommentsComponent, BackButtonComponent],
        providers: [
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting(),
          provideRouter([]),
          {
            provide: WebsocketService,
            useValue: websocketServiceMock,
          },
          {
            provide: ListsService,
            useValue: listServiceMock,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.comments.push({
      id: 1,
      comment: 'Test Comment 1',
      username: 'user1',
      isEditing: false,
      creation_date: new Date('2021-08-24T19:00:00.000Z'),
      formatted_creation_date: '2021-08-24T19:00:00.000Z',
      firstName: 'User',
      lastName: 'One',
      parent_id: 1,
      list_id: 1,
      listInfo: 'List Info',
      is_owner: true,
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Client rendering tests', () => {
    it('should render comments if enabled', () => {
      component.commentsEnabled = true;
      fixture.detectChanges();

      const commentsList = fixture.nativeElement.querySelectorAll('.comment');
      expect(commentsList.length).toBe(1);
    });
    it('should not render comments if disabled', () => {
      component.commentsEnabled = false;
      fixture.detectChanges();

      const commentsList = fixture.nativeElement.querySelectorAll('.comment');
      expect(commentsList.length).toBe(0);
    });

    it('should render edit comment component if authenticated user is editing', () => {
      component.commentsEnabled = true;
      component.isAuth = true;
      component.comments[0].isEditing = true;
      fixture.detectChanges();

      const editComponent = fixture.nativeElement.querySelector(
        'app-edit-comment'
      );

      expect(editComponent).toBeTruthy();
    });

    it('should render delete button if authenticated user is the list owner', () => {
      component.commentsEnabled = true;
      component.isAuth = true;
      component.isListOwner = true;
      component.comments[0].is_owner = false;
      fixture.detectChanges();

      const deleteButton = fixture.nativeElement.querySelector(
        '#delete-comment'
      );
      expect(deleteButton).toBeTruthy();
    });

    it('should render delete button if authenticated user is the comment owner', () => {
      component.commentsEnabled = true;
      component.isAuth = true;
      component.comments[0].is_owner = true;
      fixture.detectChanges();

      const deleteButton = fixture.nativeElement.querySelector(
        '#delete-comment'
      );
      expect(deleteButton).toBeTruthy();
    });

    it('should render edit button if authenticated user is the comment owner', () => {
      component.commentsEnabled = true;
      component.isAuth = true;
      component.comments[0].is_owner = true;
      fixture.detectChanges();

      const editButton = fixture.nativeElement.querySelector('#edit-comment');
      expect(editButton).toBeTruthy();
    });
  });

  describe('Websocket tests', () => {
    it('should update an existing comment', () => {
      const websocketService = TestBed.inject(WebsocketService);
      const date = new Date();
      const editedComment = component.comments[0];
      editedComment.comment = 'Updated Comment';
      editedComment.date_updated = date;

      jest
        .spyOn(websocketService, 'onUpdateComment')
        .mockReturnValue(of(editedComment));
      component.ngOnInit();

      expect(component.comments[0].comment).toBe('Updated Comment');
      expect(component.comments[0].date_updated).toBe(date);
    });
  });
});
