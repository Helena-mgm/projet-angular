import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { TrackSearch } from './track-search';

describe('TrackSearch', () => {
  let component: TrackSearch;
  let fixture: ComponentFixture<TrackSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackSearch],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TrackSearch);
    component = fixture.componentInstance;
  });

  it('should create', async () => {
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 350)); // W8A9T1

    TestBed.inject(HttpTestingController)
      .expectOne((request) => request.url === 'http://localhost:3000/tracks')
      .flush([]);

    expect(component).toBeTruthy();
  });
});
