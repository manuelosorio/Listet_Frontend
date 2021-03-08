import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ListsService } from '../../_services/lists.service';
import {Router} from '@angular/router';
import { NgxMasonryComponent, NgxMasonryOptions } from 'ngx-masonry';
import { MetaTagModel } from '../../models/metatag.model';
import { SeoService } from '../../_services/seo.service';
import { isPlatformBrowser } from "@angular/common";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  private readonly meta: MetaTagModel;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private listService: ListsService,
    private router: Router,
    private seoService: SeoService) {
    this.meta = {
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - All Lists',
      openGraphImage: 'https://listet.manuelosorio.me/assets/images/listet-open-graph.jpg',
      twitterImage: 'https://listet.manuelosorio.me/assets/images/listet-twitter.jpg',
      url: 'https://listet.manuelosorio.me/lists'
    };
  }
  lists: object = [];
  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    animations: {},
  };
  masonryLists = [];

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;

  ngOnInit(): void {
    this.listService.getLists().subscribe(data => {
      this.lists = data;
      this.show(this.lists);
    });
    this.seoService.updateInfo(this.meta);
  }

  private show(listsObj: object) {
    for (const index in listsObj) {
      if (listsObj.hasOwnProperty(index)) {
        this.masonryLists.push(this.lists[index]);
        if (this.isBrowser) {
          this.masonry.reloadItems();
          this.masonry.layout();
        }
      }
    }
  }
}
