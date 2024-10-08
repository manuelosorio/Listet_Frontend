import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListItemsComponent } from './list-items.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IconsModule } from '@modules/icons/icons.module';
import { WebsocketService } from '@services/websocket.service';

describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixture: ComponentFixture<ListItemsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ListItemsComponent, IconsModule],
        providers: [
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting(),
          {
            provide: WebsocketService,
            useValue: {
              onEditList: jest.fn().mockReturnValue(new Observable()),
              onDeleteList: jest.fn().mockReturnValue(new Observable()),
              onAddItem: jest.fn().mockReturnValue(new Observable()),
              onDeleteItem: jest.fn().mockReturnValue(new Observable()),
              onUpdateItem: jest.fn().mockReturnValue(new Observable()),
              onCompleteItem: jest.fn().mockReturnValue(new Observable()),
            },
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
    fixture = TestBed.createComponent(ListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
