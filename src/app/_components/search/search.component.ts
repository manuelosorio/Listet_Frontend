import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  public searchForm: FormGroup;
  public windowWidth: number

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
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.windowWidth = window.innerWidth;
  }
  get search() {
    return this.searchForm.get('search');
  }
  onSubmit(query) {
    console.log(query)
  }
}
