import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TutorService } from '../../service/tutor.service';
import { environment } from '../../../environments/environment.development';
import { Course } from 'src/app/interfaces/interfaces';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-tutor-home',
  templateUrl: './tutor-home.component.html',
  styleUrls: ['./tutor-home.component.css'],
})
export class TutorHomeComponent implements OnInit {
  courses: Course[] = [];
  pageSize = 6;
  currentPage = 0;
  totalTutorCourses: number = 0;
  searchTerm: string = '';
  selectedValue: string = '';
  tutorId: string = '';
  tutorName: string = '';
  courseFee: string = '';
  image: any;
  private _subscription: Subscription = new Subscription();
  constructor(private _tutorService: TutorService) { }
  ngOnInit(): void {
    this._subscription.add(
      this._tutorService.getCourse().subscribe({
        next: (response) => {
          this.courses = response;
          this.totalTutorCourses = this.courses.length
        },
        error: (error) => {
          console.log('something went wrong');
        },
        complete: () => { },
      })
    );
  }
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex
  }
  onCourseSelected() {
    this.currentPage = 0;
    this.totalTutorCourses = 0;
    this.getCurrentTutorCourses();
  }
  getCurrentTutorCourses(): Course[] {
    const startIndex = this.currentPage * this.pageSize;
    let filteredCourses = this.courses
    filteredCourses = filteredCourses.filter((course) =>
      course.courseName.toLowerCase().includes(this.searchTerm.toLocaleLowerCase())
    );

    if (this.selectedValue) {
      filteredCourses = filteredCourses.filter((course) =>
        course.courseName.toLowerCase() === this.selectedValue.toLowerCase()
      )
    }

    this.totalTutorCourses = filteredCourses.length
    return filteredCourses.slice(startIndex, startIndex + this.pageSize)
  }
  getImage(image: string) {
    return `${environment.User_API_Key}/courses/${image}`;
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
