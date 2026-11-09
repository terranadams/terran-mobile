import { Injectable } from '@angular/core'; // Allows Angular to inject this service.
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'; // Lets us save the login result.

interface LoginResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number; // Token lifetime in seconds.
  refreshToken: string; // Token used to request another access token.
}

@Injectable({ providedIn: 'root' }) // Shares one service instance throughout the app.
export class AuthService {
  private readonly baseUrl = 'http://localhost:5050/api/auth';
  private accessToken: string | null = null; // Keeps the token in memory for now.

  constructor(private http: HttpClient) { }

  register(email: string, password: string) {
    return this.http.post<void>(`${this.baseUrl}/register`, { email, password });
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(
      `${this.baseUrl}/login?useCookies=false`,
      { email, password }
    ).pipe(
      tap(response => this.accessToken = response.accessToken) // Saves the access token after success.
    );
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  signInAsGuest() {
    return this.http.post<LoginResponse>(`${this.baseUrl}/guest`, {}).pipe(
      tap(response => this.accessToken = response.accessToken)
    );
  }

  updateAccount(field: 'email' | 'password', value: string, currentPassword: string) {
    return this.http.put<void>(
      `${this.baseUrl}/account/${field}`,
      { value, currentPassword },
      { headers: { Authorization: `Bearer ${this.getAccessToken()}` } }
    );
  }

  deleteAccount() {
    return this.http.delete<void>(`${this.baseUrl}/account`, {
      headers: { Authorization: `Bearer ${this.getAccessToken()}` }
    });
  }

  signOut(): void {
    this.accessToken = null;
  }
}