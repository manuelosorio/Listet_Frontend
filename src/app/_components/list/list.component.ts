import {Component, OnInit, ViewChild} from '@angular/core';
import {ListsService} from '../../_services/lists.service';
import {Router} from '@angular/router';
import {NgxMasonryComponent, NgxMasonryOptions} from 'ngx-masonry';
import {MetaTagModel} from '../../models/metatag.model';
import {SeoService} from '../../_services/seo.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  private meta: MetaTagModel;
  constructor(private listService: ListsService,
              private router: Router,
              private seoService: SeoService) {
    this.meta = {
      author: 'Manuel Osorio',
      description: 'Listet is a social todo list tool.',
      title: 'Listet App - All Lists',
      image: 'https://listet.manuelosorio.me/assets/images/listet-banner.jpg/',
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
      console.log(this.lists);
      const currentDay = new Date();
      console.log(currentDay);
      this.show(this.lists);
    });
    this.seoService.updateInfo(this.meta);
  }
  redirect(slug): void {
    this.router.navigateByUrl(`/${slug}`).then(r => {
      return r;
    });
  }

  private show(listsObj: object) {
    for (const index in listsObj) {
      if (listsObj.hasOwnProperty(index )) {
        this.masonryLists.push(this.lists[index]);
        this.masonry.reloadItems();
        this.masonry.layout();
      }
    }
  }
}
