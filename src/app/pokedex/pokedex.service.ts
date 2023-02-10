import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  constructor(private http: HttpClient) { }

  fetchMeSomething() {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1008) + 1}`)
  }
}
