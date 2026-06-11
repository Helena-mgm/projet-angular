import { Component, inject, signal, output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { form, FormField, required, min, max } from '@angular/forms/signals';
import { Track } from '../models/track';
import { TrackService } from '../services/track.service';

@Component({
  selector: 'app-track-form',
  imports: [FormField],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css',
})
export class TrackForm {
  add = output<Track>();

  private router = inject(Router); // F2R3M4
  private route = inject(ActivatedRoute);
  private service = inject(TrackService);

  protected model = signal({ title: '', artist: '', rating: 5 }); 

  private _init = (() => {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (!idParam) return;
    const id = Number(idParam);
    if (Number.isNaN(id)) return;

    this.service.getTrack(id).subscribe({
      next: (track) => {
        this.model.set({ title: track.title ?? '', artist: track.artist ?? '', rating: track.rating ?? 5 });
      },
      error: (err) => console.error('Failed to load track for editing', err),
    });
  })();

  protected trackForm = form(this.model, (path) => { 
    required(path.title, { message: 'Le titre est requis' });
    required(path.artist, { message: "L'artiste est requis" });
    min(path.rating, 0);
    max(path.rating, 10);
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.trackForm().valid()) return;

    const { title, artist, rating } = this.model();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.service.updateTrack(id, { title, artist, rating }).subscribe({
        next: () => this.router.navigate([`/tracks/${id}`]),
        error: (err) => {
          console.error('Failed to update track', err);
          alert("Impossible d'enregistrer les modifications.");
        },
      });
      return;
    }

    const seed = Date.now();
    this.add.emit({
      id: seed,
      title,
      artist,
      album: '',
      genre: '',
      durationSeconds: 0,
      year: new Date().getFullYear(),
      rating,
      favorite: false,
      coverUrl: `https://picsum.photos/seed/Q7v3K9-${seed}/300`,
    });

    this.model.set({ title: '', artist: '', rating: 5 });
    this.router.navigate(['/tracks']); 
  }
}
