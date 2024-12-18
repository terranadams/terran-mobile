import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { PokedexService } from '../../pokedex.service';
import { Pokemon } from '../../models';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  pokemon!: Pokemon;
  pokemonAdded = false;
  @ViewChild('content', { read: ElementRef, static: true })
  content!: ElementRef; // this is getting the element we want to animate by the local ref #content

  constructor(
    private pokeService: PokedexService,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    this.pokemon = this.pokeService.currentPokemon;
  }

  catch() {
    console.log('Just caught ' + this.pokemon.name);
    this.pokeService.addPokemon(this.pokemon);
    this.pokemonAdded = true;
  }

  ionViewWillEnter() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.content.nativeElement)
      .duration(500)
      .fromTo('opacity', 0, 1);
    animation.play();
  }
}
