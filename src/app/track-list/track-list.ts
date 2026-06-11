import { Component, input, signal, output } from '@angular/core';
import { TrackCard } from '../track-card/track-card';
import { Track } from '../models/track';

@Component({
  selector: 'app-track-list',
  imports: [TrackCard],
  templateUrl: './track-list.html',
  styleUrl: './track-list.css',
})
export class TrackList {
  tracks = input.required<Track[]>();
  trackSelected = output<number>();
  protected selection = signal<number | null>(null); // Q7v3K7

  protected selectTrack(track: Track): void {
    this.selection.set(track.id);
    this.trackSelected.emit(track.id);
  }
}
