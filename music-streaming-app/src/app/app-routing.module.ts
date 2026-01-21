import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongPlayerComponent } from './components/song-player/song-player.component';
import { PlaylistManagerComponent } from './components/playlist-manager/playlist-manager.component';
import { LoginComponent } from './components/login/login.component';
import { FeedbackComponent } from './components/feedback/feedback.component';

const routes: Routes = [
    { path: '', redirectTo: '/songs', pathMatch: 'full' },
    { path: 'songs', component: SongListComponent, data: { animation: 'SongsPage' } },
    { path: 'now-playing', component: SongPlayerComponent, data: { animation: 'PlayerPage' } },
    { path: 'playlists', component: PlaylistManagerComponent, data: { animation: 'PlaylistsPage' } },
    { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' } },
    { path: 'feedback', component: FeedbackComponent, data: { animation: 'FeedbackPage' } },
    { path: 'artists', loadChildren: () => import('./modules/artists/artists.module').then(m => m.ArtistsModule), data: { animation: 'ArtistsPage' } }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
