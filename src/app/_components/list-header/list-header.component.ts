import {Component, Input, OnInit} from '@angular/core';
import {ListsService} from '../../_services/lists.service';
import {ActivatedRoute} from '@angular/router';
import {MetaTagModel} from '../../models/metatag.model';
import {SeoService} from '../../_services/seo.service';

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
  @Input() listId: string;
  constructor(private listService: ListsService,
              private route: ActivatedRoute,
              private seoService: SeoService) {
  }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;
    this.slug = this.route.snapshot.params.slug;
    this.listService.getList(this.username, this.slug).subscribe(data => {
      this.header = data;
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
        image: 'https://listet.manuelosorio.me/assets/images/listet-banner.jpg/',
        url: `https://listet.manuelosorio.me/l/${this.username}/${this.slug}`
      };
      this.seoService.updateInfo(this.meta);
      return this.header;
    });
  }
}
