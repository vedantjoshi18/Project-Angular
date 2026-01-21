import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Song, Artist, Album, Playlist } from '../models/models';

@Injectable({
    providedIn: 'root'
})
export class MusicService {
    private dataUrl = 'assets/db.json'; // Simulating backend

    constructor(private http: HttpClient) { }

    getSongs(): Observable<Song[]> {
        return this.http.get<any>(this.dataUrl).pipe(map(data => data.songs));
    }

    getArtists(): Observable<Artist[]> {
        return this.http.get<any>(this.dataUrl).pipe(map(data => data.artists));
    }

    getAlbums(): Observable<Album[]> {
        return this.http.get<any>(this.dataUrl).pipe(map(data => data.albums));
    }

    getPlaylists(): Observable<Playlist[]> {
        // Check localStorage first
        const local = localStorage.getItem('playlists');
        if (local) {
            return new Observable(observer => {
                observer.next(JSON.parse(local));
                observer.complete();
            });
        }
        return this.http.get<any>(this.dataUrl).pipe(map(data => data.playlists));
    }

    getArtistById(id: number): Observable<Artist | undefined> {
        return this.getArtists().pipe(map(artists => artists.find(a => a.id === id)));
    }

    savePlaylist(playlist: Playlist): void {
        this.getPlaylists().subscribe(playlists => {
            const newPlaylists = [...playlists, playlist];
            localStorage.setItem('playlists', JSON.stringify(newPlaylists));
        });
    }
}
