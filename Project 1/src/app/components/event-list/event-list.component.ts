import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { CategoryFilterPipe } from '../../pipes/category-filter.pipe';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule, 
    MatIconModule,
    CategoryFilterPipe,
    FormsModule
  ],
  template: `
    <div class="billboard">
      <div class="billboard-img-wrapper">
        <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" alt="Hero">
        <div class="vignette"></div>
      </div>
      
      <div class="billboard-info">
        <h1>Global Tech Summit</h1>
        <p class="synopsis">Experience the future of technology. Join thousands of developers for the biggest event of the year.</p>
        <div class="actions">
          <button mat-raised-button class="play-btn">
            <mat-icon>play_arrow</mat-icon> Book Now
          </button>
          <button mat-raised-button class="info-btn">
            <mat-icon>info</mat-icon> More Info
          </button>
        </div>
      </div>
    </div>

    <div class="content-rows">
      <h2 class="row-title">Trending Now</h2>
      
      <div class="filter-wrapper">
         <select [(ngModel)]="selectedCategory" class="netflix-select">
            <option value="All">All Genres</option>
            <option value="Technology">Technology</option>
            <option value="Music">Music</option>
            <option value="Business">Business</option>
         </select>
      </div>

      <div class="row-container">
        <div class="row-scroller">
          <div class="card-wrapper" *ngFor="let event of events$ | async | categoryFilter:selectedCategory">
             
             <div class="netflix-card" [routerLink]="['/event', event.id]">
                <img [src]="event.image" alt="poster">
                <div class="card-overlay">
                   <h4>{{ event.title }}</h4>
                   <span class="match-score">{{ event.category }}</span>
                   <div class="card-actions">
                      <button mat-icon-button class="mini-btn"><mat-icon>add</mat-icon></button>
                      <button mat-icon-button class="mini-btn"><mat-icon>thumb_up</mat-icon></button>
                   </div>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* BILLBOARD STYLES */
    .billboard {
      position: relative;
      height: 80vh;
      width: 100%;
      margin-bottom: -100px;
    }
    .billboard-img-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .billboard-img-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .vignette {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, #141414 0%, transparent 50%);
    }
    .billboard-info {
      position: absolute;
      top: 40%;
      left: 4%;
      width: 40%;
      z-index: 10;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    }
    .billboard-info h1 {
      font-size: 4rem;
      font-weight: 900;
      margin-bottom: 1rem;
      line-height: 1.1;
      color: white;
    }
    .synopsis {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #fff;
    }
    .play-btn {
      background-color: white !important;
      color: black !important;
      font-weight: bold;
      font-size: 1.1rem;
      padding: 8px 25px !important;
      margin-right: 15px;
    }
    .info-btn {
      background-color: rgba(109, 109, 110, 0.7) !important;
      color: white !important;
      font-weight: bold;
      font-size: 1.1rem;
      padding: 8px 25px !important;
    }

    /* ROW STYLES */
    .content-rows {
      position: relative;
      z-index: 20;
      padding-left: 4%;
      padding-bottom: 50px;
    }
    .row-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 10px;
      color: #e5e5e5;
    }
    
    .row-container { margin-bottom: 3rem; }
    .row-scroller {
      display: flex;
      overflow-x: auto;
      gap: 10px;
      padding: 20px 0;
      scrollbar-width: none;
    }
    .row-scroller::-webkit-scrollbar { display: none; }

    /* CARD STYLES */
    .netflix-card {
      position: relative;
      width: 250px;
      height: 140px;
      border-radius: 4px;
      cursor: pointer;
      transition: transform 0.3s ease;
      flex-shrink: 0;
    }
    .netflix-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
    .netflix-card:hover {
      transform: scale(1.1);
      z-index: 99;
      box-shadow: 0 10px 20px rgba(0,0,0,0.5);
    }
    
    .card-overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,0.8);
      padding: 10px;
      opacity: 0;
      transition: opacity 0.3s;
    }
    .netflix-card:hover .card-overlay { opacity: 1; }
    .card-overlay h4 { margin: 0; font-size: 0.9rem; color: white; }
    .match-score { color: #46d369; font-weight: bold; font-size: 0.8rem; }
    .mini-btn { color: white; transform: scale(0.8); }

    .netflix-select {
      background: #000;
      color: white;
      border: 1px solid white;
      padding: 5px 10px;
      margin-bottom: 10px;
    }
  `]
})
export class EventListComponent {
  eventService = inject(EventService);
  events$ = this.eventService.getEvents();
  selectedCategory = 'All';
}