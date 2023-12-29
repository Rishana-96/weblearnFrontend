import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _toastr: ToastrService,
    private _adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  proceedLogin() {
    if (this.loginForm.valid) {
      const admin = this.loginForm.value;
      this._subscription.add(
        this._adminService.adminLogin(admin).subscribe({
          next: (res) => {
            localStorage.setItem('adminSecret', res.toString());
            this._router.navigate(['/admin/dashboard']);
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
      this._toastr.error('Something went wrong');
    }
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
