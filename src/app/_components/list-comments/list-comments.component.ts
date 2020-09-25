import {Component, OnInit} from '@angular/core';
import {ListsService} from '../../_services/lists.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-list-comments',
  templateUrl: './list-comments.component.html',
  styleUrls: ['./list-comments.component.sass']
})
export class ListCommentsComponent implements OnInit {
  comments: object;
  private username: any;
  private slug: any;
  private id: string;
  constructor(private listService: ListsService,
              private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.listService.getListComments(this.username, this.slug).subscribe(data => {
        this.comments = data;
        return this.comments;
    });

  }
  getId(listHeader): string {
    return listHeader.map(data => {
      return data.id;
    });
  }
}
