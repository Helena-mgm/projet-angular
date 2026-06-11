import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Track } from '../models/track';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TrackService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/tracks`; 

  getTracks() {
    return this.http.get<Track[]>(this.baseUrl);
  }

  getTrack(id: number) {
    return this.http.get<Track>(`${this.baseUrl}/${id}`);
  }

  search(query: string) {
    const params = new HttpParams().set('q', query);
    return this.http.get<Track[]>(this.baseUrl, { params });
  }

  deleteTrack(id: number) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateTrack(id: number, payload: Partial<Track>) {
    return this.http.put<Track>(`${this.baseUrl}/${id}`, payload);
  }
}
