import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  provideRouter,
} from '@angular/router';
import { ListComponent } from './list.component';
import { SeoService } from '../../_services/seo.service';
import { ListsService } from '../../_services/lists.service';
import { of, Subject } from 'rxjs';
import { IconsModule } from '../../_modules/icons/icons.module';
import { WebsocketService } from '../../_services/websocket.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockSeoService: Partial<SeoService>;
  let mockListsService: Partial<ListsService>;
  let mockSnapshot: Partial<ActivatedRouteSnapshot>;
  beforeEach(
    waitForAsync(() => {
      mockSeoService = {
        updateInfo: jest.fn().mockImplementation(metaData => {
          return metaData;
        }),
      };
      mockSnapshot = {
        data: [
          {
            description: 'Listet is a social todo list tool.',
            title: 'Listet App - Lists',
          },
        ],
      };
      mockListsService = {
        getLists: jest.fn().mockReturnValue(of([])),
      };

      TestBed.configureTestingModule({
        imports: [ListComponent, IconsModule],
        providers: [
          provideRouter([]),
          { provide: SeoService, useValue: mockSeoService },
          { provide: ListsService, useValue: mockListsService },
          {
            provide: WebsocketService,
            useValue: {
              connect: jest.fn(),
              emit: jest.fn(),
              disconnect: jest.fn(),
              onEditList: jest.fn().mockReturnValue(new Subject()),
            },
          },
          {
            provide: ActivatedRoute,
            useValue: {
              snapshot: mockSnapshot,
              data: of({ '0': { title: 'Listet App' } }),
            },
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set meta title correctly based on the route data', () => {
    expect(component.getMeta().title).toBe('Listet App - Lists');
  });

  it('should call updateInfo on SeoService with correct meta data', () => {
    mockSeoService?.updateInfo!(component.getMeta());
    expect(mockSeoService.updateInfo).toHaveBeenCalledWith({
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - Lists',
    });
  });
});
