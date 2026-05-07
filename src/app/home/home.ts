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
  filterCourses = signal(""); // Signal för filtrering
  sortCourses = signal(""); // Signal för sortering

  // Inject av service: använd course-service
  courseService = inject(CourseService);

  // Filtrering utifrån kurskod eller kursnamn
  filteredCourses = computed(() => {
    const filter = this.filterCourses().trim().toLowerCase();

    if (!filter) return this.courses();

    return this.courses().filter(c =>
      c.code.toLowerCase().includes(filter) ||
      c.coursename.toLowerCase().includes(filter)
    );
  })

  // Sortering
  sortedCourses = computed(() => {
    const sort = this.sortCourses();

    // Kurskod
    if (sort === 'code') {
      return [...this.filteredCourses()].sort((a, b) =>
        a.code.localeCompare(b.code))
    }

    // Kursnamn
    if (sort === 'coursename') {
      return [...this.filteredCourses()].sort((a, b) =>
        a.coursename.localeCompare(b.coursename))
    }

    // Progression
    if (sort === 'progression') {
      return [...this.filteredCourses()].sort((a, b) =>
        a.progression.localeCompare(b.progression))
    }

    // Returnerar alltid ett värde
    return this.filteredCourses();
  })

  // Ändrar signalvärdet för filtrering
  onCoursesFiltered(filter: string) {
    this.filterCourses.set(filter);
  }

  // Ändrar signalvärdet för sortering
  onCoursesSorted(sort: string) {
    this.sortCourses.set(sort);
  }

  // Körs vid start
  ngOnInit(): void {
    this.loadCourses();
  }

  // Ser till att service anropas och data hämtas
  async loadCourses() {
    try {
      const response = await this.courseService.getCourses();
      this.courses.set(response);
    } catch (err) {
      this.error.set("Kunde inte ladda någon data");
    }
  }
}
