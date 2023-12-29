import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TutorService } from '../../service/tutor.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-edit-popup',
  templateUrl: './edit-popup.component.html',
  styleUrls: ['./edit-popup.component.css'],
})
export class EditPopupComponent implements OnInit, OnDestroy {
  editForm!: FormGroup;
  fileImage!: File;
  showImage: boolean = false
  imageUrl!: string;
  tempImage: string = 'https://img.myloview.com/stickers/employee-icon-vector-male-user-person-profile-avatar-symbol-for-business-in-a-flat-color-glyph-pictogram-sign-illustration-700-286087138.jpg';
  image!: string;
  // selectedProfilePicture: File | null = null;
  tutoredit: boolean = false;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _dialogRef: MatDialogRef<EditPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _tutorService: TutorService,
    private _toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.setTutorPopUpdata()
  }
  onImageChange(event: any) {
    this.fileImage = event.target.files[0];
    this.data.image = '';
    this.showImage = true
    this.tempImage = URL.createObjectURL(this.fileImage);
    console.log(this.tempImage)
  }
  setTutorPopUpdata() {
    console.log(this.data.image, 'hjkbgv');


    this.editForm = this._formBuilder.group({
      name: [this.data.name, Validators.required],
      qualification: [this.data.qualification, Validators.required],
      email: [this.data.email],
      image: this.data.image
    })


  }


  saveTutor(): void {



    const updatedData = new FormData();
    updatedData.append('name', this.editForm.value.name);
    updatedData.append('qualification', this.editForm.value.qualification);
    updatedData.append('email', this.editForm.value.email);
    if (this.fileImage) {
      updatedData.append('image', this.fileImage, this.fileImage.name)
    } else {
      updatedData.append('image', this.data.image)
    }



    this._subscription.add(
      this._tutorService.saveTutor(updatedData).subscribe({
        next: (response) => {
          this._toastr.success(response.message)
          this._dialogRef.close({ updatedData: response })
        },
        error: (error) => {
          this._toastr.error(error.message)
        },
        complete: () => { }
      })
    )

  }
  getImage(image: any) {
    console.log(image);

    const encodedVideoId = encodeURIComponent(image);
    return `${environment.User_API_Key}/files/${encodedVideoId}`
  }
  closeDialog(): void {
    this._dialogRef.close();
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
