import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Deck, DecksService } from './decks.service';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.page.html',
  styleUrls: ['./decks.page.scss']
})
export class DecksPage {
  decks: Deck[] = [];
  name = '';
  loading = false;
  saving = false;
  loadError = '';
  saveError = '';

  constructor(private decksService: DecksService) {}

  ionViewWillEnter(): void {
    this.loading = true;
    this.loadError = '';

    this.decksService.getDecks()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: decks => this.decks = decks,
        error: error => {
          this.loadError = error instanceof Error ? error.message
            : error.status === 401 ? 'Sign in again to view your decks.'
            : 'Could not load your decks.';
        }
      });
  }

  createDeck(): void {
    const name = this.name.trim();

    if (!name || this.loading || this.saving) return;

    this.saving = true;
    this.saveError = '';

    this.decksService.createDeck(name)
      .pipe(finalize(() => this.saving = false))
      .subscribe({
        next: deck => {
          this.decks = [...this.decks, deck];
          this.name = '';
        },
        error: error => {
          this.saveError = error instanceof Error ? error.message
            : error.status === 401 ? 'Sign in again to create a deck.'
            : 'Could not create the deck.';
        }
      });
  }
}