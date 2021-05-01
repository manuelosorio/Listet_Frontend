import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../_services/lists.service';
import { ListDataService } from '../../shared/list-data.service';
import { WebsocketService } from '../../_services/websocket.service';
import { ListItemEvents } from '../../helper/list-item.events';
import { ListItemModel } from '../../models/list-item.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.sass']
})
/**
 * todo:
 *  [x] Make the list-item into valid html
 *  [x] Add a checkbox function.
 *  [] Implement socket.io list item update event
 *  [X] Readonly view for non-owners.
 *
 */
export class ListItemsComponent implements OnInit, OnDestroy {
  public lists: object;
  public items;
  public isOwner: boolean;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private username: any;
  private slug: any;
  isChecked: boolean;
  private listData$: Subscription;
  private getListItems$: Subscription;
  private onCompleteItem$: Subscription;
  private onDeleteItem$: Subscription;
  private onAddItem$: Subscription;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private listService: ListsService,
    private route: ActivatedRoute,
    private listDataService: ListDataService,
    private webSocketService: WebsocketService
  ) {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.getListItems$ = this.listService.getListItems(this.username, this.slug).subscribe(data => {
      return this.items = data;
    });

    this.listData$ = this.listDataService.listData$.subscribe(data => {
      this.isOwner = data[`isOwner`];
      console.log(data);
    });
  }
  checked(event) {
    const targetId = event.target.id.replace('item-', '');
    const filterItem = this.items.filter(item => item.id == targetId)[0];
    filterItem.completed = event.target.checked ? 1 : 0;
    this.listService.completeListItem(filterItem).subscribe(() => {
      this.webSocketService.emit(ListItemEvents.COMPLETE_ITEM, filterItem);
    }, error => {
      console.error(error);
    }, () => {
    });
  }
  public deleteListItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.listService.deleteListItem(id).subscribe(() => {
        this.webSocketService.emit(ListItemEvents.DELETE_ITEM, id);
      }, error => {
        console.error(error);
      });
    }
  }
  private deleteArrObject(id) {
    this.items = this.items.filter((item) => {
      return item.id != id;
    });
  }
  ngOnInit(): void {
    if (this.isBrowser) {
      this.onCompleteItem$ = this.webSocketService.listen(ListItemEvents.COMPLETE_ITEM).subscribe((res: ListItemModel | any) => {
        const item = this.items.filter(i => i.id == res.id)[0];
        item.completed = res.completed;
      }, error => {
        console.error(error);
      });
      this.onAddItem$ = this.webSocketService.listen(ListItemEvents.ADD_ITEM).subscribe((item) => {
        this.items.push(item);
      }, error => {
        console.error(error);
      });
      this.onDeleteItem$ = this.webSocketService.listen(ListItemEvents.DELETE_ITEM).subscribe((res: ListItemModel | any) => {
        this.deleteArrObject(res);
      }, error => {
        console.error(error);
      });
    }
  }
  ngOnDestroy(): void {
    this.getListItems$.unsubscribe();
    this.listData$.unsubscribe();
    if (this.isBrowser) {
      this.onAddItem$.unsubscribe();
      this.onCompleteItem$.unsubscribe();
      this.onDeleteItem$.unsubscribe();
    }
  }
}
