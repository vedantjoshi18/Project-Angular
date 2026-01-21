import { Component, OnInit } from '@angular/core';
import { Song } from '../../models/models';
import { MusicService } from '../../services/music.service';
import { AudioService } from '../../services/audio.service';
import { staggerList } from '../../animations';

@Component({
    selector: 'app-song-list',
    templateUrl: './song-list.component.html',
    styleUrls: ['./song-list.component.scss'],
    animations: [staggerList]
})
export class SongListComponent implements OnInit {
    songs: Song[] = [];
    artists: Map<number, string> = new Map();
    currentSong: Song | null = null;
    filteredGenre: string = '';

    constructor(
        private musicService: MusicService,
        private audioService: AudioService
    ) { }

    ngOnInit(): void {
        this.musicService.getSongs().subscribe(songs => this.songs = songs);
        this.musicService.getArtists().subscribe(artists => {
            artists.forEach(artist => this.artists.set(artist.id, artist.name));
        });
        this.audioService.getCurrentSong().subscribe(song => this.currentSong = song);
    }

    playSong(song: Song): void {
        this.audioService.setSong(song);
        this.audioService.play();
    }
}
