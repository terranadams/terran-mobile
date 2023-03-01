import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PokedexService } from '../../pokedex.service';
import { Pokemon } from '../../pokemon';

@Component({
  selector: 'app-caught-detail',
  templateUrl: './caught-detail.page.html',
  styleUrls: ['./caught-detail.page.scss'],
})
export class CaughtDetailPage implements OnInit {
  pokemon!: Pokemon
  pokeIndex!: any


  constructor(private route: ActivatedRoute, private pokeService: PokedexService, private navCtrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      // console.log(paramMap.get('pokeIndex'))
      this.pokeIndex = paramMap.get('pokeIndex')
      this.pokemon = this.pokeService.pokeList[this.pokeIndex]
    })
  }



  release() {
    this.pokeService.removePokemon(this.pokeIndex)
    this.navCtrl.navigateBack('/pokedex/list')
  }

}
