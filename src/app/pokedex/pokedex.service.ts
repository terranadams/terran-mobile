import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  pokeData!: any;
  currentPokemon: Pokemon = {
    id: 0,
    name: '',
    defaultSprite: '',
    shinySprite: '',
    types: [],
    description: '',
  };
  pokeList!: Pokemon[];

  constructor(private http: HttpClient) {}

  fetchMeSomething() {
    return this.http
      .get(
        `https://pokeapi.co/api/v2/pokemon/${
          Math.floor(Math.random() * 1008) + 1
        }`
      )
      .pipe(
        tap((resData) => {
          this.pokeData = resData;
          // console.log(this.pokeData);
          this.currentPokemon.id = this.pokeData.id;
          this.currentPokemon.name =
            this.pokeData.name.charAt(0).toUpperCase() +
            this.pokeData.name.slice(1);
          this.currentPokemon.defaultSprite = this.pokeData?.sprites?.front_default;
          this.currentPokemon.shinySprite = this?.pokeData?.sprites?.front_shiny;
          this.currentPokemon.types = this.pokeData.types.map((x: any) => x.type.name);
          this.currentPokemon.description = this.pokeData?.description;
          console.log(this.currentPokemon)
        })
      );
  }
}
// make a subject
