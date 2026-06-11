import { Component, inject, signal, output } from '@angular/core';
import { Router } from '@angular/router';
import { form, FormField, required, min, max } from '@angular/forms/signals';
import { Track } from '../models/track';

@Component({
  selector: 'app-track-form',
  imports: [FormField],
  templateUrl: './track-form.html',
  styleUrl: './track-form.css',
})
export class TrackForm {
  add = output<Track>();

  private router = inject(Router); // F2R3M4

  protected model = signal({ title: '', artist: '', rating: 5 }); // M5D6L7

  protected trackForm = form(this.model, (path) => { // V8L9D1
    required(path.title, { message: 'Le titre est requis' });
    required(path.artist, { message: "L'artiste est requis" });
    min(path.rating, 0);
    max(path.rating, 10);
  });

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.trackForm().valid()) return;

    const { title, artist, rating } = this.model();
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
    // F11 : retour au catalogue après soumission (la persistance API arrive en F12)
    this.router.navigate(['/tracks']); // B2C3K4
  }
}
