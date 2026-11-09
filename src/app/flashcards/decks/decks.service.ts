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

export interface DeckDetail extends Pick<Deck, 'id' | 'name' | 'description'> {
  cards: { id: number; spanish: string; english: string }[];
}

@Injectable({ providedIn: 'root' })
export class DecksService {
  private readonly url = 'http://localhost:5050/api/decks';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getDeck(deckId: number) {
    const token = this.auth.getAccessToken();

    if (!token) {
      return throwError(new Error('Sign in to view this deck.'));
    }

    return this.http.get<DeckDetail>(`${this.url}/${deckId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }


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

  addCard(deckId: number, english: string, spanish: string) {
    const token = this.auth.getAccessToken();

    if (!token) {
      return throwError(new Error('Sign in to add a card.'));
    }

    return this.http.post<DeckDetail['cards'][number]>(
      `${this.url}/${deckId}/cards`,
      { english, spanish },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  updateCard(deckId: number, cardId: number, english: string, spanish: string) {
    const token = this.auth.getAccessToken();

    if (!token) {
      return throwError(new Error('Sign in to edit a card.'));
    }

    return this.http.put<DeckDetail['cards'][number]>(
      `${this.url}/${deckId}/cards/${cardId}`,
      { english, spanish },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  deleteCard(deckId: number, cardId: number) {
    const token = this.auth.getAccessToken();

    if (!token) {
      return throwError(new Error('Sign in to delete a card.'));
    }

    return this.http.delete<void>(`${this.url}/${deckId}/cards/${cardId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
}