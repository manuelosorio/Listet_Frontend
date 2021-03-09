import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UsersService} from '../_services/users.service';
import {map, filter, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UsersService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.userService.isLoggedIn().pipe(filter(auth => auth != null), take(1), map((res: any) => {
      if (res.authenticated) {
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
        return false;
      } else {
        return true;
      }
    }));
  }
}
