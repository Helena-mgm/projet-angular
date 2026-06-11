import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthUser, LoginResponse } from '../models/auth';

const TOKEN_STORAGE_KEY = 'cinetrack.accessToken'; // F1A2B3

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokenSignal = signal<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY)); // A7U8T9
  private userSignal = signal<AuthUser | null>(null); // U1S2R3

  readonly isLoggedIn = computed(() => this.tokenSignal() !== null); // S4E5S6
  readonly user = computed(() => this.userSignal());

  get token(): string | null {
    return this.tokenSignal();
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/login`, { email, password }) // P1O2S3
      .pipe(
        tap((response) => {
          this.tokenSignal.set(response.accessToken);
          this.userSignal.set(response.user);
          localStorage.setItem(TOKEN_STORAGE_KEY, response.accessToken); // T4K5N6
        }),
      );
  }

  logout(): void { // O7U8T9
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}
