import { Component, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ListsService } from '../../_services/lists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMasonryAnimations, NgxMasonryComponent, NgxMasonryOptions } from '../../shared/ngx-masonry/ngx-masonry-api';
import { MetaTagModel } from '../../models/metatag.model';
import { SeoService } from '../../_services/seo.service';
import { isPlatformBrowser } from '@angular/common';
import { AnimationFactory } from '@angular/animations';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  private readonly meta: MetaTagModel;
  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  @Input() private pageType?: 'Lists' | 'Home' | 'User' | 'AuthedUser';
  @Input() private profileUser?: string;
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private listService: ListsService,
    private router: Router,
    private route: ActivatedRoute,
    private seoService: SeoService) {
    this.meta = this.route.snapshot.data[0];
  }
  lists: any = [];
  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    animations: {},
  };
  masonryLists = [];

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
  ngOnInit(): void {
    if (this.pageType !== 'AuthedUser') {
      this.listService.getLists().subscribe(async (data) => {
        this.lists = data;
        await this.show(this.lists);
      });
    }
    if (this.pageType === 'AuthedUser') {
      this.listService.getAuthUserLists().subscribe(async (data) => {
        this.lists = data;
        await this.show(this.lists);
      });
    }
    if (this.pageType === 'User' ) {
      this.meta.title += `${this.route.snapshot.params.username}'s Lists`;
    }
    this.seoService.updateInfo(this.meta);
  }
  private async show(listsObj: any) {
    switch (this.pageType) {
      case 'Home': {
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
      case 'User': {
        const listArr = this.lists.reduce((acc, list) => {
          if (list.owner_username === this.profileUser) {
            this.masonryLists.push(list);
            acc.push(list);
          }
          return acc;
        }, []);
        if (!listArr.length) {
          await this.router.navigateByUrl('404', { skipLocationChange: true });
        } else {
          if (this.isBrowser) {
            this.masonry.reloadItems();
            this.masonry.layout();
          }
        }
        break;
      }
      case 'AuthedUser':
      case 'Lists':
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
