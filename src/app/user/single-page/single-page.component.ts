import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Course, Order, Review } from '../../interfaces/interfaces';
import { UserService } from '../../service/user.service';
import { environment } from 'src/environments/environment.development';
declare var Razorpay: any
@Component({
  selector: 'app-single-page',
  templateUrl: './single-page.component.html',
  styleUrls: ['./single-page.component.css']
})
export class SinglePageComponent implements OnInit, OnDestroy {

  order!: Order;
  courseId!: string;
  course!: Course;
  courseVodeo!: string;
  courseVodeoUrl!: SafeResourceUrl;
  tutorId!: string
  private _subscription: Subscription = new Subscription();
  constructor(private _userService: UserService, private _route: ActivatedRoute,
    private _toastr: ToastrService,
    private _router: Router
  ) { }
  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.courseId = params['courseId'];
    });
    this.singlePage(this.courseId)
  }
  singlePage(courseId: string) {
    this._subscription.add(
      this._userService.singleCourseDetails(courseId).subscribe({
        next: (response) => {
          console.log(response);

          this.course = response
          this.courseVodeo = response.courseTrailorVideo;
          this.courseVodeoUrl = this.getVideoUrl(this.courseVodeo);


        },
        error: (error) => { },
        complete: () => { }
      })
    )
  }
  buyNow(fee: number) {


    let token: string | null = localStorage.getItem('userSecret');

    if (token) {
      this._subscription.add(
        this._userService.saveCourse(this.courseId).subscribe({
          next: (res) => {


            const RazorpayOptions = {
              description: 'Sample Razorpay demo',
              currency: 'INR',
              amount: fee * 100,
              name: 'Weblearn',
              key: 'rzp_test_WoxlXNbksmmHJK',
              image: '',
              handler: (response: string) => {
                this.verifyPayment(res.courseId, res._id, res.tutorId)
              },
              prefill: {
                name: 'Weblearn',
                email: 'rishanausman786@gmail.com',
                phone: '7034246028'
              },
              theme: {
                color: '#37254'
              },
              modal: {
                ondismiss: () => {
                  console.log('dismissed');

                }
              }
            }
            const successCalback = (paymentid: string) => {



            }

            const failureCalback = (e: string) => {
              console.log(e);

            }
            Razorpay.open(RazorpayOptions, successCalback, failureCalback)

          },
          error: (error) => {
            this._toastr.warning(error.error.message)
          },
          complete: () => { }
        })
      )
    } else {
      this._toastr.warning('Please login');

    }
  }
  verifyPayment(courseId: string, bookingId: string, tutorId: string) {
    this._subscription.add(
      this._userService.verifyPayment(courseId, bookingId, tutorId).subscribe({
        next: (response) => {
          this._toastr.success("Payment success");
          this._router.navigate(['/bookings'])
        },
        error: (error) => {
          this._toastr.error(error.error.message)
        },
        complete: () => { }
      })
    )
  }

  getVideoUrl(videoId: string): SafeResourceUrl {
    const encodedVideoId = encodeURIComponent(videoId);
    return `http://localhost:3001/courses/${encodedVideoId}`;
  }

  getStarArray(rating: number) {
    return Array(rating).fill(0).map((_, index) => index + 1);
  }

  getImage(file: string) {
    return `${environment.User_API_Key}/files/${file}`;
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }
}
