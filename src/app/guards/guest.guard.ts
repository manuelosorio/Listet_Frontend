import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { UsersService } from '@services/users.service';

export const GuestGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userService = inject(UsersService);
  const router = inject(Router);

  return userService.isLoggedIn().pipe(
    filter(auth => auth != null),
    take(1),
    map((res: any) => {
      if (!res.authenticated) {
        router
          .navigate(['/login'], { queryParams: { returnUrl: state.url } })
          .then(() => {
            // window.location.reload();
          });
        return false;
      }
      return true;
    })
  );
};
