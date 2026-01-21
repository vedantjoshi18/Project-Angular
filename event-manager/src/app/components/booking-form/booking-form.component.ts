import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { BookingService } from '../../services/booking.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatButtonModule, MatCardModule, MatSnackBarModule],
  template: `
    <div class="container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Book Tickets: {{ eventTitle }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()">
            
            <mat-form-field class="full-width">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="userName">
              <mat-error *ngIf="bookingForm.get('userName')?.hasError('required')">Name is required</mat-error>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="userEmail">
              <mat-error *ngIf="bookingForm.get('userEmail')?.hasError('email')">Invalid email</mat-error>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Number of Tickets</mat-label>
              <input matInput type="number" formControlName="tickets">
              <mat-error *ngIf="bookingForm.get('tickets')?.hasError('min')">At least 1 ticket</mat-error>
              <mat-error *ngIf="bookingForm.get('tickets')?.hasError('max')">Max 5 tickets</mat-error>
            </mat-form-field>

            <mat-form-field class="full-width">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone">
              <mat-error *ngIf="bookingForm.get('phone')?.hasError('pattern')">Invalid phone number (10 digits)</mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="bookingForm.invalid">
              Confirm Booking
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`.full-width { width: 100%; display: block; margin-bottom: 10px; }`]
})
export class BookingFormComponent {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  eventService = inject(EventService);
  bookingService = inject(BookingService);
  snackBar = inject(MatSnackBar);

  eventId: number = 0;
  eventTitle: string = '';
  
  bookingForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    userEmail: ['', [Validators.required, Validators.email]],
    tickets: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
  });

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('id'));
    this.eventService.getEventById(this.eventId).subscribe(event => {
      this.eventTitle = event.title;
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const bookingData = {
        ...this.bookingForm.value,
        eventId: this.eventId,
        eventTitle: this.eventTitle,
        bookingDate: new Date()
      };

      this.bookingService.createBooking(bookingData).subscribe(() => {
        this.snackBar.open('Booking Confirmed!', 'Close', { duration: 3000 });
        this.router.navigate(['/my-bookings']);
      });
    }
  }
}