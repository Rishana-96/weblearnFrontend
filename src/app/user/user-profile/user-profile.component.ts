import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../service/user.service';

import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../../modal/popup/popup.component';
import { environment } from '../../../environments/environment.development';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  name: string = '';
  email: string = '';
  education: string = '';
  tempImage: string = 'https://img.myloview.com/stickers/employee-icon-vector-male-user-person-profile-avatar-symbol-for-business-in-a-flat-color-glyph-pictogram-sign-illustration-700-286087138.jpg'
  showImage: boolean = false
  private _subscription: Subscription = new Subscription();
  image!: string;
  constructor(
    private _userService: UserService,
    private _toastr: ToastrService,
    private _matDialog: MatDialog,
    private _fb: FormBuilder,
    private _router: Router

  ) { }

  ngOnInit(): void {
    this._subscription.add(
      this._userService.userDetails().subscribe({
        next: (res) => {

          this.name = res.name;
          this.email = res.email;
          this.education = res.education;
          this.image = res.image

          this.showImage = res.image ? false : true
        },
        error: (err) => {
          if (err.error.message) {
            this._toastr.error(err.error.message);
          } else {
            this._toastr.error('Something went wrong');
          }
        },
        complete: () => { },
      })
    );
  }
  editProfile(): void {
    const dialogRef = this._matDialog.open(EditProfileComponent, {
      width: '60%',
      height: '80%',
      data: {
        title: 'User Edit',
        editMode: true,
        name: this.name,
        email: this.email,
        education: this.education,
        image: this.image ? this.image : this.tempImage


      },

    });


    this._subscription.add(
      dialogRef.afterClosed().subscribe({
        next: (result) => {

          console.log(result);


          this.ngOnInit();

        },
        error: () => { },
        complete: () => { },
      })
    );
  }
  myOrders() {
    this._router.navigate(['/bookings'])
  }
  getImage(file: string) {
    const url = `${environment.User_API_Key}/files/${file}`;
    return url
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
