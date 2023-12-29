import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutor-nav',
  templateUrl: './tutor-nav.component.html',
  styleUrls: ['./tutor-nav.component.css']
})
export class TutorNavComponent implements OnInit {
  userLog: boolean = false;
  isMobile: boolean = false;
  showMenu: boolean = false;
  tutorLog: boolean = false
  constructor(private _router: Router) { }
  ngOnInit(): void {
    this.checkUserLoginStatus();
    this.checkScreenWidth();
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });
  }
  checkUserLoginStatus() {
    let token: string | null = localStorage.getItem('tutorSecret');
    if (token) {
      this.tutorLog = true;
    } else {
      this.tutorLog = false;
    }
  }
  checkScreenWidth() {
    this.isMobile = window.innerWidth <= 768;
  }
  logout() {
    localStorage.removeItem('tutorSecret');
    this.checkUserLoginStatus();
    this._router.navigate(['tutor']);
  }


  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}
