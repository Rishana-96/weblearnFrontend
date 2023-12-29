import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent {
  constructor(private _router: Router) {}
  toLogin(): void {
    this._router.navigate(['/login']);
  }
}
