import {Component, Input, OnInit} from '@angular/core';
import {ListsService} from '../../_services/lists.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.sass']
})
export class ListHeaderComponent implements OnInit {
  header: object;
  private username: any;
  private slug: any;
  @Input() listId: string;
  constructor(private listService: ListsService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.listService.getList(this.username, this.slug).subscribe(data => {
      this.header = data;
      return this.header;
    });
  }

}
