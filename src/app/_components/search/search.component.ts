import { Component, HostListener, PLATFORM_ID, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { filter } from 'rxjs/operators';
import { IconsModule } from '@modules/icons/icons.module';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.sass'],
    imports: [ReactiveFormsModule, IconsModule]
})
export class SearchComponent {
  private platformId = inject(PLATFORM_ID);
  router = inject(Router);
  private formBuilder = inject(UntypedFormBuilder);

  public searchForm: UntypedFormGroup;
  public windowWidth: number = 0;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  private hidePaths = [
    '/create-list',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/reset-password/**',
    '/settings',
    '/settings/**',
  ];
  public hideSearch: boolean = false;
  constructor() {
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.minLength(1)]],
    });
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe({
        next: e => {
          const event = e as NavigationEnd;
          for (const path of this.hidePaths) {
            if (event.urlAfterRedirects.indexOf(path) === 0) {
              this.hideSearch = true;
              break;
            }
            this.hideSearch = false;
          }
        },
      });
    if (this.isBrowser) {
      this.windowWidth = window.innerWidth;
    }
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.windowWidth = window.innerWidth;
  }
  get search() {
    return this.searchForm.get('search');
  }
  onSubmit(query: string) {
    this.router.navigate(['/search', query]).then();
  }
}
