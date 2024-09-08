import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FeatherModule } from 'angular-feather';
import { DeadlineComponent } from '@shared/deadline/deadline.component';
import { ListDataService } from '@shared/list-data.service';
import { AddItemComponent } from '@components/add-item/add-item.component';
import { EditListItemComponent } from '@components/edit-list-item/edit-list-item.component';
import { ListItemEvents } from '@helpers/list-item.events';
import { ListItemModel } from '@models/list-item.model';
import { ListModel } from '@models/list.model';
import { ListDataModel } from '@models/list-data.model';
import { ListsService } from '@services/lists.service';
import { WebsocketService } from '@services/websocket.service';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.sass'],
  standalone: true,
  imports: [
    FeatherModule,
    DeadlineComponent,
    EditListItemComponent,
    AddItemComponent,
  ],
  providers: [ListsService, ListDataService, WebsocketService],
})
export class ListItemsComponent implements OnInit, OnDestroy {
  public lists: ListModel[] = [];
  public items: ListItemModel[] = [];
  public isOwner?: boolean;
  public isEditing: boolean = false;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private username: any;
  private slug: any;
  private listData$: Subscription;
  private getListItems$: Subscription;
  private onCompleteItem$: Subscription = new Subscription();
  private onDeleteItem$: Subscription = new Subscription();
  private onAddItem$: Subscription = new Subscription();
  private onUpdateItem$: Subscription = new Subscription();
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private listService: ListsService,
    private route: ActivatedRoute,
    private listDataService: ListDataService,
    private webSocketService: WebsocketService
  ) {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.getListItems$ = this.listService
      .getListItems(this.username, this.slug)
      .subscribe(data => {
        this.items = (data as unknown) as ListItemModel[];
        this.items.filter((item: ListItemModel) => {
          return (item.isEditing = false);
        });
        return this.items;
      });
    this.listData$ = this.listDataService.listData$.subscribe(
      (data: ListDataModel) => {
        this.isOwner = data[`isOwner`] as boolean;
      }
    );
  }
  public checked(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const targetId = Number(inputElement.id.replace('item-', ''));
    const filterItem = this.items.filter(
      (item: ListItemModel) => item.id == targetId
    )[0];
    filterItem.completed = inputElement.checked ? 1 : 0;
    this.listService.completeListItem(filterItem).subscribe({
      next: () => {
        this.webSocketService.emit(ListItemEvents.COMPLETE_ITEM, filterItem);
      },
      error: error => {
        console.error(error);
      },
      complete: () => {},
    });
  }
  public edit(item: ListItemModel) {
    item.isEditing = true;
  }
  public deleteListItem(id: number) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.listService.deleteListItem(id).subscribe({
        next: () => {
          this.webSocketService.emit(ListItemEvents.DELETE_ITEM, id);
        },
        error: error => {
          console.error(error);
        },
      });
    }
  }
  private deleteArrObject(id: number) {
    this.items = this.items.filter(item => {
      return item.id != id;
    });
  }
  ngOnInit(): void {
    if (this.isBrowser) {
      this.onCompleteItem$ = this.webSocketService.onCompleteItem().subscribe({
        next: (res: ListItemModel) => {
          const item = this.items.filter(i => i.id == res.id)[0];
          item.completed = res.completed;
        },
        error: error => {
          console.error(error);
        },
      });
      this.onAddItem$ = this.webSocketService.onAddItem().subscribe({
        next: (item: ListItemModel) => {
          item.isEditing = false;
          this.items.push(item);
        },
        error: error => {
          console.error(error);
        },
      });
      this.onUpdateItem$ = this.webSocketService
        .onUpdateItem()
        .subscribe((res: ListItemModel) => {
          return this.items.filter((item: ListItemModel) => {
            if (item.id == res.id) {
              item.item = res.item;
              item.deadline = res.deadline;
              return item;
            } else {
              return item;
            }
          });
        });
      this.onDeleteItem$ = this.webSocketService
        .listen(ListItemEvents.DELETE_ITEM)
        .subscribe({
          next: (res: ListItemModel | any) => {
            this.deleteArrObject(res);
          },
          error: error => {
            console.error(error);
          },
        });
    }
  }
  ngOnDestroy(): void {
    this.getListItems$.unsubscribe();
    this.listData$.unsubscribe();
    if (this.isBrowser) {
      this.onAddItem$.unsubscribe();
      this.onCompleteItem$.unsubscribe();
      this.onUpdateItem$.unsubscribe();
      this.onDeleteItem$.unsubscribe();
    }
  }
}
