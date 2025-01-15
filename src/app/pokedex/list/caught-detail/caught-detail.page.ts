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
  public pokemon!: Pokemon;
  private pokeIndex!: any;
  @ViewChild('content', { read: ElementRef, static: true })
  private content!: ElementRef; // this is getting the element we want to animate by the local ref #content

  constructor(
    private route: ActivatedRoute,
    private pokeService: PokedexService,
    private navCtrl: NavController,
    private animationCtrl: AnimationController
  ) {}

  public ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      // console.log(paramMap.get('pokeIndex'))
      this.pokeIndex = paramMap.get('pokeIndex');
      this.pokemon = this.pokeService.pokeList[this.pokeIndex];
    });

    const animation = this.animationCtrl
      .create()
      .addElement(this.content.nativeElement)
      .duration(500)
      .fromTo('opacity', 0, 1);
    animation.play();
  }

}
