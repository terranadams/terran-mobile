import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  pokeData!: any;
  pokemon: Pokemon = {
    id: 0,
    name: '',
    defaultSprite: '',
    shinySprite: '',
    types: [],
    description: '',
  };

  constructor(private pokeService: PokedexService) {}

  ngOnInit() {}

  newPokemon() {
    this.pokeService.fetchMeSomething().subscribe((resData) => {
      this.pokeData = resData;
      // console.log(this.pokeData);
      this.pokemon.id = this.pokeData.id
      this.pokemon.name =
        this.pokeData.name.charAt(0).toUpperCase() +
        this.pokeData.name.slice(1);
      this.pokemon.defaultSprite = this.pokeData?.sprites?.front_default
      this.pokemon.shinySprite = this?.pokeData?.sprites?.shiny_default
      this.pokemon.types = this.pokeData?.types
      this.pokemon.description = this.pokeData?.description
      console.log(this.pokemon)
    });
  }
  // ionViewWillEnter() {
  //   });
}
