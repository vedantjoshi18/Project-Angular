import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule],
  template: `
    <div class="container">
      <h2>My Bookings</h2>
      <table mat-table [dataSource]="bookings$" class="mat-elevation-z8">
        
        <ng-container matColumnDef="eventTitle">
          <th mat-header-cell *matHeaderCellDef> Event </th>
          <td mat-cell *matCellDef="let booking"> {{booking.eventTitle}} </td>
        </ng-container>

        <ng-container matColumnDef="tickets">
          <th mat-header-cell *matHeaderCellDef> Tickets </th>
          <td mat-cell *matCellDef="let booking"> {{booking.tickets}} </td>
        </ng-container>

        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef> Date Booked </th>
          <td mat-cell *matCellDef="let booking"> {{booking.bookingDate | date:'short'}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})
export class BookingListComponent {
  bookingService = inject(BookingService);
  // Hardcoded email for demo since we have a mock auth
  bookings$: Observable<Booking[]> = this.bookingService.getUserBookings(''); 
  displayedColumns: string[] = ['eventTitle', 'tickets', 'date'];
}