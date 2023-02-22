import { Component, OnInit } from '@angular/core';
import { PokedexService } from '../pokedex.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  pokeList!: Pokemon[]

  constructor(private pokeService: PokedexService) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.pokeList = this.pokeService.pokeList
  }

}
