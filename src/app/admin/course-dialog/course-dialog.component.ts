import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { TutorService } from '../../service/tutor.service';

@Component({
  selector: 'app-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.css']
})
export class CourseDialogComponent implements OnInit, OnDestroy {
  form!: FormGroup
  course: any
  trailorVideo!: string
  trailorVideoUrl!: SafeResourceUrl
  courseVideo!: string
  courseVideoUrl!: SafeResourceUrl
  private _subscription: Subscription = new Subscription()

  constructor(
    private _dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _tutorService: TutorService,
    private _formBuilder: FormBuilder
  ) {

  }

  ngOnInit(): void {
    debugger
    this.course = this.data
    this.trailorVideo = this.data.courseTrailorVideo
    this.trailorVideoUrl = this.getVideoUrl(this.trailorVideo)
    this.courseVideo = this.data.courseVideo
    this.courseVideoUrl = this.getVideoUrl(this.courseVideo)




  }
  getVideoUrl(videoId: string): SafeResourceUrl {
    const encodedVideoId = encodeURIComponent(videoId);
    return `http://localhost:3001/courses/${encodedVideoId}`;
  }
  closeDialog(): void {
    this._dialogRef.close();
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }


}
