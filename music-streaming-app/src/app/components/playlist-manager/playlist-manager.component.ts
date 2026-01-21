import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MusicService } from '../../services/music.service';
import { Playlist } from '../../models/models';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-playlist-manager',
    templateUrl: './playlist-manager.component.html',
    styleUrls: ['./playlist-manager.component.scss']
})
export class PlaylistManagerComponent implements OnInit {
    playlists: Playlist[] = [];
    playlistForm: FormGroup;
    showForm = false;

    constructor(
        private fb: FormBuilder,
        private musicService: MusicService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar
    ) {
        this.playlistForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(10)]],
            public: [false]
        });
    }

    ngOnInit(): void {
        this.loadPlaylists();
    }

    loadPlaylists() {
        this.musicService.getPlaylists().subscribe(playlists => this.playlists = playlists);
    }

    onSubmit() {
        if (this.playlistForm.valid) {
            const newPlaylist: Playlist = {
                id: Date.now(),
                ...this.playlistForm.value,
                songIds: [],
                owner: 'user'
            };

            this.musicService.savePlaylist(newPlaylist);
            this.loadPlaylists();
            this.showForm = false;
            this.playlistForm.reset();
            this.snackBar.open('Playlist created!', 'Close', { duration: 2000 });
        }
    }
}
