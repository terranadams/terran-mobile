import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { PokedexService } from '../pokedex.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  constructor(
    private pokeService: PokedexService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  method = 'random';
  pokeData!: any;
  pokemon: Pokemon = {
    id: 0,
    name: '',
    defaultSprite: '',
    shinySprite: '',
    types: [],
    description: '',
  };
  newPokemon() {
    this.loadingCtrl.create({ message: 'Generating...' }).then((loadingEl) => {
      loadingEl.present();
      this.pokeService.fetchMeSomething().subscribe((resData) => {
        this.pokeData = resData;
        // console.log(this.pokeData);
        this.pokemon.id = this.pokeData.id;
        this.pokemon.name =
          this.pokeData.name.charAt(0).toUpperCase() +
          this.pokeData.name.slice(1);
        this.pokemon.defaultSprite = this.pokeData?.sprites?.front_default;
        this.pokemon.shinySprite = this?.pokeData?.sprites?.front_shiny;
        this.pokemon.types = this.pokeData.types.map((x: any) => x.type.name);
        this.pokemon.description = this.pokeData?.description;
        // console.log(this.pokemon)
        loadingEl.dismiss()
      });
    });
  }

  methodToggle(event: any) {
    // console.log(event.detail.value)
    this.method = event.detail.value;
  }

  onSubmit(f: NgForm) {
    console.log(f.form.value)
  }
}
