import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController, NavController } from '@ionic/angular';
import { PokedexService } from '../../pokedex.service';
import { Pokemon } from '../../models';

@Component({
  selector: 'app-caught-detail',
  templateUrl: './caught-detail.page.html',
  styleUrls: ['./caught-detail.page.scss'],
})
export class CaughtDetailPage implements OnInit {
  pokemon!: Pokemon;
  pokeIndex!: any;
  @ViewChild('content', { read: ElementRef, static: true })
  content!: ElementRef; // this is getting the element we want to animate by the local ref #content

  constructor(
    private route: ActivatedRoute,
    private pokeService: PokedexService,
    private navCtrl: NavController,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      // console.log(paramMap.get('pokeIndex'))
      this.pokeIndex = paramMap.get('pokeIndex');
      this.pokemon = this.pokeService.pokeList[this.pokeIndex];
    });
  }

  release() {
    this.pokeService.removePokemon(this.pokeIndex);
    this.navCtrl.navigateBack('/pokedex/list');
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
