import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Pokemon } from './models';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private method = 'random';
  private randomPokeData!: any;
  private searchedPokeData!: any;
  public randomPokemon: Pokemon = {
    id: 0,
    name: '',
    defaultSprite: '',
    shinySprite: '',
    types: [],
    description: '',
  };
  public searchedPokemon: Pokemon = {
    id: 0,
    name: '',
    defaultSprite: '',
    shinySprite: '',
    types: [],
    description: '',
  };
  private descData!: any;
  private randomFilteredFlavors!: any[];
  private searchedFilteredFlavors!: any[];

  public pokeList: Pokemon[] = [];
  constructor(private http: HttpClient) {}

  public get currentPokemon() {
    if (this.method === 'random') return this.randomPokemon;
    else return this.searchedPokemon;
  }

  public changeMethod(method: string) {
    this.method = method;
  }

  public fetchMeSomething() {
    return this.http
      .get(
        `https://pokeapi.co/api/v2/pokemon/${
          Math.floor(Math.random() * 1025) + 1
        }`
      )
      .pipe(
        tap((resData) => {
          this.randomPokeData = resData;

          this.getDescription(this.randomPokeData.id).subscribe((resData) => {
            this.descData = resData;
            this.randomFilteredFlavors =
              this.descData.flavor_text_entries.filter(
                (entry: any) => entry.language.name === 'en'
              );
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
        })
      );
  }

  public fetchSpecificPokemon(name: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${name}`).pipe(
      tap((resData) => {
        this.searchedPokeData = resData;
        this.getDescription(this.searchedPokeData.id).subscribe((resData) => {
          this.descData = resData;
          this.searchedFilteredFlavors =
            this.descData.flavor_text_entries.filter(
              (entry: any) => entry.language.name === 'en'
            );
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

  private getDescription(id: string) {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  }

  public addPokemon(pokemon: Pokemon) {
    console.log(pokemon);
    this.pokeList.unshift({ ...pokemon });
  }

  public extractPokemonData(apiData: any): Pokemon {
    return {
      id: apiData.id,
      name: apiData.name.charAt(0).toUpperCase() + apiData.name.slice(1),
      defaultSprite: apiData?.sprites?.front_default,
      shinySprite: apiData?.sprites?.front_shiny,
      types: apiData.types.map((x: any) => x.type.name),
      description: this.getPokemonDescription(apiData),
    };
  }

  private getPokemonDescription(apiData: any): string {
    return (
      apiData?.flavor_text_entries?.find(
        (entry: any) => entry.language.name === 'en'
      )?.flavor_text || 'No description available.'
    );
  }
}
