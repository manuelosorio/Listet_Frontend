import { Component, OnInit } from '@angular/core';
import { mockedLists } from '../mockups';
import {ListsService} from '../lists.service';
// import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  // lists = mockedLists;
  constructor(private listService: ListsService) { }
  lists: object;

  ngOnInit(): void {
    this.listService.getLists().subscribe(data => {
      this.lists = data;
      console.log(this.lists);
      const currentDay = new Date();
      console.log(currentDay);
    });
  }

}
