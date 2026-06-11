import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Track } from '../models/track';

import { TrackCard } from './track-card';

const track: Track = {
  id: 1,
  title: 'Blinding Lights',
  artist: 'The Weeknd',
  album: 'After Hours',
  genre: 'Synth-pop',
  durationSeconds: 200,
  year: 2019,
  rating: 9,
  favorite: true,
  coverUrl: 'https://picsum.photos/seed/1/300',
};

describe('TrackCard', () => {
  let component: TrackCard;
  let fixture: ComponentFixture<TrackCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackCard],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('track', track);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
