import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { TutorListComponent } from './tutor-list/tutor-list.component';
import { AdminGuardOut, AdminGuardLog, AdminGuardcon } from '../guard/admin.guard';
import { ApproveTutorComponent } from './approve-tutor/approve-tutor.component';
import { CourseListComponent } from './course-list/course-list.component';

const routes: Routes = [
  { path: '', component: AdminLoginComponent, canActivate: [AdminGuardcon, AdminGuardOut] },
  { path: 'dashboard', component: AdminDashboardComponent, canActivate: [AdminGuardcon, AdminGuardLog] },
  { path: 'approveTutor', component: ApproveTutorComponent, canActivate: [AdminGuardcon, AdminGuardLog] },
  { path: 'userList', component: UserListComponent, canActivate: [AdminGuardcon, AdminGuardLog] },
  { path: 'tutorList', component: TutorListComponent, canActivate: [AdminGuardcon, AdminGuardLog] },
  { path: 'tutorList', component: TutorListComponent, canActivate: [AdminGuardcon, AdminGuardLog] },
  { path: 'courseList', component: CourseListComponent, canActivate: [AdminGuardcon, AdminGuardLog] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
