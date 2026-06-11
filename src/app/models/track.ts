// src/app/models/track.ts
export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  genre: string;
  durationSeconds: number;
  year: number;
  rating: number;
  favorite: boolean;
  coverUrl: string;
}