import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../service/user.service';
import { environment } from '../../../environments/environment.development';
import { Order } from '../../interfaces/interfaces';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit, OnDestroy {

  orders!: Order[];
  loading: boolean = true;
  tutorName: string = '';
  courseFee: string = '';
  image!: string;

  private _subscription: Subscription = new Subscription()
  course: any;



  constructor(private _userService: UserService) { }


  ngOnInit(): void {
    this._subscription.add(
      this._userService.myOrders().subscribe({
        next: (response) => {
          this.orders = response as Order[];
        },
        error: (error) => {
          console.log(error.error.message);
        },
        complete: () => { this.loading = false; }
      })
    )
  }

  getImage(image: string) {
    return `${environment.User_API_Key}/courses/${image}`;
  }
  ngOnDestroy(): void {
    this._subscription.unsubscribe()
  }

}
