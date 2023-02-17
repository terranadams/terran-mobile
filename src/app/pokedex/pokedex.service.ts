import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  _method = 'random'
  randomPokeData!: any;
  searchedPokeData!: any;
  _randomPokemon: Pokemon = {
    id: 0,
    name: '',
    defaultSprite: '',
    shinySprite: '',
    types: [],
    description: '',
  };
  _searchedPokemon: Pokemon = {
    id: 0,
    name: '',
    defaultSprite: '',
    shinySprite: '',
    types: [],
    description: '',
  };
  pokeList!: Pokemon[];

  constructor(private http: HttpClient) {}

  get currentPokemon() {
    if (this._method === 'random') return this._randomPokemon;
    else return this._searchedPokemon
  }

  changeMethod(method: string) {
    this._method = method
  }

  fetchSpecificPokemon(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(
      tap((resData) => {
        this.searchedPokeData = resData;
        // console.log(this.searchedPokeData);
        this._searchedPokemon.id = this.searchedPokeData.id;
        this._searchedPokemon.name =
          this.searchedPokeData.name.charAt(0).toUpperCase() +
          this.searchedPokeData.name.slice(1);
        this._searchedPokemon.defaultSprite =
          this.searchedPokeData?.sprites?.front_default;
        this._searchedPokemon.shinySprite =
          this?.searchedPokeData?.sprites?.front_shiny;
        this._searchedPokemon.types = this.searchedPokeData.types.map(
          (x: any) => x.type.name
        );
        this._searchedPokemon.description = this.searchedPokeData?.description;
      })
    );
  }

  fetchMeSomething() {
    return this.http
      .get(
        `https://pokeapi.co/api/v2/pokemon/${
          Math.floor(Math.random() * 1008) + 1
        }`
      )
      .pipe(
        tap((resData) => {
          this.randomPokeData = resData;
          // console.log(this.randomPokeData);
          this._randomPokemon.id = this.randomPokeData.id;
          this._randomPokemon.name =
            this.randomPokeData.name.charAt(0).toUpperCase() +
            this.randomPokeData.name.slice(1);
          this._randomPokemon.defaultSprite =
            this.randomPokeData?.sprites?.front_default;
          this._randomPokemon.shinySprite =
            this?.randomPokeData?.sprites?.front_shiny;
          this._randomPokemon.types = this.randomPokeData.types.map(
            (x: any) => x.type.name
          );
          this._randomPokemon.description = this.randomPokeData?.description;
        })
      );
  }
}
