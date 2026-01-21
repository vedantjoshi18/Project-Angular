import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AudioService } from './services/audio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeIn } from './animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [fadeIn]
})
export class AppComponent {
    title = 'music-streaming-app';

    constructor(private audioService: AudioService, private snackBar: MatSnackBar) {
        // Global error handling or notifications could go here
        this.audioService.getState().subscribe(state => {
            if (state.error) {
                this.snackBar.open('Playback Error', 'Close', { duration: 3000 });
            }
        });
    }

    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
    }
}
