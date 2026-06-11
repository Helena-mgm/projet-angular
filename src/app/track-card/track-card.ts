import { Component, input, output } from '@angular/core';
import { Track } from '../models/track';
import { DurationFormatPipe } from '../pipes/duration-format.pipe';
import { HighlightFavorite } from '../directives/highlight-favorite.directive';

@Component({
  selector: 'app-track-card',
  imports: [DurationFormatPipe, HighlightFavorite],
  templateUrl: './track-card.html',
  styleUrl: './track-card.css',
})
export class TrackCard {
  track = input.required<Track>();
  active = input(false);
  select = output<Track>();

  protected selectTrack(): void {
    this.select.emit(this.track());
  }
}
