import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from "@angular/router";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {
  public searchForm: UntypedFormGroup;
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
              private formBuilder: UntypedFormBuilder) {
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
