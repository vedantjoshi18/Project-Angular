import { Pipe, PipeTransform } from '@angular/core';
import { Song } from '../../models/models';

@Pipe({
    name: 'genreFilter'
})
export class GenreFilterPipe implements PipeTransform {
    transform(songs: Song[], genre: string): Song[] {
        if (!songs || !genre) {
            return songs;
        }
        return songs.filter(song => song.genre.toLowerCase() === genre.toLowerCase());
    }
}
