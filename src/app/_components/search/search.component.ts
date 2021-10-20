import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  public searchForm: FormGroup;

  constructor(public router: Router,
              private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search: ['', [
        Validators.minLength(1)
      ]]
    })
  }

  ngOnInit(): void {
  }

  get search() {
    return this.searchForm.get('search');
  }
  onSubmit(query) {
    console.log(query)
  }
}
