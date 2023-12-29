import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const TutorGuardLog: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  let token: string | null = localStorage.getItem('tutorSecret');

  if (!token) {
    router.navigate(['/tutor']);
    return false;
  } else {
    return true;
  }
};

export const TutorGuardOut: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  let token: string | null = localStorage.getItem('tutorSecret');

  if (token) {
    router.navigate(['/tutor/home']);
    return false;
  } else {
    return true;
  }
};
export const TutorGuardcon: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);

  const adminToken = localStorage.getItem('adminSecret')
  const userToken = localStorage.getItem('userSecret')


  if (adminToken) {
    router.navigate(['/admin'])
    return false
  } else if (userToken) {
    router.navigate(['/'])
    return false
  }
  else {
    return true;
  }
};
