import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { UsersService } from '../_services/users.service';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard  {
  constructor(private router: Router, private userService: UsersService) {
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
        }
        return true;
      }));
  }
}
