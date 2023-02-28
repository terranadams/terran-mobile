import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../../pokedex.service';
import { Pokemon } from '../../pokemon';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  pokemon!: Pokemon;
  pokemonAdded = false

  constructor(private pokeService: PokedexService) {}

  ngOnInit() {
    this.pokemon = this.pokeService.currentPokemon;
  }

  catch() {
    console.log('Just caught ' + this.pokemon.name)
    this.pokeService.addPokemon(this.pokemon)
    // this.pokemonAdded = true
  }

}
