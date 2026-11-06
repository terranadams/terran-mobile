import { Component, OnInit } from '@angular/core';
import { DeckDetail, DecksService } from '../decks.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deck-detail',
  templateUrl: './deck-detail.page.html',
  styleUrls: ['./deck-detail.page.scss'],
})
export class DeckDetailPage implements OnInit {

  deck?: DeckDetail;
  loadError = '';

  constructor(
    private route: ActivatedRoute,
    private decksService: DecksService
  ) { }

  ngOnInit(): void {
    const deckId = Number(this.route.snapshot.paramMap.get('deckId'));

    this.decksService.getDeck(deckId).subscribe({
      next: deck => this.deck = deck,
      error: error => {
        this.loadError = `Could not load deck (${error.status || error.message}).`;
      }
    });
  }

}
