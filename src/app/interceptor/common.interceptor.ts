import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  constructor(private _toastr: ToastrService, private _router: Router) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let userToken = localStorage.getItem('userSecret');
    let tutorToken = localStorage.getItem('tutorSecret');
    let adminToken = localStorage.getItem('adminSecret');

    if (userToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + userToken),
      });
      return next.handle(newRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this._toastr.error('You are blocked');
            localStorage.removeItem("userSecret");
            this._router.navigate(['/']);
          } else if (error.status === 401) {
            this._toastr.error('please login again');
          }
          this._router.navigate(['/']);
          return throwError(error);
        })
      );
    }
    else if (tutorToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + tutorToken),
      });
      return next.handle(newRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this._toastr.error('You are blocked');
            localStorage.removeItem("tutorSecret");
            this._router.navigate(['/tutor/login']);
          } else if (error.status === 401) {
            this._toastr.error('please login again');
          }
          this._router.navigate(['/tutor']);
          return throwError(error);
        })
      );
    }
    else if (adminToken) {
      const newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + adminToken),
      });

      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
