import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const UserGuarLog: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  let token: string | null = localStorage.getItem('userSecret');
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const UserGuardOut: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  let token: string | null = localStorage.getItem('userSecret');

  if (!token) {
    return true;
  } else {
    return false;
  }
};
export const UserGuardcon: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const adminToken = localStorage.getItem('adminSecret')
  const tutorToken = localStorage.getItem('tutorSecret')


  if (adminToken) {
    router.navigate(['/admin'])
    return false
  } else if (tutorToken) {
    router.navigate(['/tutor'])
    return false
  }
  else {
    return true;
  }
};
