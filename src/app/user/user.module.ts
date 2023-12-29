import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import { MaterialModule } from '../material.module';
import { UserHomeComponent } from './user-home/user-home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VerifyComponent } from './verify/verify.component';
import { FooterComponent } from './footer/footer.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from '../service/user.service';
import { PopupComponent } from '../modal/popup/popup.component';
import { SinglePageComponent } from './single-page/single-page.component';
import { BookingsComponent } from './bookings/bookings.component';
import { SingleVideoComponent } from './single-video/single-video.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CoursesComponent } from './courses/courses.component';
import { TutorsComponent } from './tutors/tutors.component';
import { shareModule } from '../shareModule';
import { ReviewComponent } from './review/review.component';
import { NgxStarRatingModule } from 'ngx-star-rating';


@NgModule({
  declarations: [
    UserComponent,
    UserNavComponent,
    UserHomeComponent,
    UserLoginComponent,
    UserRegisterComponent,
    VerifyComponent,
    FooterComponent,
    UserProfileComponent,
    PopupComponent,
    SinglePageComponent,
    BookingsComponent,
    SingleVideoComponent,
    EditProfileComponent,
    CoursesComponent,
    TutorsComponent,
    ReviewComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    shareModule,
    NgxStarRatingModule
  ],
  providers: [UserService],
})
export class UserModule { }
