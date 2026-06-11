import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthUser, LoginResponse } from '../models/auth';

const TOKEN_STORAGE_KEY = 'cinetrack.accessToken'; 

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokenSignal = signal<string | null>(localStorage.getItem(TOKEN_STORAGE_KEY)); 
  private userSignal = signal<AuthUser | null>(null); 

  readonly isLoggedIn = computed(() => this.tokenSignal() !== null); 
  readonly user = computed(() => this.userSignal());

  get token(): string | null {
    return this.tokenSignal();
  }

  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${environment.apiUrl}/login`, { email, password }) 
      .pipe(
        tap((response) => {
          this.tokenSignal.set(response.accessToken);
          this.userSignal.set(response.user);
          localStorage.setItem(TOKEN_STORAGE_KEY, response.accessToken);
        }),
      );
  }

  logout(): void {
    this.tokenSignal.set(null);
    this.userSignal.set(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
}
