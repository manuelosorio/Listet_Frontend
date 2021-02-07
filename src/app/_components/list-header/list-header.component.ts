import {Component, OnInit} from '@angular/core';
import {ListsService} from '../../_services/lists.service';
import {ActivatedRoute} from '@angular/router';
import {MetaTagModel} from '../../models/metatag.model';
import {SeoService} from '../../_services/seo.service';
import {ListDataService} from '../../shared/list-data.service';
import { UsersService } from "../../_services/users.service";

@Component({
  selector: 'app-list-header',
  templateUrl: './list-header.component.html',
  styleUrls: ['./list-header.component.sass']
})
export class ListHeaderComponent implements OnInit {
  header: object;
  private username: any;
  private slug: any;
  private meta: MetaTagModel;
  listId: string;
  listData;
  isOwner: boolean
  constructor(private listService: ListsService,
              private route: ActivatedRoute,
              private seoService: SeoService,
              private listDataService: ListDataService,
              private userService: UsersService) {
    userService.isAuth();
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    userService.username$.subscribe(res => {
      this.isOwner = this.username === res;
    });
  }

  ngOnInit(): void {
    this.listService.getList(this.username, this.slug).subscribe(data => {
      this.header = data;
      this.listId = data[0].id;
      this.listData = {
        id: this.listId,
        allow_comments: data[0].allow_comments,
        isOwner: this.isOwner
      };
      this.listDataService.setData(this.listData);
      let listDescription;
      if (data[0].description !== null) {
        listDescription = data[0].description;
      } else {
        listDescription = 'Listet is a social todo list tool.';
      }
      this.meta = {
        author: data[0].firstName + ' ' + data[0].lastName,
        description: listDescription,
        title: 'Listet App - ' + data[0].name,
        openGraphImage: 'https://listet.manuelosorio.me/assets/images/listet-open-graph.jpg',
      twitterImage: 'https://listet.manuelosorio.me/assets/images/listet-twitter.jpg',
        url: `https://listet.manuelosorio.me/l/${this.username}/${this.slug}`
      };
      this.seoService.updateInfo(this.meta);
      return this.header;
    });
  }
}
