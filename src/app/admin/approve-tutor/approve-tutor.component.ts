import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../service/admin.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { environment } from '../../../environments/environment.development';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Tutors } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-approve-tutor',
  templateUrl: './approve-tutor.component.html',
  styleUrls: ['./approve-tutor.component.css'],
})
export class ApproveTutorComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'position',
    'name',
    'qualification',
    'email',
    'pdf',
    'action',
  ];
  dataSource: MatTableDataSource<any>;

  pdfLoaded: boolean = false;
  test: any;
  isLoading: boolean = false;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _adminService: AdminService,
    private _sanitizer: DomSanitizer,
    private _toastr: ToastrService,
    private _dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }
  ngOnInit(): void {
    this.loadTutorList();
  }

  loadTutorList() {
    this._subscription.add(
      this._adminService.loadTutors().subscribe({
        next: (data: Tutors[]) => {
          this.dataSource = new MatTableDataSource(data);
          this.test = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
          console.log(this.test);
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
  approveTutor(tutorId: string, status: string): void {
    this.isLoading = true;
    this._subscription.add(
      this._adminService.approveTutor(tutorId, status).subscribe({
        next: (response) => {
          this._toastr.success(
            'Tutor approved,An email will be sent to your Mail'
          );
          this.loadTutorList();
        },
        error: (error) => {
          this._toastr.error('Error approving tutor:' + error.message);
        },
        complete: () => {
          this.isLoading = false;
        },
      })
    );
  }
  rejectTutor(tutorId: string, status: string): void {
    this._dialog.open(DialogComponent, {
      width: '50%',
      height: '300px',
      data: {
        tutorId,
        title: 'reject approval',
      },
    });
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
