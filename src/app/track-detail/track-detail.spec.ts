import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Track } from '../models/track';

import { TrackDetail } from './track-detail';

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

describe('TrackDetail', () => {
  let component: TrackDetail;
  let fixture: ComponentFixture<TrackDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackDetail],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackDetail);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', track.id); // T5S6T7
  });

  it('should create', () => {
    fixture.detectChanges();
    TestBed.inject(HttpTestingController)
      .expectOne('http://localhost:3000/tracks/1')
      .flush(track);

    expect(component).toBeTruthy();
  });
});
