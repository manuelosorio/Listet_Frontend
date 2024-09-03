import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListHeaderComponent } from './list-header.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { IconsModule } from '../../_modules/icons/icons.module';
import { ActivatedRoute } from '@angular/router';
import { WebsocketService } from '../../_services/websocket.service';
import { Observable } from 'rxjs';

describe('ListHeaderComponent', () => {
  let component: ListHeaderComponent;
  let fixture: ComponentFixture<ListHeaderComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ListHeaderComponent, IconsModule],
        providers: [
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting(),
          {
            provide: WebsocketService,
            useValue: {
              onEditList: jest.fn().mockReturnValue(new Observable()),
              onDeleteList: jest.fn().mockReturnValue(new Observable()),
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
    fixture = TestBed.createComponent(ListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
