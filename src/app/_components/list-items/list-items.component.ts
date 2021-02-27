import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../_services/lists.service';
import { ListDataService } from "../../shared/list-data.service";
import { WebsocketService } from "../../_services/websocket.service";
import { ListItemEvents } from "../../helper/list-item.events";
import { ListItemModel } from "../../models/list-item.model";

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
  lists: object;
  items;
  isOwner: boolean;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private username: any;
  private slug: any;
  isChecked: boolean;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private listService: ListsService,
    private route: ActivatedRoute,
    private listDataService: ListDataService,
    private webSocketService: WebsocketService
  ) {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.webSocketService.connect(`items-${this.username}-${this.slug}`);
    this.listService.getListItems(this.username, this.slug).subscribe(data => {
      return this.items = data;
    });

    this.listDataService.listData.subscribe(data => {
      this.isOwner = data.isOwner;
    });
  }
  checked(event) {
    const targetId = event.target.id.replace('item-', '');
    const item = this.items.filter(item => item.id == targetId)[0];
    item.completed = event.target.checked ? 1 : 0;
    this.listService.completeListItem(item).subscribe(_res => {
      this.webSocketService.emit(ListItemEvents.COMPLETE_ITEM, item);
    }, error => {
      console.error(error)
    }, () => {
    })
  }
  public deleteListItem(id) {
    this.listService.deleteListItem(id).subscribe(_res => {
      this.deleteArrObject(id);
      this.webSocketService.emit(ListItemEvents.DELETE_ITEM, id);
    }, error => {
      console.error(error)
    })
  }
  private deleteArrObject(id) {
    this.items = this.items.filter((item) => {
      return item.id != id;
    })

  }
  ngOnInit(): void {
    if (this.isBrowser) {
      this.webSocketService.onCompleteItem().subscribe((res: ListItemModel | any) => {
        const item = this.items.filter(i => i.id == res.id)[0];
        item.completed = res.completed;
        console.log(res);
      }, error => {
        console.error(error);
      });
      this.webSocketService.onAddItem().subscribe((res: ListItemModel | any) => {
        console.log(res);
        this.items.push(res)
        console.log(res)
      }, error => {
        console.error(error)
      });
      this.webSocketService.onDeleteItem().subscribe((res: ListItemModel | any) => {
        this.deleteArrObject(res);
        console.log(this.items)
      }, error => {
        console.error(error);
      })
    }
  }
  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }
}
