import { NgModule } from '@angular/core';
import { TutorService } from './service/tutor.service';
import { AdminService } from './service/admin.service';
import { UserService } from './service/user.service';
@NgModule({
    providers: [TutorService, AdminService, UserService]

})
export class shareModule { }