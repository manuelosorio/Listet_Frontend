import {Component, OnInit, ViewChild} from '@angular/core';
import {ListsService} from '../../_services/lists.service';
import {Router} from '@angular/router';
import {NgxMasonryComponent, NgxMasonryOptions} from 'ngx-masonry';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  // lists = mockedLists;
  constructor(private listService: ListsService,
              private router: Router) { }
  lists: object = [];
  public masonryOptions: NgxMasonryOptions = {
    gutter: 20,
    animations: {},
    percentPosition: true
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
