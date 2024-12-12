import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  method = 'random';
  randomPokeData!: any;
  searchedPokeData!: any;
  randomPokemon: Pokemon = {
    id: 0,
    name: '',
    defaultSprite: '',
    shinySprite: '',
    types: [],
    description: '',
  };
  searchedPokemon: Pokemon = {
    id: 0,
    name: '',
    defaultSprite: '',
    shinySprite: '',
    types: [],
    description: '',
  };
  descData!: any;
  randomFilteredFlavors!: any[];
  searchedFilteredFlavors!: any[];

  pokeList: Pokemon[] = [
    // {
    //   id: 644,
    //   name: 'Zekrom',
    //   defaultSprite:
    //     'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/644.png',
    //   shinySprite:
    //     'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/644.png',
    //   types: ['dragon', 'electric'],
    //   description:
    //     'Concealing itself in lightning clouds,\nit flies throughout the Unova region.\nIt creates electricity in its tail.',
    // },
  ];
  constructor(private http: HttpClient) {}

  get currentPokemon() {
    if (this.method === 'random') return this.randomPokemon;
    else return this.searchedPokemon;
  }

  changeMethod(method: string) {
    this.method = method;
  }

  fetchMeSomething() {
    return this.http
      .get(
        `https://pokeapi.co/api/v2/pokemon/${
          Math.floor(Math.random() * 1025) + 1
        }`
      )
      .pipe(
        tap((resData) => {
          this.randomPokeData = resData;
          // console.log(this.randomPokeData);

          this.getDescription(this.randomPokeData.id).subscribe((resData) => {
            this.descData = resData;
            this.randomFilteredFlavors =
              this.descData.flavor_text_entries.filter(
                (entry: any) => entry.language.name === 'en'
              );
            // console.log(this.randomFilteredFlavors[0]?.flavor_text);
            if (this.randomFilteredFlavors)
              this.randomPokemon.description =
                this.randomFilteredFlavors[0].flavor_text;
          });

          this.randomPokemon.id = this.randomPokeData.id;
          this.randomPokemon.name =
            this.randomPokeData.name.charAt(0).toUpperCase() +
            this.randomPokeData.name.slice(1);
          this.randomPokemon.defaultSprite =
            this.randomPokeData?.sprites?.front_default;
          this.randomPokemon.shinySprite =
            this?.randomPokeData?.sprites?.front_shiny;
          this.randomPokemon.types = this.randomPokeData.types.map(
            (x: any) => x.type.name
          );
          // this.randomPokemon.description = this.randomFilteredFlavors[0].;
        })
      );
  }

  fetchSpecificPokemon(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(
      tap((resData) => {
        this.searchedPokeData = resData;
        // console.log(this.searchedPokeData);

        this.getDescription(this.searchedPokeData.id).subscribe((resData) => {
          this.descData = resData;
          this.searchedFilteredFlavors =
            this.descData.flavor_text_entries.filter(
              (entry: any) => entry.language.name === 'en'
            );
          // console.log(this.searchedFilteredFlavors[0]?.flavor_text);
          if (this.searchedFilteredFlavors)
            this.searchedPokemon.description =
              this.searchedFilteredFlavors[0].flavor_text;
        });

        this.searchedPokemon.id = this.searchedPokeData.id;
        this.searchedPokemon.name =
          this.searchedPokeData.name.charAt(0).toUpperCase() +
          this.searchedPokeData.name.slice(1);
        this.searchedPokemon.defaultSprite =
          this.searchedPokeData?.sprites?.front_default;
        this.searchedPokemon.shinySprite =
          this?.searchedPokeData?.sprites?.front_shiny;
        this.searchedPokemon.types = this.searchedPokeData.types.map(
          (x: any) => x.type.name
        );
        this.searchedPokemon.description = this.searchedPokeData?.description;
      })
    );
  }

  getDescription(id: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  }

  addPokemon(pokemon: Pokemon) {
    console.log(pokemon);
    this.pokeList.unshift({ ...pokemon }); // had to spread the object out within the method in order to get this to work right
    // It seems that when this function runs, and the 'list' tab is on the 'caught-detail' page of a pokemon, that page will jump to show the details of the next pokemon after.
  }

  removePokemon(index: number) {
    console.log(`The selected index is ${index}, but nothing happened.`)
    // this.pokeService.pokeList = this.pokeService.pokeList.splice(index, 0)
    // ^^^ This doesn't wanna work :(

  }
}
