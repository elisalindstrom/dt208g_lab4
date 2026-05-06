import { Component, computed, inject, signal } from '@angular/core';
import { CourseService } from '../services/course-service';
import { Course } from '../interfaces/course'; // Import av interface
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  courses = signal<Course[]>([]);
  error = signal<string | null>(null);
  filterCourses = signal("");

  filteredCourses = computed(() => {
    const filter = this.filterCourses().trim().toLowerCase();
    if (!filter) return this.courses();

    return this.courses().filter(c =>
      c.code.toLowerCase().includes(filter) ||
      c.coursename.toLowerCase().includes(filter)
    );
  })

  courseService = inject(CourseService);

  /* constructor(private courseService: CourseService) {
    this.courses = toSignal(this.courseService.getCourses(), {
      initialValue: []
    });
  } */

  // Anrop
  ngOnInit(): void {
    this.loadCourses();
  }

  async loadCourses() {
    try {
      const response = await this.courseService.getCourses();
      this.courses.set(response);
      // console.table(this.courses());
    } catch (err) {
      // console.error(err);
      this.error.set("Kunde inte ladda någon data");
    }
  }
}
