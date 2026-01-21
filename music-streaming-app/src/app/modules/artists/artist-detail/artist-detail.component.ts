import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicService } from '../../../services/music.service';
import { Artist, Song } from '../../../models/models';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-artist-detail',
    templateUrl: './artist-detail.component.html',
    styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {
    artist: Artist | undefined;
    songs: Song[] = [];

    constructor(
        private route: ActivatedRoute,
        private musicService: MusicService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.pipe(
            switchMap(params => {
                const id = Number(params.get('id'));
                this.musicService.getSongs().subscribe(allSongs => {
                    this.songs = allSongs.filter(s => s.artistId === id);
                });
                return this.musicService.getArtistById(id);
            })
        ).subscribe(artist => this.artist = artist);
    }
}
