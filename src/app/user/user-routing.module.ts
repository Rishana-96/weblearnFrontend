import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { VerifyComponent } from './verify/verify.component';
import { UserGuarLog, UserGuardOut, UserGuardcon } from '../guard/user.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SinglePageComponent } from './single-page/single-page.component';
import { BookingsComponent } from './bookings/bookings.component';
import { SingleVideoComponent } from './single-video/single-video.component';
import { CoursesComponent } from './courses/courses.component';
import { TutorComponent } from '../tutor/tutor.component';
import { TutorsComponent } from './tutors/tutors.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', component: UserHomeComponent, canActivate: [UserGuardcon] },
  { path: 'course', component: CoursesComponent, canActivate: [UserGuardcon] },
  { path: 'tutors', component: TutorsComponent, canActivate: [UserGuardcon] },
  {
    path: 'login',
    component: UserLoginComponent,
    canActivate: [UserGuardOut, UserGuardcon],
  },
  {
    path: 'login/:id',
    component: UserLoginComponent,
    canActivate: [UserGuardcon, UserGuardOut],
  },
  {
    path: 'register',
    component: UserRegisterComponent,
    canActivate: [UserGuardcon, UserGuardOut],
  },
  { path: 'verify', component: VerifyComponent, canActivate: [UserGuardcon, UserGuardOut] },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [UserGuardcon, UserGuarLog]
  },
  {
    path: 'single-page/:courseId',
    component: SinglePageComponent,
    canActivate: [UserGuardcon, UserGuarLog]
  },
  {
    path: 'bookings',
    component: BookingsComponent,
    canActivate: [UserGuardcon, UserGuarLog]
  },
  {
    path: 'single-Video/:orderId',
    component: SingleVideoComponent,
    canActivate: [UserGuardcon, UserGuarLog]
  },
  {
    path: 'review', component: ReviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
