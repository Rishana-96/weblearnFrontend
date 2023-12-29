import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AdminGuardLog: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  let token: string | null = localStorage.getItem('adminSecret');

  if (!token) {
    router.navigate(['/admin']);
    return false;
  } else {
    return true;
  }
};

export const AdminGuardOut: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  let token: string | null = localStorage.getItem('adminSecret');
  if (token) {
    router.navigate(['/admin/dashboard']);
    return false;
  } else {
    return true;
  }
};


export const AdminGuardcon: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  let usertoken: string | null = localStorage.getItem('userSecret');
  let tutortoken: string | null = localStorage.getItem('tutorSecret');

  if (usertoken) {
    router.navigate(['/']);
    return false;
  } else if (tutortoken) {
    router.navigate(['/tutor']);
    return false;
  } else {
    return true;
  }
};
