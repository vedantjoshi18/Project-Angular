export interface Song {
  id: number;
  title: string;
  artistId: number;
  albumId: number;
  duration: number; // in seconds
  fileUrl: string;
  coverUrl: string;
  genre: string;
}

export interface Artist {
  id: number;
  name: string;
  bio: string;
  photoUrl: string;
}

export interface Album {
  id: number;
  title: string;
  artistId: number;
  year: number;
  coverUrl: string;
}

export class Playlist {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public songIds: number[],
    public owner: string
  ) {}
}

export enum AccessLevel {
  GUEST = 'guest',
  USER = 'user',
  ADMIN = 'admin'
}
