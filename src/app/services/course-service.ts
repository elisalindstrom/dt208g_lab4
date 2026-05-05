import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../interfaces/course'; // Import av interface

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  url: string = 'https://webbutveckling.miun.se/files/ramschema.json';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }
}
