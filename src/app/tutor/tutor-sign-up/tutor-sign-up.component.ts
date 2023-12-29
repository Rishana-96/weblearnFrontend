import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TutorService } from '../../service/tutor.service';
import { strongPasswordValidator } from '../../strongPassword';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tutor-sign-up',
  templateUrl: './tutor-sign-up.component.html',
  styleUrls: ['./tutor-sign-up.component.css'],
})
export class TutorSignUpComponent implements OnInit {
  cvFile!: File;
  tutorSignupForm!: FormGroup;
  invalidFile: boolean = false;
  hidePassword: Boolean = true;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _tutorService: TutorService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.tutorSignupForm = this._fb.group({
      name: ['', [Validators.required]],
      qualification: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, strongPasswordValidator()]],
      confirmPassword: ['', [Validators.required, strongPasswordValidator()]],
    });
  }

  tutorRegistration(): void {
    if (
      this.tutorSignupForm.value.password !==
      this.tutorSignupForm.value.confirmPassword
    ) {
      this._toastr.error('Password and confirm password do not match');
      return;
    }
    if (this.tutorSignupForm.valid && !this.invalidFile && this.cvFile) {
      const form = new FormData();

      const tutor = this.tutorSignupForm.value;
      form.append('cv', this.cvFile, this.cvFile.name);
      form.append('name', tutor.name);
      form.append('qualification', tutor.qualification);
      form.append('email', tutor.email);
      form.append('password', tutor.password);
      this._subscription.add(
        this._tutorService.tutorSignup(form).subscribe({
          next: (res) => {
            this._router.navigate(['/tutor/verify']);
            this._toastr.success('please verify you email');
          },
          error: (error) => {
            if (error.error && error.error.message) {
              this._toastr.error(error.error.message);
            } else {
              this._toastr.error('Registration failed. Please try again.');
            }
          },
          complete: () => {},
        })
      );
    } else {
      this._toastr.error(
        'Please fill out the form correctly and upload a valid PDF file.'
      );
    }
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  onCVFileChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.cvFile = inputElement.files[0];
      const allowedExtensions = ['pdf'];
      const fileName = this.cvFile.name.toLowerCase();

      if (
        !fileName.endsWith('.pdf') ||
        !allowedExtensions.includes(fileName.split('.').pop()!)
      ) {
        this.invalidFile = true;
      } else {
        this.invalidFile = false;
      }
    }
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
