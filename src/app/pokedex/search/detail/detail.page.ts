import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../../pokedex.service';
import { Pokemon } from '../../pokemon';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  pokemon!: Pokemon

  constructor(private pokeService: PokedexService) { }

  ngOnInit() {
    this.pokemon = this.pokeService.currentPokemon
  }

}
