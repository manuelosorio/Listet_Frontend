import { Component, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
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
  @Input() private pageType?: "Lists" | "Home" | "User";
  @Input() private profileUser?: string;
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
  lists: any = [];
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
  private show(listsObj: any) {
    switch (this.pageType) {
      case "Home": {
        for (const index in listsObj) {
          if (listsObj.hasOwnProperty(index) && !!this.lists[index].featured) {
            this.masonryLists.push(this.lists[index]);
            if (this.isBrowser) {
              this.masonry.reloadItems();
              this.masonry.layout();
            }
          }
        }
        break;
      }
      case "User": {
        let listArr = this.lists.reduce((acc, list) => {
          if (list.owner_username === this.profileUser) {
            this.masonryLists.push(list)
            acc.push(list)
          }
          return acc;
        }, []);
        if (!listArr.length) {
          this.router.navigateByUrl('404', { skipLocationChange: true })
        } else {
          if (this.isBrowser) {
            this.masonry.reloadItems();
            this.masonry.layout();
          }
        }
        break;
      }
      case "Lists":
      default: {
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
  }
}
