import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Course } from '../interfaces/course'; // Import av interface

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private url: string = 'https://webbutveckling.miun.se/files/ramschema.json'

  http = inject(HttpClient);
  
  // Hämta kurser
  async getCourses(): Promise<Course[]> {
    const courses = this.http.get<Course[]>(this.url);
    return await firstValueFrom(courses);
  }
}
