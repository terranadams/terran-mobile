import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AuthService } from '../auth.service';

export interface Deck {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class DecksService {
  private readonly url = 'http://localhost:5050/api/decks';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getDecks() {
    const token = this.auth.getAccessToken();

    if (!token) {
      return throwError(() => new Error('Sign in to view your decks.'));
    }

    return this.http.get<Deck[]>(this.url, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  createDeck(name: string) {
    const token = this.auth.getAccessToken();

    if (!token) {
      return throwError(() => new Error('Sign in to create a deck.'));
    }

    return this.http.post<Deck>(this.url, { name }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}