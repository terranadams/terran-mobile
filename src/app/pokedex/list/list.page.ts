import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { PokedexService } from '../pokedex.service';
import { Pokemon } from '../models';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public pokeList!: Pokemon[];

  @ViewChild('content', { read: ElementRef, static: true })
  private content!: ElementRef; // this is getting the element we want to animate by the local ref #content

  constructor(
    private pokeService: PokedexService,
    private animationCtrl: AnimationController
  ) {}

  public ngOnInit() {
    this.pokeList = this.pokeService.pokeList;
    // const animation = this.animationCtrl
    //   .create()
    //   .addElement(this.content.nativeElement)
    //   .duration(200)
    //   .fromTo('opacity', 0, 1);
    // animation.play();
  }

  ionViewWillEnter() {
    this.pokeList = this.pokeService.pokeList;
    const animation = this.animationCtrl
      .create()
      .addElement(this.content.nativeElement)
      .duration(200)
      .fromTo('opacity', 0, 1);
    animation.play();
  }
}
