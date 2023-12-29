import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { strongPasswordValidator } from '../../strongPassword';
import { Users } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormGroup;
  hide = true;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.registerForm = this._fb.group({
      name: ['', Validators.required],
      education: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, strongPasswordValidator()]],
      confirmPassword: ['', [Validators.required, strongPasswordValidator()]],
    });
  }
  // Method to toggle password visibility
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
  proceedRegistration() {
    if (this.registerForm.valid) {
      if (
        this.registerForm.value.password !==
        this.registerForm.value.confirmPassword
      ) {
        this._toastr.error('Password and confirm password do not match');
        return;
      }
      const user: Users = this.registerForm.value;
      this._subscription.add(
        this._userService.userRegister(user).subscribe({
          next: (result) => {
            this._router.navigate(['/verify']);
            this._toastr.success(
              'successfully registered,verify your email to continue login'
            );
          },
          error: (err) => {
            if (err.error.message) {
              this._toastr.error(err.error.message);
            } else {
              this._toastr.error('something went wrong');
            }
          },
          complete: () => {},
        })
      );
    } else {
      console.log('Form is invalid');
    }
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
