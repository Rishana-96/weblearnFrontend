import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course, Users } from '../../interfaces/interfaces';
import { TutorService } from '../../service/tutor.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-my-buyers',
  templateUrl: './my-buyers.component.html',
  styleUrls: ['./my-buyers.component.css']
})
export class MyBuyersComponent implements OnInit, OnDestroy {
  courseId: any;
  course!: Course;
  users: any = [];
  image!: string;
  showImage: Boolean = false;
  tempImage: string = 'https://img.myloview.com/stickers/employee-icon-vector-male-user-person-profile-avatar-symbol-for-business-in-a-flat-color-glyph-pictogram-sign-illustration-700-286087138.jpg'
  private _subscription: Subscription = new Subscription()
  constructor(
    private _tutorService: TutorService,
    private _route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.courseId = params['courseId'];
    });
    console.log(this.courseId, 'buyers')
    this.myBuyersDetails(this.courseId);
  }

  myBuyersDetails(courseId: string) {
    this._subscription.add(
      this._tutorService.myBuyersDetails(courseId).subscribe({
        next: (response) => {
          console.log(response);



          this.users = response;
          console.log(this.users);








        },
        error: (error) => {
          console.log('error fetching details:', error);
        },
        complete: () => { },
      }))
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
