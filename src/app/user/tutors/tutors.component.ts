import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../service/admin.service';
import { environment } from '../../../environments/environment.development';
import { Tutors } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.css']
})
export class TutorsComponent implements OnInit, OnDestroy {
  tutors: Tutors[] = []
  tempImage: string = 'https://img.myloview.com/stickers/employee-icon-vector-male-user-person-profile-avatar-symbol-for-business-in-a-flat-color-glyph-pictogram-sign-illustration-700-286087138.jpg'
  showImage: boolean = false
  private _subscription: Subscription = new Subscription()
  constructor(private _adminService: AdminService) { }

  ngOnInit(): void {
    this.getTutorList()
  }
  getTutorList() {
    this._subscription.add(
      this._adminService.loadApprovedTutors().subscribe({
        next: (response) => {
          this.tutors = response



        },
        error: (error) => { },
        complete: () => { }
      })
    )
  }
  getImage(file: string) {
    if (!file) {
      return this.tempImage
    }
    const url = `${environment.User_API_Key}/files/${file}`;
    return url
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

}
