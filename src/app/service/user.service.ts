import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Course, Order, Review, Users } from '../interfaces/interfaces';
import { RouterOutlet } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
  }),
};

@Injectable()
export class UserService {
  constructor(private _http: HttpClient) { }

  apiUrl: string = environment.User_API_Key;

  userRegister(user: Users): Observable<any> {
    console.log(this.apiUrl);

    return this._http.post(`${this.apiUrl}/register`, user);
  }

  userLogin(user: Users): Observable<any> {
    return this._http.post(`${this.apiUrl}/login`, user);
  }

  verifyUser(id: string): Observable<any> {
    return this._http.post(`${this.apiUrl}/verifyUser?id=` + id, httpOptions);
  }

  userDetails(): Observable<any> {
    return this._http.get(`${this.apiUrl}/userDetails`, {
      withCredentials: true,
    });
  }

  saveUser(user: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/userSave`, user);
  }
  getCourse(): Observable<any> {
    return this._http.get(`${this.apiUrl}/getCourse`, { withCredentials: true });
  }
  singleCourseDetails(courseId: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/singleCourseDetails/${courseId}`)
  }
  saveCourse(course: string,): Observable<any> {
    return this._http.post(`${this.apiUrl}/saveCourse`, { course })
  }
  verifyPayment(courseId: string, bookingId: string, tutorId: string): Observable<any> {
    return this._http.post(`${this.apiUrl}/verifyPayment`, { courseId, bookingId })
  }
  myOrders() {
    return this._http.get(`${this.apiUrl}/myOrders`)
  }

  singleVideoDetails(orderId: string): Observable<any> {
    return this._http.get(`${this.apiUrl}/singleVideoDetails/${orderId}`)
  }
  submitReview(review: Review, orderId: string) {
    return this._http.post(`${this.apiUrl}/addReview/${orderId}`, review)
  }
}