import { Component, OnInit, OnDestroy } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Order, Review } from '../../interfaces/interfaces';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.css']
})
export class SingleVideoComponent implements OnInit, OnDestroy {


  order!: Order;
  courseVideo!: string;
  courseVideoUrl!: SafeResourceUrl;
  rating!: number[];
  comments!: string;
  reviewForm!: FormGroup;
  orderId!: string
  courseId!: string
  private _subscription: Subscription = new Subscription()


  constructor(private _userService: UserService, private _route: ActivatedRoute, private _toastr: ToastrService, private _router: Router, private _fb: FormBuilder) { }
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.orderId = params['orderId']
      this.singleVideo(this.orderId)
    })

    this.reviewForm = this._fb.group({

      comments: ['', Validators.required],
      rating: [null, Validators.required]
    })
  }
  singleVideo(orderId: any) {
    this._subscription.add(
      this._userService.singleVideoDetails(orderId).subscribe({
        next: (response) => {

          this.order = response
          this.courseVideo = response.courseVideo
          this.courseVideoUrl = this.getVideoUrl(this.courseVideo);



        },
        error: (error) => { },
        complete: () => { }
      })
    )
  }


  getStarArray(rating: number) {
    return Array(rating).fill(0).map((_, index) => index + 1);
  }

  submitReview(): void {
    if (this.reviewForm.invalid) {
      return

    } else {
      const data = this.reviewForm.getRawValue()
      this._subscription.add(
        this._userService.submitReview(data, this.orderId).subscribe({
          error: (err) => {
            this._toastr.error('Something went wrong')
          },
          complete: () => {
            this.singleVideo(this.orderId)
            this.reviewForm.reset()
            this._toastr.success('Review added successfully')
          }
        })
      )
    }
  }
  getImage(file: string) {
    return `${environment.User_API_Key}/files/${file}`;
  }

  getVideoUrl(videoId: string): SafeResourceUrl {
    const encodedVideoId = encodeURIComponent(videoId);
    return `http://localhost:3001/courses/${encodedVideoId}`;
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

}
