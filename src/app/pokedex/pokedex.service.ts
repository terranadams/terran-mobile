import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  Pokemon,
  PokemonApiResponse,
  PokemonSpeciesApiResponse,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class PokedexService {
  private method = 'random';
  public randomPokemon: Pokemon = this.initializePokemon();
  public searchedPokemon: Pokemon = this.initializePokemon();
  public pokeList: Pokemon[] = [];

  constructor(private http: HttpClient) {}

  get currentPokemon(): Pokemon {
    return this.method === 'random' ? this.randomPokemon : this.searchedPokemon;
  }

  changeMethod(method: string): void {
    this.method = method;
  }

  fetchMeSomething(): Observable<PokemonApiResponse> {
    const id = Math.floor(Math.random() * 1025) + 1;
    return this.http
      .get<PokemonApiResponse>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(
        tap((resData) => {
          this.randomPokemon = this.extractPokemonData(resData);
          this.fetchDescription(resData.id).subscribe((descData) => {
            this.randomPokemon.description = this.extractDescription(descData);
          });
        })
      );
  }

  fetchSpecificPokemon(name: string): Observable<PokemonApiResponse> {
    return this.http
      .get<PokemonApiResponse>(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .pipe(
        tap((resData) => {
          this.searchedPokemon = this.extractPokemonData(resData);
          this.fetchDescription(resData.id).subscribe((descData) => {
            this.searchedPokemon.description =
              this.extractDescription(descData);
          });
        })
      );
  }

  private fetchDescription(id: number): Observable<PokemonSpeciesApiResponse> {
    return this.http.get<PokemonSpeciesApiResponse>(
      `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    );
  }

  addPokemon(pokemon: Pokemon): void {
    this.pokeList.unshift({ ...pokemon });
  }

  public extractPokemonData(apiData: PokemonApiResponse): Pokemon {
    return {
      id: apiData.id,
      name: this.capitalize(apiData.name),
      defaultSprite: apiData.sprites.front_default,
      shinySprite: apiData.sprites.front_shiny,
      types: apiData.types.map((typeInfo) => typeInfo.type.name),
      description: 'Loading description...', // Placeholder until fetched
    };
  }

  private extractDescription(apiData: PokemonSpeciesApiResponse): string {
    return (
      apiData.flavor_text_entries.find((entry) => entry.language.name === 'en')
        ?.flavor_text || 'No description available.'
    );
  }

  private initializePokemon(): Pokemon {
    return {
      id: 0,
      name: '',
      defaultSprite: '',
      shinySprite: '',
      types: [],
      description: '',
    };
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
