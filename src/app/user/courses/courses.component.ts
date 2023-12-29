import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../service/user.service';
import { environment } from '../../../environments/environment.development';
import { PageEvent } from '@angular/material/paginator';
import { Course } from '../../interfaces/interfaces';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

  courses: Course[] = [];
  pageSize = 6;
  currentPage = 0;
  totalCourses: number = 0;
  searchTerm: string = ''
  selectedValue: string = ''; // Default value for All
  private _subscription: Subscription = new Subscription()
  constructor(private _userService: UserService) { }

  category = [
    { value: 'Angular', viewValue: 'Angular' },
    { value: 'React', viewValue: 'React' },
    { value: 'Javascript', viewValue: 'Javascript' },
  ];

  ngOnInit(): void {
    this._subscription.add(
      this._userService.getCourse().subscribe({
        next: (response) => {
          console.log(response);
          this.courses = response
          this.totalCourses = this.courses.length



        },
        error: (error) => { },
        complete: () => { }
      })
    )

  }
  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex
  }


  onCourseSelected() {
    this.currentPage = 0;
    this.totalCourses = 0;
    this.getCurrentPageCourses();
  }

  getCurrentPageCourses(): Course[] {
    const startIndex = this.currentPage * this.pageSize;
    let filteredCourses = this.courses

    filteredCourses = filteredCourses.filter((course) =>
      course.courseName.toLowerCase().includes(this.searchTerm.toLocaleLowerCase())
    );
    if (this.selectedValue) {
      filteredCourses = filteredCourses.filter((course) =>
        course.courseName.toLowerCase() === this.selectedValue.toLowerCase()
      );
    }


    this.totalCourses = filteredCourses.length
    return filteredCourses.slice(startIndex, startIndex + this.pageSize)
  }
  getImage(image: string) {
    return `${environment.User_API_Key}/courses/${image}`;
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

}
