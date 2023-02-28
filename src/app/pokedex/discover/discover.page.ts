import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { PokedexService } from '../pokedex.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-search',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  constructor(
    private pokeService: PokedexService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}
  inputValue: string = 'Charizard'
  method = 'random';
  randomPokeData!: any;
  searchedPokeData: any;
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
  newPokemon() {
    this.loadingCtrl.create({ message: 'Generating...' }).then((loadingEl) => {
      loadingEl.present();
      this.pokeService.fetchMeSomething().subscribe((resData) => {
        this.randomPokeData = resData;
        // console.log(this.randomPokeData);
        this.randomPokemon.id = this.randomPokeData.id;
        this.randomPokemon.name =
          this.randomPokeData.name.charAt(0).toUpperCase() +
          this.randomPokeData.name.slice(1);
        this.randomPokemon.defaultSprite = this.randomPokeData?.sprites?.front_default;
        this.randomPokemon.shinySprite = this?.randomPokeData?.sprites?.front_shiny;
        this.randomPokemon.types = this.randomPokeData.types.map((x: any) => x.type.name);
        this.randomPokemon.description = this.pokeService._randomPokemon.description
        // console.log(this.randomPokemon)
        loadingEl.dismiss()
      });
    });
  }

  methodToggle(event: any) {
    // console.log(event.detail.value)
    this.method = event.detail.value;
    this.pokeService.changeMethod(event.detail.value)
  }

  onSubmit(f: NgForm) {
    // console.log(f.form.value.name)
    this.loadingCtrl.create({message: 'Generating...', duration: 2000}).then(loadingEl => {
      loadingEl.present()
      this.pokeService.fetchSpecificPokemon(f.form.value.name.toLowerCase()).subscribe(resData => {
        this.searchedPokeData = resData
        // console.log(this.searchedPokeData)
        this.searchedPokemon.id = this.searchedPokeData.id;
        this.searchedPokemon.name =
          this.searchedPokeData.name.charAt(0).toUpperCase() +
          this.searchedPokeData.name.slice(1);
        this.searchedPokemon.defaultSprite = this.searchedPokeData?.sprites?.front_default;
        this.searchedPokemon.shinySprite = this?.searchedPokeData?.sprites?.front_shiny;
        this.searchedPokemon.types = this.searchedPokeData.types.map((x: any) => x.type.name);
        this.searchedPokemon.description = this.pokeService._searchedPokemon.description;
        loadingEl.dismiss()
      })
    })
  }
}
