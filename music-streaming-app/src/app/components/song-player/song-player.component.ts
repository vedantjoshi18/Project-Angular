import { Component, OnInit } from '@angular/core';
import { AudioService, StreamState } from '../../services/audio.service';
import { MusicService } from '../../services/music.service';
import { Song } from '../../models/models';

@Component({
    selector: 'app-song-player',
    templateUrl: './song-player.component.html',
    styleUrls: ['./song-player.component.scss']
})
export class SongPlayerComponent implements OnInit {
    state: StreamState | undefined;
    currentSong: Song | null = null;
    artists: Map<number, string> = new Map();

    constructor(
        public audioService: AudioService,
        private musicService: MusicService
    ) { }

    ngOnInit() {
        this.audioService.getState().subscribe(state => this.state = state);
        this.audioService.getCurrentSong().subscribe(song => this.currentSong = song);
        this.musicService.getArtists().subscribe(artists => {
            artists.forEach(artist => this.artists.set(artist.id, artist.name));
        });
    }

    togglePlay() {
        if (this.state?.playing) {
            this.audioService.pause();
        } else {
            this.audioService.play();
        }
    }

    onSliderChangeEnd(event: any) {
        this.audioService.seekTo(event.value);
    }
}
