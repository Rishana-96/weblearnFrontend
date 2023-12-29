import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../interfaces/interfaces';
import { TutorService } from '../../service/tutor.service';
import { environment } from '../../../environments/environment.development';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.css'],
})
export class SinglePageComponent implements OnInit {
  courseId: any;
  course!: Course;
  courseVodeo!: string;
  courseVodeoUrl!: SafeResourceUrl; // Use SafeResourceUrl
  courseVideo!: string;
  courseVideoUrl!: SafeResourceUrl
  private _subscription: Subscription = new Subscription()
  constructor(
    private _tutorService: TutorService,
    private _route: ActivatedRoute,
    private _sanitizer: DomSanitizer
  ) { }
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.courseId = params['courseId'];
    });
    console.log(this.courseId, 'course');

    this.singleCourseDetails(this.courseId);
  }

  singleCourseDetails(courseId: string) {
    this._subscription.add(
      this._tutorService.singleCourseDetails(courseId).subscribe({
        next: (res) => {
          console.log(res);

          this.course = res;
          this.courseVodeo = res.courseTrailorVideo;
          this.courseVodeoUrl = this.getVideoUrl(this.courseVodeo);
          this.courseVideo = res.courseVideo
          this.courseVideoUrl = this.getCourseVideoUrl(this.courseVideo)

          console.log('courseVodeoUrl:', this.courseVodeoUrl);
        },
        error: (error) => {
          console.log('error fetching details:', error);
        },
        complete: () => { },
      }))
  }
  getVideoUrl(videoId: string): SafeResourceUrl {
    const encodedVideoId = encodeURIComponent(videoId);
    console.log('encoded', encodedVideoId)
    return `http://localhost:3001/courses/${encodedVideoId}`;
  }

  getCourseVideoUrl(videoId: string): SafeResourceUrl {
    const encodedVideoId = encodeURIComponent(videoId);
    return `http://localhost:3001/courses/${encodedVideoId}`
  }
  getStarArray(rating: number) {
    return Array(rating).fill(0).map((_, index) => index + 1);
  }
  getImage(file: string) {
    return `${environment.User_API_Key}/files/${file}`;
  }
  ngOnDestroy() {
    this._subscription.unsubscribe()
  }
}
