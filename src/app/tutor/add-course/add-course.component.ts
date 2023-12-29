import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { TutorService } from '../../service/tutor.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit, OnDestroy {
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  invalid: boolean = true;
  viewVideo: boolean = false;
  trailorvideoUrl: any;
  trailorFile!: File;
  fileImage!: File;
  videoUrl: any;
  imageUrl: any;
  private _subscription: Subscription = new Subscription();
  constructor(
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private _tutorService: TutorService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      courseName: ['', Validators.required],
      courseVideoDescription: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      courseDescription: ['', Validators.required],
      courseFee: ['', Validators.required],
      courseVideoDuration: ['', Validators.required],
    });
  }

  submitCourse() {
    if (this.firstFormGroup.invalid && this.secondFormGroup.invalid) {
      return;
    } else {
      const form = this.firstFormGroup.getRawValue();
      const form2 = this.secondFormGroup.getRawValue();

      const formData = new FormData();
      formData.append('trailorVideo', this.trailorFile, this.trailorFile.name);
      formData.append('video', this.file, this.file.name);
      formData.append('image', this.fileImage, this.fileImage.name);
      formData.append('courseName', form.courseName);
      formData.append('courseVideoDescription', form.courseVideoDescription);
      formData.append('courseDescription', form2.courseDescription);
      formData.append('courseFee', form2.courseFee);
      formData.append('courseVideoDuration', form2.courseVideoDuration);
      this.status = 'uploading';
      this._subscription.add(
        this._tutorService.addCourse(formData).subscribe({
          next: (response) => {
            console.log(response);
            this.status = 'success';
            this._toastr.success('Course added Successfuly');
            this._router.navigate(['tutor/home']);
          },
          error: (error) => {
            this.status = 'fail';
            this._toastr.error(error.error.message);
          },
          complete: () => { },
        })
      );
    }
  }
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial'; // Variable to store file status
  file!: File; // Variable to store file

  //------------------trailor--------//
  onChangeTrailor(event: any) {
    const trailorFile: File = event.target.files[0];
    if (trailorFile) {
      console.log(trailorFile);
      this.trailorFile = trailorFile;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.trailorvideoUrl = e.target?.result;
      };
      reader.readAsDataURL(trailorFile);
    }
  }
  // On file Select
  onChange(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.status = 'initial';
      this.file = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.videoUrl = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
  onImageChange(event: any) {
    this.fileImage = event.target.files[0];
    this.imageUrl = URL.createObjectURL(this.fileImage);
  }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
