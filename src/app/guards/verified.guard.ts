import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { AlertService } from '@services/alert.service';
import { UsersService } from '@services/users.service';

export const VerifiedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const alertService = inject(AlertService);
  const router = inject(Router);
  const userService = inject(UsersService);

  return userService.isLoggedIn().pipe(
    filter(auth => auth != null),
    take(1),
    map((res: any) => {
      if (!res.verified) {
        router.navigate(['/']).then(() => {
          alertService.warning(
            'In order to use this site your account must be verified. Check your inbox or spam folder.',
            null,
            0,
            true
          );
        });
      }
      return true;
    })
  );
};
