import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UsersService } from '../_services/users.service';
import { filter, map, take } from 'rxjs/operators';

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UsersService);
  const router = inject(Router);

  return userService.isLoggedIn().pipe(
    filter(auth => auth != null),
    take(1),
    map((res: any) => {
      if (res.authenticated) {
        router.navigate(['/']).then(() => {
          // window.location.reload();
        });
        return false;
      } else {
        return true;
      }
    })
  );
};

export const AuthGuardChild: CanActivateChildFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => AuthGuard(route, state);
