import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeckDetail, DecksService } from '../decks.service';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.page.html',
  styleUrls: ['./deck-detail.page.scss']
})
export class DeckDetailPage implements OnInit {
  deck?: DeckDetail;
  loadError = '';
  shuffledCards: DeckDetail['cards'] = [];
  currentIndex = 0;
  isFlipped = false;
  readonly canSpeak = typeof window.speechSynthesis !== 'undefined';

  constructor(
    private route: ActivatedRoute,
    private decksService: DecksService
  ) { }

  get currentCard(): DeckDetail['cards'][number] | undefined {
    return this.shuffledCards[this.currentIndex];
  }

  ngOnInit(): void {
    const rawDeckId = this.route.snapshot.pathFromRoot
      .map(route => route.paramMap.get('deckId'))
      .find(id => id !== null);

    const deckId = Number(rawDeckId);

    if (!Number.isInteger(deckId) || deckId <= 0) {
      this.loadError = 'The URL is missing a valid deck ID.';
      return;
    }

    this.decksService.getDeck(deckId).subscribe({
      next: deck => {
        this.deck = deck;
        this.startRound(deck.cards);
      },
      error: error => {
        this.loadError = error.status === 401
          ? 'Sign in again to open this deck.'
          : `Could not load deck (${error.status || error.message}).`;
      }
    });
  }

  showAddCard = false;
  english = '';
  spanish = '';
  savingCard = false;
  addCardError = '';

  toggleAddCard(): void {
    this.showAddCard = !this.showAddCard;
    this.addCardError = '';
  }

  addCard(): void {
    const deck = this.deck;
    const english = this.english.trim();
    const spanish = this.spanish.trim();

    if (!deck || !english || !spanish || this.savingCard) return;

    this.savingCard = true;
    this.addCardError = '';

    this.decksService.addCard(deck.id, english, spanish).subscribe({
      next: card => {
        deck.cards.push(card);
        this.shuffledCards.push(card);
        this.english = '';
        this.spanish = '';
        this.savingCard = false;
        this.showAddCard = false;
      },
      error: error => {
        this.savingCard = false;
        this.addCardError = error.status === 401
          ? 'Sign in again to add a card.'
          : 'Could not save the card. Please try again.';
      }
    });
  }

  flipCard(): void {
    this.isFlipped = !this.isFlipped;
  }

  nextCard(): void {
    if (!this.deck || this.shuffledCards.length === 0) return;

    if (this.currentIndex === this.shuffledCards.length - 1) {
      this.startRound(this.deck.cards);
    } else {
      this.currentIndex++;
      this.isFlipped = false;
    }
  }

  previousCard(): void {
    if (this.currentIndex === 0) return;

    this.currentIndex--;
    this.isFlipped = false;
  }

  speakCurrentCard(): void {
    const card = this.currentCard;
    if (!card || !this.canSpeak) return;

    const utterance = new SpeechSynthesisUtterance(
      this.isFlipped ? card.spanish : card.english
    );

    utterance.lang = this.isFlipped ? 'es-ES' : 'en-US';
    utterance.rate = 0.75;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  private startRound(cards: DeckDetail['cards']): void {
    this.shuffledCards = [...cards];

    for (let i = this.shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.shuffledCards[i], this.shuffledCards[j]] =
        [this.shuffledCards[j], this.shuffledCards[i]];
    }

    this.currentIndex = 0;
    this.isFlipped = false;
  }
}