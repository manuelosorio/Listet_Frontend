import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsersService } from '../_services/users.service';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private userService: UsersService, private alertService: AlertService) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.isLoggedIn().pipe(filter(auth => auth != null),
      take(1),
      map((res: any) => {
        if (!res.authenticated) {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } }).then(() => {
            window.location.reload();
          });
          return false;
        } else if (!res.verified) {
          this.router.navigate(['/']).then(() => {
            this.alertService.warning('In order to use this site your account must be verified. Check your inbox or spam folder.', true);
          });
        } else {
          return true;
        }
      }));
  }
}
