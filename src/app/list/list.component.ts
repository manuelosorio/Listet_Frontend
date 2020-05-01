import { Component, OnInit } from '@angular/core';
import { mockedLists } from '../mockups';
// import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.sass']
})
export class ListComponent implements OnInit {
  lists = mockedLists;
  constructor() { }

  ngOnInit(): void {
  }

}
