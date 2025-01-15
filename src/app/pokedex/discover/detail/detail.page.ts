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
  public pokemon!: Pokemon;
  public pokemonAdded = false;
  @ViewChild('content', { read: ElementRef, static: true })
  private content!: ElementRef; // this is getting the element we want to animate by the local ref #content

  constructor(
    private pokeService: PokedexService,
    private animationCtrl: AnimationController
  ) {}

  public ngOnInit() {
    this.pokemon = this.pokeService.currentPokemon;
  }

  ionViewWillEnter() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.content.nativeElement)
      .duration(500)
      .fromTo('opacity', 0, 1);
    animation.play();
  }

  public catch() {
    console.log('Just caught ' + this.pokemon.name);
    this.pokeService.addPokemon(this.pokemon);
    this.pokemonAdded = true;
  }
}
