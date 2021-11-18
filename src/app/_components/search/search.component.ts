import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  public searchForm: FormGroup;
  public windowWidth: number

  private hidePaths = [
    '/create-list',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/reset-password/**',
    '/settings',
    '/settings/**'
  ];
  public hideSearch: boolean;
  constructor(public router: Router,
              private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      search: ['', [
        Validators.minLength(1)
      ]]
    });
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      for (const path of this.hidePaths) {
        if (event.urlAfterRedirects.indexOf(path) === 0) {
          this.hideSearch = true;
          break;
        }
        this.hideSearch = false;
      }
    })
    this.windowWidth = window.innerWidth;
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
    this.router.navigate(['/search', query]).then();
  }
}
