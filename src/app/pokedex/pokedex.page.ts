import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs, NavController } from '@ionic/angular';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.page.html',
  styleUrls: ['./pokedex.page.scss'],
})
export class PokedexPage implements OnInit {

  @ViewChild('myTabs', { static: false }) myTabs!: IonTabs;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  tabChanged() {
    var currentTab = this.myTabs.getSelected();
    this.navCtrl.navigateRoot('pokedex/' + currentTab);
  }
}
