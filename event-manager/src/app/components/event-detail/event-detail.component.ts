import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div class="container" *ngIf="event$ | async as event">
      <button mat-button routerLink="/events"><mat-icon>arrow_back</mat-icon> Back to Events</button>
      <h1>{{ event.title }}</h1>
      <img [src]="event.image" style="width: 100%; max-height: 300px; object-fit: cover;">
      <h3>Category: {{ event.category }}</h3>
      <p>{{ event.description }}</p>
      <p><strong>Status:</strong> {{ event.status | uppercase }}</p>
      
      <button mat-raised-button color="primary" 
              [routerLink]="['/book', event.id]"
              [disabled]="event.status !== 'open'">
        Book Ticket ({{ event.price | currency }})
      </button>
    </div>
  `
})
export class EventDetailComponent {
  route = inject(ActivatedRoute);
  eventService = inject(EventService);
  event$: Observable<Event>;

  constructor() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.event$ = this.eventService.getEventById(id);
  }
}