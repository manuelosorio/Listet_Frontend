import { Component, OnInit } from '@angular/core';
import {ListsService} from '../../_services/lists.service';
import {ActivatedRoute} from '@angular/router';
import { ListDataService } from "../../shared/list-data.service";

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.sass']
})
/**
 * todo:
 *  [] Make the list-item into valid html
 *  [] Add a checkbox function.
 *  [] Implement socket.io list item update event
 *  [X] Readonly view for non-owners.
 *
 */
export class ListItemsComponent implements OnInit {

  items;
  private username: any;
  private slug: any;
  isOwner: boolean;
  constructor(private listService: ListsService,
              private route: ActivatedRoute,
              private listDataService: ListDataService) {
  }

  lists: object;

  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.listDataService.listData.subscribe(data => {
      this.isOwner = data.isOwner;
    })
    this.listService.getListItems(this.username, this.slug).subscribe(data => {
      return this.items = data;
    });
  }
}
