import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from '../../service/user.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {
  editForm!: FormGroup;
  fileImage!: File;
  imageUrl!: string;
  tempImage: string = 'https://img.myloview.com/stickers/employee-icon-vector-male-user-person-profile-avatar-symbol-for-business-in-a-flat-color-glyph-pictogram-sign-illustration-700-286087138.jpg'
  private _subscription: Subscription = new Subscription()
  image!: string;
  showImage: boolean = false
  constructor(
    private _dialogRef: MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _toastr: ToastrService

  ) {

  }

  ngOnInit(): void {
    this.getFormDetails()


  }
  onImageChange(event: any) {

    this.fileImage = event.target.files[0];
    this.data.image = '';
    this.showImage = true
    this.tempImage = URL.createObjectURL(this.fileImage);

  }
  getFormDetails() {


    this.editForm = this._formBuilder.group({
      name: [this.data.name, Validators.required],
      education: [this.data.education, Validators.required],
      email: [this.data.email],
      image: this.data.image,




    })
  }
  saveUser() {
    const updatedData = new FormData();
    updatedData.append('name', this.editForm.value.name);
    updatedData.append('education', this.editForm.value.education);
    updatedData.append('email', this.editForm.value.email);
    if (this.fileImage) {

      updatedData.append('image', this.fileImage, this.fileImage.name);
    } else {
      updatedData.append('images', this.data.image);

    }



    //save updated data
    this._subscription.add(
      this._userService.saveUser(updatedData).subscribe({
        next: (response) => {
          this._toastr.success(response.message)
          this._dialogRef.close({ updatedData: response })

        },
        error: (error) => {
          this._toastr.error('Failed to update profile,Please try again')
        },
        complete: () => { }

      })
    )


  }
  getImage(image: string) {


    const encodedVideoId = encodeURIComponent(image);
    return `${environment.User_API_Key}/files/${encodedVideoId}`
  }
  closeDialog(): void {
    this._dialogRef.close();
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

}
