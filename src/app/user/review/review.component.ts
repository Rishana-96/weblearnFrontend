import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  rating!: number[];
  showImage: boolean = false
  tempImage: string = 'https://img.myloview.com/stickers/employee-icon-vector-male-user-person-profile-avatar-symbol-for-business-in-a-flat-color-glyph-pictogram-sign-illustration-700-286087138.jpg'
  constructor() { }

  getImage(file: string) {
    const url = `${environment.User_API_Key}/files/${file}`;
    return url
  }
}
