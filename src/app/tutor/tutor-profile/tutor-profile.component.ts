import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TutorService } from '../../service/tutor.service';
import { Subscription } from 'rxjs';
import { EditPopupComponent } from '../edit-popup/edit-popup.component';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-tutor-profile',
  templateUrl: './tutor-profile.component.html',
  styleUrls: ['./tutor-profile.component.css'],
})
export class TutorProfileComponent implements OnInit, OnDestroy {
  name: string = '';
  email: string = '';
  qualification = '';
  image!: string;
  tempImage: string = 'https://img.myloview.com/stickers/employee-icon-vector-male-user-person-profile-avatar-symbol-for-business-in-a-flat-color-glyph-pictogram-sign-illustration-700-286087138.jpg'
  private _subscription: Subscription = new Subscription();

  constructor(
    private _tutorService: TutorService,
    private _toastr: ToastrService,
    private _matDialog: MatDialog,
    private _fb: FormBuilder
  ) { }
  ngOnInit(): void {
    this._subscription.add(
      this._tutorService.tutorDetails().subscribe({
        next: (res) => {
          console.log(res);

          this.name = res.name;
          this.qualification = res.qualification;
          this.email = res.email;
          this.image = res.image
        }, error: (error) => {
          if (error.error.message) {
            this._toastr.error(error.error.message);
          } else {
            this._toastr.error('Something went wrong');
          }
        },
        complete: () => { },
      })
    );


  }

  editProfile() {
    const dialogRef = this._matDialog.open(EditPopupComponent, {
      width: '60%',
      height: '80%',
      data: {
        title: 'Tutor Edit',
        name: this.name,
        email: this.email,
        qualification: this.qualification,
        image: this.image ? this.image : this.tempImage
      },


    });


    this._subscription.add(
      dialogRef.afterClosed().subscribe({
        next: (result) => {


          this.ngOnInit()
        },
        error: () => { },
        complete: () => { },
      })
    );
  }
  getImage(file: string) {
    if (!file) {
      return this.tempImage
    }
    const url = `${environment.User_API_Key}/files/${file}`;
    return url

  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
