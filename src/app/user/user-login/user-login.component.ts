import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../service/user.service';
import { strongPasswordValidator } from '../../strongPassword';
import { Users } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  hide: boolean = true;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private _toastr: ToastrService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, strongPasswordValidator()]],
    });

    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this.verifyUser(id);
    }
  }

  proceedLogin() {
    if (this.loginForm.valid) {
      const user: Users = this.loginForm.value;
      this._subscription.add(
        this._userService.userLogin(user).subscribe({
          next: (res) => {
            localStorage.setItem('userSecret', res.toString());
            this._router.navigate(['/']);
          },
          error: (err) => {
            if (err.error.message) {
              this._toastr.error(err.error.message);
            } else {
              this._toastr.error('something went wrong');
            }
          },
          complete: () => { },
        })
      );
    } else {
      this._toastr.error('Something went wrong');
    }
  }
  // Method to toggle password visibility
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
  verifyUser(id: string) {
    this._subscription.add(
      this._userService.verifyUser(id).subscribe({
        next: (result) => {
          localStorage.setItem('userSecret', result.toString());
          this._router.navigate(['/']);
        },
        error: (err) => {
          if (err.error.message) {
            this._toastr.error(err.error.message);
          } else {
            this._toastr.error('something went wrong');
          }
        },
        complete: () => { },
      })
    );
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
