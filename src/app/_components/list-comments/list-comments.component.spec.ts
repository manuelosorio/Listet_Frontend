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
import { Observable } from 'rxjs';

describe('ListCommentsComponent', () => {
  let component: ListCommentsComponent;
  let fixture: ComponentFixture<ListCommentsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ListCommentsComponent, BackButtonComponent],
        providers: [
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting(),
          provideRouter([]),
          {
            provide: WebsocketService,
            useValue: {
              onCreateComment: jest.fn().mockReturnValue(new Observable()),
              onDeleteComment: jest.fn().mockReturnValue(new Observable()),
              onUpdateComment: jest.fn().mockReturnValue(new Observable()),
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
