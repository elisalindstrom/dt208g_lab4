import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CourseService } from '../services/course-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  courses: any;

  constructor(private courseService: CourseService) {
    this.courses = toSignal(this.courseService.getCourses(), {
      initialValue: []
    });
  }
}
