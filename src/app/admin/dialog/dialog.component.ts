import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AdminService } from '../../service/admin.service';
import { environment } from '../../../environments/environment.development';
``;
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit, OnDestroy {
  cvUrl: SafeResourceUrl;
  inputData: any;
  cv: any;
  form: FormGroup;
  rejectApproval: boolean = false;
  tutorId!: string;
  reason!: string;
  private _subscription: Subscription = new Subscription()
  constructor(
    private _ref: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _sanitizer: DomSanitizer,
    private _adminService: AdminService,
    private _fb: FormBuilder
  ) {
    this.cvUrl = this._sanitizer.bypassSecurityTrustResourceUrl(data.cvUrl);
    this.form = this._fb.group({
      reason: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.inputData = this.data;
    if (this.inputData.title == 'reject approval') {
      this.rejectApproval = true;
      this.tutorId = this.inputData.tutorId;
    } else {
      this.setPdf();
    }

    console.log(this.inputData);
  }

  closeDialog() {
    this._subscription.add(
      this._adminService.rejectTutor(this.tutorId, this.reason).subscribe({
        next: (res) => {
          this._ref.close();
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => { },
      })
    );
  }

  setPdf() {
    this.getPdf(this.inputData.cvUrl);
  }

  getPdf(file: string) {
    const url = `${environment.User_API_Key}/files/${file}`;
    this.cv = this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }
}
