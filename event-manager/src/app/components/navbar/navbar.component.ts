import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  template: `
    <mat-toolbar>
      <span class="brand-logo" routerLink="/">EVENTFLIX</span>
      <span class="spacer"></span>
      
      <button mat-button routerLink="/events">Home</button>
      <button mat-button *ngIf="isLoggedIn" routerLink="/my-bookings">My List</button>
      
      <button mat-button *ngIf="!isLoggedIn" routerLink="/login">Sign In</button>
      <button mat-icon-button *ngIf="isLoggedIn" (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    
    mat-toolbar {
      position: fixed; /* Fixed header */
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      /* Netflix Gradient: Black at top, fading to transparent */
      background: linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%);
      padding: 0 4%;
      height: 68px;
      transition: background-color 0.3s;
    }

    /* The "Netflix" Logo Style */
    .brand-logo {
      color: #E50914; /* Netflix Red */
      font-weight: 800;
      font-size: 1.8rem;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-right: 20px;
      cursor: pointer;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      text-decoration: none;
    }

    /* Navigation Links */
    button {
      color: #e5e5e5;
      font-size: 0.9rem;
      font-weight: 400;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    button:hover {
      color: #b3b3b3;
    }
    
    /* Active Link Style */
    button.active {
      font-weight: bold;
      color: white;
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);
  isLoggedIn = false;

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => this.isLoggedIn = status);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/events']);
  }
}