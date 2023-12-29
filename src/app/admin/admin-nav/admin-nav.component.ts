import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css'],
})
export class AdminNavComponent implements OnInit {
  constructor(private _router: Router, private _toastr: ToastrService) {}

  adminLog: boolean = false;

  ngOnInit(): void {
    let token: string | null = localStorage.getItem('adminSecret');

    if (token) {
      this.adminLog = true;
    }
  }

  logOut() {
    localStorage.removeItem('adminSecret');
    this._router.navigate(['/admin']);
  }
}
