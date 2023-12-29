import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment.development';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'content-Type': 'application/json',
    Authorization: `Bearer ${''}`,
  }),
};

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) { }

  apiUrl: string = environment.API_Key;

  adminLogin(form: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, form, httpOptions);
  }

  loadUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/userList`, { withCredentials: true });
  }

  loadTutors(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tutorList`, { withCredentials: true });
  }
  loadCourse(): Observable<any> {
    return this.http.get(`${this.apiUrl}/courseList`, { withCredentials: true })
  }
  blockUser(id: string): Observable<any> {
    const requestBody = { id: id };

    return this.http.patch(
      `${this.apiUrl}/blockUser`,
      requestBody,
      httpOptions
    );
  }
  unblockUser(id: string): Observable<any> {
    const requestBody = { id: id };
    return this.http.patch(
      `${this.apiUrl}/unblockUser`,
      requestBody,
      httpOptions
    );
  }
  approveTutor(tutorId: string, status: string): Observable<any> {
    const requestBody = { id: tutorId, status: status };
    return this.http.put<any>(
      `${this.apiUrl}/approve-tutor`,
      requestBody,
      httpOptions
    );
  }
  rejectTutor(tutorId: string, status: string): Observable<any> {
    const requestBody = { id: tutorId, status: status };
    return this.http.put<any>(
      `${this.apiUrl}/reject-tutor`,
      requestBody,
      httpOptions
    );
  }

  blockTutor(tutorId: string): Observable<any> {


    const requestBody = { tutorId: tutorId };
    console.log(requestBody);

    return this.http
      .patch(`${this.apiUrl}/blockTutor`, requestBody, httpOptions)
      .pipe(
        catchError(this.handleError) // Handle errors using a centralized error handling function
      );
  }

  private handleError(error: any): Observable<any> {
    console.error('Error blocking tutor:', error);
    return throwError(error);
  }

  unblockTutor(tutorId: string): Observable<any> {
    const requestBody = { tutorId: tutorId };
    return this.http.patch(
      `${this.apiUrl}/unblockTutor`,
      requestBody,
      httpOptions
    );
  }

  loadApprovedTutors(): Observable<any[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/tutorList`, { withCredentials: true })
      .pipe(
        map((response: any[]) => {
          return response.filter((tutor) => tutor.is_approve === 'approved');
        })
      );
  }
  blockCourse(courseId: string): Observable<any> {
    const requestBody = { courseId: courseId };
    return this.http.patch(
      `${this.apiUrl}/blockCourse`,
      requestBody,
      httpOptions
    );
  }
  unblockCourse(courseId: string): Observable<any> {
    const requestBody = { courseId: courseId }
    return this.http.patch(
      `${this.apiUrl}/unblockCourse`,
      requestBody,
      httpOptions
    )

  }

  getDashboard(): Observable<any> {

    return this.http.get(`${this.apiUrl}/getDashboard`, { withCredentials: true })
  }
}
