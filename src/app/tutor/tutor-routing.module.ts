import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TutorLoginComponent } from './tutor-login/tutor-login.component';
import { TutorSignUpComponent } from './tutor-sign-up/tutor-sign-up.component';
import { TutorHomeComponent } from './tutor-home/tutor-home.component';
import { VerifyComponent } from './verify/verify.component';
import { TutorComponent } from './tutor.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { TutorProfileComponent } from './tutor-profile/tutor-profile.component';
import { SinglePageComponent } from './single-page/single-page.component';
import { MyBuyersComponent } from './my-buyers/my-buyers.component';
import { TutorGuardLog, TutorGuardOut, TutorGuardcon } from '../guard/tutor.guard';

const routes: Routes = [
  {
    path: '', component: TutorLoginComponent, canActivate: [TutorGuardcon, TutorGuardOut],
  },
  {
    path: 'tutor-login/:id',
    component: TutorLoginComponent,
    canActivate: [TutorGuardOut, TutorGuardcon]

  },
  {
    path: 'tutor-register',
    component: TutorSignUpComponent,
    canActivate: [TutorGuardOut, TutorGuardcon]


  },
  {
    path: 'home',
    component: TutorHomeComponent,
    canActivate: [TutorGuardLog, TutorGuardcon]


  },
  {
    path: 'verify', component: VerifyComponent,
    canActivate: [TutorGuardOut, TutorGuardcon]
  },
  {
    path: 'addCourse', component: AddCourseComponent,
    canActivate: [TutorGuardLog, TutorGuardcon]
  },
  {
    path: 'tutor-profile', component: TutorProfileComponent,
    canActivate: [TutorGuardLog, TutorGuardcon]
  },
  {
    path: 'single-page/:courseId', component: SinglePageComponent, canActivate: [TutorGuardLog, TutorGuardcon]
  },
  { path: 'my-buyers/:courseId', component: MyBuyersComponent, canActivate: [TutorGuardLog, TutorGuardcon] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TutorRoutingModule { }
