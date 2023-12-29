export interface Users {
  length: any;
  image: string;
  _id: string;
  name: string;
  email: string;
  password: string;
  is_verified: boolean;
  is_admin: boolean;
  is_blocked: boolean;
  _v: number;
}
export interface Tutors {
  _id: string;
  name: string;
  email: string;
  is_verified: boolean;
  password: string;
  qualification: string;
  image: string;
  is_blocked: boolean;
  is_approve: boolean;
  _v: number;
}
export interface Course {
  length: any;
  coursePurchasers: any;
  courseTrailorVideo: any;
  _id: string;
  courseName: string;
  email: string;
  courseVideoDuration: string;
  courseDescription: string;
  courseVideoDescription: string;
  courseFee: number;
  tutorId: Tutors;
  userId: Users
  image: string;
  courseVideo: string;
  review?: Review[];
}
export interface Order {
  courseVideoDescription: any;
  courseFee: any;
  courseVideoDuration: any;
  courseDescription: any;
  courseName: any;

  _id: string;
  paymentStatus: string;
  userId: string;
  tutorId: Tutors;
  courseId: Course;
  review?: Review[];
  _v: number;

}
export interface CarouselItem {
  image: string;
  description: string;
  title: string;
}
export interface Category {
  id: number;
  icon: string;
  name: string;
}
export interface Review {
  comments: string;
  rating: number;
  userId: Users
}
export interface Dashboard {
  courseData: number;
  userData: number;
  tutorData: number;
  buyers: number;
  aggregatedData: []
}