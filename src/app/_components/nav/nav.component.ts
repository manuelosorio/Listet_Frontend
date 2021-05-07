import { Component, OnDestroy, OnInit } from '@angular/core';
import {UsersService} from '../../_services/users.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit, OnDestroy {
  authenticated: boolean;

  private authenticated$: Subscription;
  hideNavPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/reset-password/**'
  ].toString().split(',');
  loginPath: boolean;
  isActive = false;
  constructor(
    private userService: UsersService,
    private router: Router,
  ) {
    this.authenticated$ = this.userService.authenticated$.subscribe(authenticated => {
      this.authenticated = authenticated;
    });
    router.events.pipe(
      filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        for (const path of this.hideNavPaths) {
          if (event.urlAfterRedirects.indexOf(path) === 0) {
            this.loginPath = true;
            break;
          }
          this.loginPath = false;
        }
      });
  }
  logout() {
    this.userService.logoutUser();
    // TODO: Find a proper way to
    //       accomplish this same effect.
    setTimeout(() => {
      location.reload();
      }, 100);
  }
  toggleActive() {
    this.isActive  = !this.isActive;
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.authenticated$.unsubscribe();
  }
}
