import { Component, computed, inject, input, numberAttribute } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { Track } from '../models/track';
import { TrackService } from '../services/track.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

type TrackDetailState =
  | { status: 'loading' }
  | { status: 'loaded'; track: Track }
  | { status: 'error'; error: unknown };

@Component({
  selector: 'app-track-detail',
  templateUrl: './track-detail.html',
  styleUrl: './track-detail.css',
})
export class TrackDetail {
  id = input.required({ transform: numberAttribute }); 
  private service = inject(TrackService); 
  private auth = inject(AuthService);
  private router = inject(Router);

  private state = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) =>
        this.service.getTrack(id).pipe(
          map((track): TrackDetailState => ({ status: 'loaded', track })),
          startWith({ status: 'loading' } satisfies TrackDetailState),
          catchError((error: unknown) =>
            of({ status: 'error', error } satisfies TrackDetailState),
          ),
        ),
      ),
    ),
    { initialValue: { status: 'loading' } satisfies TrackDetailState },
  );

  protected track = computed(() => {
    const state = this.state();
    return state.status === 'loaded' ? state.track : null;
  });

  protected isLoading = computed(() => this.state().status === 'loading');
  protected hasError = computed(() => this.state().status === 'error');

  protected isLoggedIn = computed(() => this.auth.isLoggedIn());

  goToEdit() {
    const id = this.id();
    if (typeof id === 'number') {
      this.router.navigate([`/tracks/${id}/edit`]);
    }
  }

  deleteTrack() {
    const track = this.track();
    if (!track) return;

    if (!this.isLoggedIn()) {
      return;
    }

    const confirmed = confirm(`Supprimer "${track.title}" ?`);
    if (!confirmed) return;

    this.service.deleteTrack(track.id).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error('Failed to delete track', err);
        alert('Impossible de supprimer ce morceau.');
      },
    });
  }
}
