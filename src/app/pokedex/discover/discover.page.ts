import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AnimationController } from '@ionic/angular';
import { PokedexService } from '../pokedex.service';
import { Pokemon } from '../models';

@Component({
  selector: 'app-search',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  constructor(
    private pokeService: PokedexService,
    private loadingCtrl: LoadingController,
    private animationCtrl: AnimationController
  ) {}

  public ngOnInit() {}

  ionViewWillEnter() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.content.nativeElement)
      .duration(300)
      .fromTo('opacity', 0, 1);
    animation.play();
  }

  public inputValue: string = 'Charizard';
  public method = 'random';
  private randomPokeData!: any;
  private searchedPokeData: any;
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

  @ViewChild('content', { read: ElementRef, static: true })
  private content!: ElementRef; // this is getting the element we want to animate by the local ref #content

  public methodToggle(event: any) {
    this.method = event.detail.value;
    this.pokeService.changeMethod(event.detail.value);
  }
  
  public newPokemon() {
    this.loadingCtrl.create({ message: 'Generating...' }).then((loadingEl) => {
      loadingEl.present();
      this.pokeService.fetchMeSomething().subscribe((resData) => {
        this.randomPokeData = resData;
        // console.log(this.randomPokeData);
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
        this.randomPokemon.description =
          this.pokeService.randomPokemon.description;
        loadingEl.dismiss();
      });
    });
  }



  public onSubmit(f: NgForm) {
    this.loadingCtrl
      .create({ message: 'Generating...', duration: 2000 })
      .then((loadingEl) => {
        loadingEl.present();
        this.pokeService
          .fetchSpecificPokemon(f.form.value.name.toLowerCase())
          .subscribe((resData) => {
            this.searchedPokeData = resData;
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
            this.searchedPokemon.description =
              this.pokeService.searchedPokemon.description;
            this.inputValue = '';
            loadingEl.dismiss();
          });
      });
  }

}
