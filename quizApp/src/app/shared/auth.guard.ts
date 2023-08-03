import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isLoggedInGuard) {
    return true;
  } else {
    alert('Login to access this page');
    router.navigate(['/login']);
    return false;
  }
};
