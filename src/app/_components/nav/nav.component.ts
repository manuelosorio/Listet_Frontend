import { Component, OnDestroy } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UserCircle } from '../../shared/other-icons';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
})
export class NavComponent implements OnDestroy {
  public authenticated: boolean;
  private authenticated$: Subscription;
  private hideNavPaths = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/reset-password/**'
  ];

  public loginPath: boolean;
  public isActive = false;
  public username: string;
  public fullName: string
  public userCircle;
  constructor(
    private userService: UsersService,
    private router: Router
  ) {
    this.authenticated$ = this.userService.authenticated$.subscribe(authenticated => {
      this.authenticated = authenticated;
    });
    this.userService.userInfo$.subscribe(res => {
      try {
        this.username = res.username;
        this.fullName = `${res.firstName} ${res.lastName}`
      } catch (e) {}
    });
    this.userCircle = UserCircle;
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
  login() {
    this.router.navigate(["/login"], {
      queryParams: { returnUrl: this.router.routerState.snapshot.url }
    }).catch(e => {
      console.error(e.message)
    }).then();
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

  ngOnDestroy() {
    this.authenticated$.unsubscribe();
  }
}
