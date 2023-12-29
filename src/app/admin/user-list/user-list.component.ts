import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../service/admin.service';
import { Users } from '../../interfaces/interfaces';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'position',
    'name',
    'education',
    'email',
    'status',
    'action',
  ];
  dataSource: MatTableDataSource<any>;
  private _subscription: Subscription = new Subscription()
  constructor(
    private _adminService: AdminService,
    private _toastr: ToastrService
  ) {
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.loadUserList();
  }
  loadUserList() {
    this._subscription.add(
      this._adminService.loadUsers().subscribe({
        next: (data: Users[]) => {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort
        },
        error: (error) => {
          console.error('Error fetching user list', error);
        },
        complete: () => { },
      }
      )
    )
  }

  blockUser(id: string, name: string): void {
    this._subscription.add(
      this._adminService.blockUser(id).subscribe({
        next: (res) => {
          this._toastr.success('user blocked successfully');
          this.loadUserList();
        },
        error: (err) => {
          this._toastr.error('something went wrong');
        },
        complete: () => { },
      }
      ))
  }

  unblockUser(id: string, name: string) {
    this._subscription.add(
      this._adminService.unblockUser(id).subscribe({
        next: (res) => {
          this._toastr.success('User unblocked successfully');
          this.loadUserList();
        },
        error: (err) => {
          this._toastr.error('something went wrong');
        },
        complete: () => { },
      }
      ))
  }
  ngOnDestroy() {
    this._subscription.unsubscribe()
  }
}
