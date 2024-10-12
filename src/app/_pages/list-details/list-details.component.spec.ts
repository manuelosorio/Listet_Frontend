import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListDetailsComponent } from './list-details.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { IconsModule } from '@modules/icons/icons.module';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '@services/websocket.service';
import { Observable } from 'rxjs';

describe('ListDetailsComponent', () => {
  let component: ListDetailsComponent;
  let fixture: ComponentFixture<ListDetailsComponent>;
  let mockedWebSocketService: Partial<WebsocketService>;
  beforeEach(
    waitForAsync(() => {
      mockedWebSocketService = {
        connect: jest.fn(),
        emit: jest.fn(),
        listen: jest.fn().mockReturnValue(new Observable()), // Ensure all methods return observables
        disconnect: jest.fn(),
        onCompleteItem: jest.fn().mockReturnValue(new Observable()),
        onAddItem: jest.fn().mockReturnValue(new Observable()),
        onUpdateItem: jest.fn().mockReturnValue(new Observable()),
        onDeleteItem: jest.fn().mockReturnValue(new Observable()),
        onDeleteList: jest.fn().mockReturnValue(new Observable()),
        onEditList: jest.fn().mockReturnValue(new Observable()),
        onCreateComment: jest.fn().mockReturnValue(new Observable()),
        onDeleteComment: jest.fn().mockReturnValue(new Observable()),
        onUpdateComment: jest.fn().mockReturnValue(new Observable()),
      };
      TestBed.configureTestingModule({
        imports: [ListDetailsComponent, IconsModule],
        providers: [
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting(),
          WebsocketService,
          {
            provide: WebsocketService,
            useValue: mockedWebSocketService,
          },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                params: {
                  username: 'mockeduser',
                  slug: 'mockedslug',
                },
              },
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render list header component', () => {
    const listHeader = fixture.nativeElement.querySelector('app-list-header');
    expect(listHeader).toBeTruthy();
  });
  it('should render list items component', () => {
    const listItems = fixture.nativeElement.querySelector('app-list-items');
    expect(listItems).toBeTruthy();
  });
  it('should render comments component', () => {
    const comments = fixture.nativeElement.querySelector('app-list-comments');
    expect(comments).toBeTruthy();
  });
});
