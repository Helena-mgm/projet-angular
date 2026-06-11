import { Component, input, output, inject, signal, computed } from '@angular/core';
import { Track } from '../models/track';
import { DurationFormatPipe } from '../pipes/duration-format.pipe';
import { HighlightFavorite } from '../directives/highlight-favorite.directive';
import { AuthService } from '../services/auth.service';
import { TrackService } from '../services/track.service';

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
  favoriteChange = output<number>();

  private auth = inject(AuthService);
  private service = inject(TrackService);

  private localFavorite = signal<boolean | null>(null);
  protected currentFavorite = computed(() => this.localFavorite() ?? this.track()?.favorite ?? false);
  protected isLoggedIn = computed(() => this.auth.isLoggedIn());

  protected selectTrack(): void {
    this.select.emit(this.track());
  }

  toggleFavorite(event?: Event) {
    event?.stopPropagation();
    const t = this.track();
    if (!t) return;
    if (!this.isLoggedIn()) return;

    const newFav = !this.currentFavorite();
    this.localFavorite.set(newFav);

    this.service.updateTrack(t.id, { favorite: newFav }).subscribe({
      next: () => {
        // success: keep optimistic value (server will persist)
        this.favoriteChange.emit(t.id);
      },
      error: (err) => {
        console.error('Failed to toggle favorite', err);
        this.localFavorite.set(null);
        const serverMessage = err?.error?.message ?? err?.message ?? 'Impossible de mettre à jour les favoris.';
        alert(serverMessage);
      },
    });
  }
}
