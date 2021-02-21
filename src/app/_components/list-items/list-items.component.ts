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
  lists: object;
  items;
  isOwner: boolean;
  deadline: Date;
  private username: any;
  private slug: any;
  isChecked: boolean;
  constructor(private listService: ListsService,
              private route: ActivatedRoute,
              private listDataService: ListDataService) {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.listDataService.listData.subscribe(data => {
      console.log(this.isOwner);
      this.isOwner = data.isOwner;
    })
  }
  checked(event) {
    return this.isChecked = event.target.checked;
  }

  ngOnInit(): void {
    this.listService.getListItems(this.username, this.slug).subscribe(data => {
      data[0].deadline = new Date(data[0].deadline);
      return this.items = data;
    });
  }
}
