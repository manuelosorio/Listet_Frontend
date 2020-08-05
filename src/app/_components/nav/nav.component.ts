import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../_services/users.service';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  authenticated: boolean;
  router: Router;
  hideNavPaths = [
    '/login',
    '/register'
  ].toString().split(',');
  loginPath: boolean;
  constructor(
    private userService: UsersService,
    router: Router
  ) {
    this.userService.authenticated.subscribe(authenticated => {
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
  ngOnInit(): void {
  }
}
