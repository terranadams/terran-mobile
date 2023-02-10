import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../pokedex.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  currentPokemon!: any;
  name!: string;

  constructor(private pokeService: PokedexService) {}

  ngOnInit() {}

  newPokemon() {
    this.pokeService.fetchMeSomething().subscribe((resData) => {
      this.currentPokemon = resData;
      console.log(this.currentPokemon);
      this.name = this.currentPokemon.name.charAt(0).toUpperCase() + this.currentPokemon.name.slice(1)
    });
  }
  // ionViewWillEnter() {
  //   // this makes it so this runs every time the component shows up, instead of when it loads for just the first time
  //   this.pokeService.fetchMeSomething().subscribe((resData) => {
  //     this.currentPokemon = resData;
  //     console.log(resData)
  //     // this.name = resData.name
  //   });
}
