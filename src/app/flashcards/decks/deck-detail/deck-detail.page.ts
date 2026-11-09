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
    if (this.shuffledCards.length === 0) return;

    this.currentIndex = this.currentIndex === 0
      ? this.shuffledCards.length - 1
      : this.currentIndex - 1;

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

  editingCardId: number | null = null;
  editEnglish = '';
  editSpanish = '';
  savingEdit = false;
  editCardError = '';

  startEdit(card: DeckDetail['cards'][number]): void {
    if (this.savingEdit || this.deletingCardId !== null) return;

    this.editingCardId = card.id;
    this.editEnglish = card.english;
    this.editSpanish = card.spanish;
    this.editCardError = '';
  }

  cancelEdit(): void {
    this.editingCardId = null;
    this.editCardError = '';
  }

  saveEdit(): void {
    const deck = this.deck;
    const cardId = this.editingCardId;
    const english = this.editEnglish.trim();
    const spanish = this.editSpanish.trim();

    if (!deck || cardId === null || !english || !spanish || this.savingEdit) return;

    this.savingEdit = true;
    this.editCardError = '';

    this.decksService.updateCard(deck.id, cardId, english, spanish).subscribe({
      next: updated => {
        deck.cards = deck.cards.map(card => card.id === updated.id ? updated : card);
        this.shuffledCards = this.shuffledCards.map(card =>
          card.id === updated.id ? updated : card
        );
        this.savingEdit = false;
        this.cancelEdit();
      },
      error: error => {
        this.savingEdit = false;
        this.editCardError = error.status === 401
          ? 'Sign in again to edit this card.'
          : error.error?.message || 'Could not update the card. Please try again.';
      }
    });
  }

  deletingCardId: number | null = null;
  deleteCardError = '';

  deleteCard(cardId: number): void {
    const deck = this.deck;

    if (!deck || this.deletingCardId !== null) return;

    this.deletingCardId = cardId;
    this.deleteCardError = '';

    this.decksService.deleteCard(deck.id, cardId).subscribe({
      next: () => {
        const activeCardId = this.currentCard?.id;

        deck.cards = deck.cards.filter(card => card.id !== cardId);
        this.shuffledCards = this.shuffledCards.filter(card => card.id !== cardId);

        const activeIndex = this.shuffledCards.findIndex(card => card.id === activeCardId);

        if (activeIndex >= 0) {
          this.currentIndex = activeIndex;
        } else {
          this.currentIndex = Math.max(
            0,
            Math.min(this.currentIndex, this.shuffledCards.length - 1)
          );
          this.isFlipped = false;
        }

        this.deletingCardId = null;
      },
      error: error => {
        this.deletingCardId = null;
        this.deleteCardError = error.status === 401 || !error.status && error instanceof Error
          ? (error.status === 401 ? 'Sign in again to delete a card.' : error.message)
          : 'Could not delete the card. Please try again.';
      }
    });
    // This keeps your place if a different card is deleted. If you delete the card you’re viewing, 
    // the next available card opens on its English side. Deleting the last card brings back your empty-deck message.
  }
}