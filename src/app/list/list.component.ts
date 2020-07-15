import { Component, OnInit } from '@angular/core';
import { mockedLists } from '../mockups';
import {ListsService} from '../lists.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  // lists = mockedLists;
  constructor(private listService: ListsService,
              private router: Router) { }
  lists: object;

  ngOnInit(): void {
    this.listService.getLists().subscribe(data => {
      this.lists = data;
      console.log(this.lists);
      const currentDay = new Date();
      console.log(currentDay);
    });

  }
  redirect(slug): void {
    this.router.navigateByUrl(`/${slug}`).then(r => {
      return r;
    });
  }
}
