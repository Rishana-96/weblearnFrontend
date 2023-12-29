import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent implements OnInit, OnDestroy {
  form: FormGroup;
  editMode: boolean = false;
  editdata: any;
  fileImage!: File;
  imageUrl!: string;
  selectedProfilePicture: File | null = null;
  tutoredit: boolean = false;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private _userService: UserService,

    private _toastr: ToastrService
  ) {
    this.form = this._fb.group({
      name: new FormControl(this.data.name, Validators.required),
      email: new FormControl(this.data.email, Validators.required),
      education: new FormControl(this.data.education, Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.data.title != 'Tutor Edit') {
      this.form.setValue({
        name: this.data.name,
        email: this.data.email,
        education: this.data.education,
      });
    }
    console.log(this.form.getRawValue());
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedProfilePicture = inputElement.files[0];
    }
  }

  Saveuser(): void {
    if (this.form.valid) {
      const updatedData = this.form.value;
      // Save updated data using the service if needed
      this._subscription.add(
        this._userService.saveUser(updatedData).subscribe({
          next: (response) => {
            this._toastr.success('Profile updated successfully');
            this._dialogRef.close({ updatedData: response }); // Pass the updated data back to the parent component if needed
          },
          error: (error) => {
            this._toastr.error('Failed to update profile. Please try again.');
          },
          complete: () => { },
        })
      );
    }
  }
  onImageChange(event: any) {
    this.fileImage = event.target.files[0];
    this.imageUrl = URL.createObjectURL(this.fileImage);
  }
  closeDialog(): void {
    this._dialogRef.close();
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
