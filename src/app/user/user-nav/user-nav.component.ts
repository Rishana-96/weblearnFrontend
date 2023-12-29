import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css'],
})
export class UserNavComponent implements OnInit {
  constructor(
    private _router: Router,
    private _toastr: ToastrService,
    private _breakpointObserver: BreakpointObserver
  ) { }

  userLog: boolean = false;
  isMobile: boolean = false;
  showMenu: boolean = false; // Variable to control menu visibility
  ngOnInit(): void {
    this.checkUserLoginStatus();
    this.checkScreenWidth();
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });
  }
  checkUserLoginStatus() {
    let token: string | null = localStorage.getItem('userSecret');
    if (token) {
      this.userLog = true;
    } else {
      this.userLog = false;
    }
  }
  checkScreenWidth() {
    this.isMobile = window.innerWidth <= 768;
  }

  logout() {
    localStorage.removeItem('userSecret');
    this.checkUserLoginStatus();
    this._router.navigate(['/']);
  }
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
