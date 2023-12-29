import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AdminService } from '../../service/admin.service';
import { UserService } from '../../service/user.service';
import { DialogComponent } from '../dialog/dialog.component';
import { CourseDialogComponent } from '../course-dialog/course-dialog.component';
import { Course } from '../../interfaces/interfaces';
import { environment } from '../../../environments/environment.development';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  image: any
  courseImage: any;
  displayedColumns: string[] = [
    'position',
    'courseImage',
    'courseName',
    'tutorName',
    'courseFee',
    'courseDetails',
    'status',
    'action'
  ];
  test: any;
  course: Course[] = []
  dataSource: MatTableDataSource<any>;
  private _subscription: Subscription = new Subscription()
  constructor(
    private _adminService: AdminService,
    private _dialog: MatDialog,
    private _toastr: ToastrService

  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }
  ngOnInit(): void {
    this.loadCourseList()
  }
  loadCourseList() {
    this._subscription.add(
      this._adminService.loadCourse().subscribe({
        next: (response: Course[]) => {
          console.log(response);
          console.log();



          this.dataSource = new MatTableDataSource(response)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort


        },
        error: (error) => { },
        complete: () => { }
      })
    )
  }
  blockCourse(courseId: string): void {
    console.log(courseId);
    this._subscription.add(
      this._adminService.blockCourse(courseId).subscribe({
        next: (response) => {
          this._toastr.success('Course blocked successfully')
          this.loadCourseList();
        },
        error: (error) => {
          this._toastr.error('something went wrong')
        },
        complete: () => { }

      })
    )


  }
  unblockCourse(courseId: string): void {
    console.log(courseId, 'fchgjj');

    this._subscription.add(
      this._adminService.unblockCourse(courseId).subscribe({
        next: (response) => {


          this._toastr.success('Course unblocked successfully')
          this.loadCourseList()
        },
        error: (error) => {
          this._toastr.error('somthing went wrong')
        },
        complete: () => { }
      }

      )
    )
  }
  openCourseDetails(element: any) {


    this._dialog.open(CourseDialogComponent, {
      width: '80%',
      height: '700px',
      data: element
    })
  }
  getCourseImage(image: string) {

    console.log(`${environment.User_API_Key}/courses/${image}`);
    return `${environment.User_API_Key}/courses/${image}`;
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }


}
