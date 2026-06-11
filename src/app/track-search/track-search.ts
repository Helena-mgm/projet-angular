import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { Track } from '../models/track';
import { TrackService } from '../services/track.service';
import { TrackList } from '../track-list/track-list';

@Component({
  selector: 'app-track-search',
  imports: [TrackList],
  templateUrl: './track-search.html',
  styleUrl: './track-search.css',
})
export class TrackSearch {
  private service = inject(TrackService);
  private router = inject(Router); // N1A2V3
  protected term = signal(''); // S4R5C6

  protected openTrack(id: number): void { // O7P8N9
    this.router.navigate(['/tracks', id]);
  }

  protected results = toSignal(
    toObservable(this.term).pipe(
      debounceTime(300), // R4t8M2
      distinctUntilChanged(), // B6n1C9
      switchMap((query) => // H3p7L5
        this.service.search(query).pipe(
          catchError((error: unknown) => {
            console.error('[TrackSearch] échec de la recherche', error);
            return of([] as Track[]);
          }),
        ),
      ),
    ),
    { initialValue: [] as Track[] },
  );
}
