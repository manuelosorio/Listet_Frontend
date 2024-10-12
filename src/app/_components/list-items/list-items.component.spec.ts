import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListItemsComponent } from './list-items.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IconsModule } from '@modules/icons/icons.module';
import { WebsocketService } from '@services/websocket.service';
import { ListDataService } from '@shared/list-data.service';
import { ListsService } from '@services/lists.service';
import { Subject } from 'rxjs';

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
  let listService: ListsService;
  let listDataService: ListDataService;
  let webSocketService: WebsocketService;
  let listenSubject: Subject<number>;
  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.items.push({
      id: 1,
      item: 'mocked item',
      deadline: null,
      completed: false,
      list_id: 1,
      isEditing: false,
      username: 'mockeduser',
      slug: 'mockedslug',
    });

    listService = TestBed.inject(ListsService);
    listDataService = TestBed.inject(ListDataService);
    webSocketService = TestBed.inject(WebsocketService);
    listenSubject = new Subject<number>();
    jest
      .spyOn(webSocketService, 'listen')
      .mockReturnValue(listenSubject.asObservable());
    listDataService.setData({
      allow_comments: 0,
      id: 40,
      isOwner: true,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render list item', () => {
    fixture.detectChanges();
    const listItems: HTMLElement[] = fixture.nativeElement.querySelectorAll(
      '.list-item'
    );
    expect(listItems.length).toBe(1);

    const listItemText = listItems[0].querySelector('.list-item__info');
    expect(listItemText?.textContent).toBe('mocked item');
  });
  it('should render list item context menu if list owner', () => {
    fixture.detectChanges();
    const listItems = fixture.nativeElement.querySelectorAll('.list-item');

    const listItemContextMenu = listItems[0].querySelector('.more');
    expect(listItemContextMenu).toBeTruthy();
  });
  it('should not render list item context menu if not list owner', () => {
    listDataService.setData({
      allow_comments: 0,
      id: 40,
      isOwner: false,
    });
    fixture.detectChanges();
    const listItems = fixture.nativeElement.querySelectorAll('.list-item');

    const listItemContextMenu = listItems[0].querySelector('.more');
    expect(listItemContextMenu).toBeFalsy();
  });
  it('should render add item component', () => {
    console.log(component.isOwner);
    const addItemComponent = fixture.nativeElement.querySelector(
      'app-add-item'
    );
    expect(addItemComponent).toBeTruthy();
  });

  it('should call deleteListItem when delete button is clicked', () => {
    jest.spyOn(window, 'confirm').mockReturnValue(true);
    const listItems = fixture.nativeElement.querySelectorAll('.list-item');
    const deleteButton = listItems[0].querySelector('.delete');
    jest.spyOn(component, 'deleteListItem');
    deleteButton.click();
    expect(component.deleteListItem).toHaveBeenCalled();
  });

  it('should delete an item', () => {
    component['deleteArrObject'](component.items[0].id);
    expect(component.items.length).toBe(0);
  });

  it('should fail to delete an item', () => {
    component['deleteArrObject'](2);
    expect(component.items.length).toBe(1);
  });

  it('should check if item is completed', () => {
    const listItems = fixture.nativeElement.querySelectorAll('.list-item');
    const inputElement = fixture.nativeElement.querySelector(
      `#item-${component.items[0].id}`
    );
    listItems[0].click();
    expect(inputElement.checked).toBeTruthy();
  });

  it('should edit item', () => {
    const listItems = fixture.nativeElement.querySelectorAll('.list-item');
    const editButton = listItems[0].querySelector('.edit');
    fixture.detectChanges();
    const editor = fixture.nativeElement.querySelectorAll('app-edit-list-item');
    editButton.click();
    expect(component.items[0].isEditing).toBeTruthy();
    expect(editor).toBeTruthy();
  });
});
