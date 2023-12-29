import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Subscription, interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { UserService } from '../../service/user.service';
import { environment } from '../../../environments/environment.development';
import { TutorService } from '../../service/tutor.service';
import { AdminService } from '../../service/admin.service';
import { CarouselItem, Course, Tutors } from '../../interfaces/interfaces';

// interface CarouselItem {
//   image: string;
//   description: string;
//   title: string; // Add the title property here
// }
// interface Category {
//   id: number;
//   icon: string;
//   name: string;
// }



@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  animations: [
    trigger('slide', [
      transition(':increment', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ],
})
export class UserHomeComponent implements OnInit, OnDestroy {
  currentIndex = 0;
  images: string[] = ['carosal1.jpg', 'carosal2.jpg', 'carosal3.jpg'];
  private alive = true;
  courses: Course[] = [];
  tutors: Tutors[] = []
  tutorId: string = '';
  tutorName: string = '';
  courseFee: string = '';
  image!: string;
  tempImage: string = 'https://img.myloview.com/stickers/employee-icon-vector-male-user-person-profile-avatar-symbol-for-business-in-a-flat-color-glyph-pictogram-sign-illustration-700-286087138.jpg'
  showImage: boolean = false

  private _subscription: Subscription = new Subscription()
  carouselItems: CarouselItem[] = [
    {
      image: 'carosal1.jpeg',
      description: 'Learn from the best Online Training',
      title: 'Enjoy smooth learning',
    },
    {
      image: 'carosal2.jpg',
      description: 'More than 50+ Online Courses',
      title: 'Enjoy smooth Learning',
    },
    {
      image: 'carosal3.jpg',
      description: 'Dream Future',
      title: 'Enjoy smooth Learning',
    },
  ];

  constructor(
    private _userService: UserService,
    private _adminService: AdminService
  ) { }



  ngOnInit(): void {
    interval(3000)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.nextSlide());
    this.getCourseList()
    this.getTutorList()

  }
  getCourseList() {
    this._subscription.add(
      this._userService.getCourse().subscribe({
        next: (response) => {
          this.courses = response
        },
        error: (error) => {
          console.log('something went wrong');

        },
        complete: () => { }
      })
    )
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
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  getCourseImage(image: string) {
    return `${environment.User_API_Key}/courses/${image}`;
  }

  getTutorImage(file: string) {
    if (!file) {
      return this.tempImage
    }
    return `${environment.User_API_Key}/files/${file}`;
  }

  ngOnDestroy(): void {
    this.alive = false;
    this._subscription.unsubscribe()
  }

}
