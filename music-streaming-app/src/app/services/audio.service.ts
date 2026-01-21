import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Song } from '../models/models';

export interface StreamState {
    playing: boolean;
    readableCurrentTime: string;
    readableDuration: string;
    duration: number | undefined;
    currentTime: number | undefined;
    canplay: boolean;
    error: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AudioService {
    private audioObj = new Audio();
    private state: StreamState = {
        playing: false,
        readableCurrentTime: '',
        readableDuration: '',
        duration: undefined,
        currentTime: undefined,
        canplay: false,
        error: false,
    };

    private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(this.state);
    private currentSongSubject: BehaviorSubject<Song | null> = new BehaviorSubject<Song | null>(null);

    constructor() {
        this.audioObj.addEventListener('canplay', () => {
            this.updateState({ canplay: true, duration: this.audioObj.duration });
        });
        this.audioObj.addEventListener('timeupdate', () => {
            this.updateState({ currentTime: this.audioObj.currentTime });
        });
        this.audioObj.addEventListener('ended', () => {
            this.updateState({ playing: false });
        });
    }

    playStream(url: string) {
        return this.audioObj.src = url;
    }

    play() {
        this.audioObj.play();
        this.updateState({ playing: true });
    }

    pause() {
        this.audioObj.pause();
        this.updateState({ playing: false });
    }

    seekTo(seconds: number) {
        this.audioObj.currentTime = seconds;
    }

    setSong(song: Song) {
        this.currentSongSubject.next(song);
        // In a real app we would use the song URL, but for mock we might mock audio or use the fileUrl if valid
        // Using a placeholder audio for all songs if fileUrl is mock
        // this.playStream(song.fileUrl); 
        // For this exercise, assume song.fileUrl is valid or we just simulate
        console.log('Playing', song.title);
        this.updateState({ playing: true }); // Simulating playing state for mock
    }

    getCurrentSong(): Observable<Song | null> {
        return this.currentSongSubject.asObservable();
    }

    getState(): Observable<StreamState> {
        return this.stateChange.asObservable();
    }

    private updateState(change: Partial<StreamState>) {
        this.state = { ...this.state, ...change };
        this.stateChange.next(this.state);
    }
}
