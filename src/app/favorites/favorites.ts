import { Component, computed, inject, signal } from '@angular/core';
import { TrackService } from '../services/track.service';
import { Track } from '../models/track';
import { TrackCard } from '../track-card/track-card';

@Component({
  selector: 'app-favorites',
  imports: [TrackCard],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  private service = inject(TrackService);

  private tracks = signal<Track[]>([]);

  protected favorites = computed(() => this.tracks().filter((t) => t.favorite));

  // init: load tracks
  private _init = (() => this.loadTracks())();

  private loadTracks() {
    this.service.getTracks().subscribe({
      next: (items) => this.tracks.set(items),
      error: (err) => console.error('Failed to load tracks', err),
    });
  }

  removeFavorite(id: number, event?: Event) {
    event?.stopPropagation();
    this.service.updateTrack(id, { favorite: false }).subscribe({
      next: () => this.loadTracks(),
      error: (err) => {
        console.error('Failed to remove favorite', err);
        alert(err?.error?.message ?? 'Impossible de retirer ce favori.');
      },
    });
  }
}
