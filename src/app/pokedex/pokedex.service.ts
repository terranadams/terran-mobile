import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {
  pokeData!: any;
  constructor(private http: HttpClient) { }

  fetchMeSomething() {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1008) + 1}`).pipe(tap(resData => {
      this.pokeData = resData
      console.log('From Service: ')
      console.log(resData)
    }))
  }
}
// make a subject
