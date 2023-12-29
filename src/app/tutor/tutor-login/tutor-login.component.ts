import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TutorService } from '../../service/tutor.service';
import { strongPasswordValidator } from '../../strongPassword';
import { Tutors } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tutor-login',
  templateUrl: './tutor-login.component.html',
  styleUrls: ['./tutor-login.component.css'],
})
export class TutorLoginComponent {
  id: any;
  tutorLoginForm!: FormGroup;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [
    Validators.required,
    strongPasswordValidator(),
  ]);
  hidePassword: boolean = true;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _tutorService: TutorService,
    private _toastr: ToastrService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tutorLoginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.id = this._route.snapshot.paramMap.get('id');
    if (this.id) {
      this.verifyTutor();
    }
  }

  verifyTutor() {
    this._subscription.add(
      this._tutorService.verifyTutor(this.id).subscribe({
        next: (result) => {
          localStorage.setItem('tutorSecret', result.toString());
          this._router.navigate(['/tutor-login']);
        },
        error: (err) => {
          const errorMessage = err.error.message || 'Something went wrong';
          this._toastr.error(errorMessage);
        },
        complete: () => {},
      })
    );
  }
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  tutorLogin() {
    if (this.tutorLoginForm.valid) {
      const tutor: Tutors = this.tutorLoginForm.value;
      this._subscription.add(
        this._tutorService.tutorLogin(tutor).subscribe({
          next: (res) => {
            // Tutor application is approved
            localStorage.setItem('tutorSecret', res.toString());
            this._router.navigate(['/tutor/home']);
          },
          error: (err) => {
            const errorMessage = err.error.message || 'Something went wrong';
            this._toastr.error(errorMessage);
          },
          complete: () => {},
        })
      );
    } else {
      this._toastr.error('Please fill in all required fields.');
    }
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
