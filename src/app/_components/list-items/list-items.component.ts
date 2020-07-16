import { Component, OnInit } from '@angular/core';
import {ListsService} from '../../_services/lists.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.sass']
})
export class ListItemsComponent implements OnInit {

  items: object;
  private username: any;
  private slug: any;
  constructor(private listService: ListsService,
              private route: ActivatedRoute) {

  }

  lists: object;

  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.listService.getListItems(this.username, this.slug).subscribe(data => {
      this.items = data;
      return this.items;
    });
  }
}
