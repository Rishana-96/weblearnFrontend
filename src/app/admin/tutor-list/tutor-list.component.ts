import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AdminService } from '../../service/admin.service';
import { environment } from '../../../environments/environment.development';
import { DialogComponent } from '../dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tutor-list',
  templateUrl: './tutor-list.component.html',
  styleUrls: ['./tutor-list.component.css'],
})
export class TutorListComponent implements OnInit, OnDestroy {
  pageSize = 2;
  pageIndex = 0;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator

  displayedColumns: string[] = [
    'position',
    'name',
    'qualification',
    'email',
    'cv',
    'status',
    'action',
  ];
  dataSource: MatTableDataSource<any>;

  pdfLoaded: boolean = false;
  test: any;

  private _subscription: Subscription = new Subscription();
  constructor(
    private _adminService: AdminService,
    private _sanitizer: DomSanitizer,
    private _toastr: ToastrService,
    private _dialog: MatDialog,
    private _cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }
  ngOnInit(): void {
    this.loadApprovedTutors();
  }




  loadApprovedTutors() {
    this._subscription.add(
      this._adminService.loadApprovedTutors().subscribe({
        next: (data: any[]) => {

          this.test = data.map((tutor) => ({
            id: tutor._id,
            name: tutor.name,
            qualification: tutor.qualification,
            email: tutor.email,
            cv: tutor.cv,
            is_blocked: tutor.is_blocked,
          }));


          this.dataSource = new MatTableDataSource(this.test);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        },
        error: (error) => {
          console.error('Error fetching tutor list', error);
        },
        complete: () => { },
      })
    );
  }


  openCv(cv: string) {
    if (cv) {
      this._dialog.open(DialogComponent, {
        width: '80%',
        height: '700px',
        data: {
          cvUrl: cv,
        },
      });
    } else {
      console.error('Invalid CV URL');
    }
  }

  getPdf(file: string): SafeResourceUrl {
    const url = `${environment.User_API_Key}/files/${file}`;
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  blockTutor(tutorId: string): void {
    console.log(tutorId);

    this._subscription.add(
      this._adminService.blockTutor(tutorId).subscribe({
        next: (response) => {
          console.log(response);
          this._toastr.success('Tutor blocked successfully');

          this.loadApprovedTutors();
        },
        error: (error) => {
          this._toastr.error('Something went wrong while blocking the tutor');
          console.error('Error blocking tutor:', error);
        },
        complete: () => { },
      })
    );

  }


  unblockTutor(tutorId: string): void {
    this._subscription.add(
      this._adminService.unblockTutor(tutorId).subscribe({
        next: (response) => {
          this._toastr.success('Tutor unblocked successfully');
          this.loadApprovedTutors();
        },
        error: (error) => {
          this._toastr.error('Something went wrong while blocking the tutor');
          console.error('Error blocking tutor:', error);
        },
        complete: () => { },
      })
    );

  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
