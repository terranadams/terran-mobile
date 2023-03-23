import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  onLogout() {
    console.log('your mom');
  }
  constructor(
    private router: Router,
    private screenOrientation: ScreenOrientation
  ) {}

  ngOnInit() {
    // this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    // this.screenOrientation.lock('portrait');
    window.screen.orientation.lock('portrait');
  }

  toHome() {
    this.router.navigateByUrl('', { replaceUrl: true });
  }

  toPokedex() {
    this.router.navigateByUrl('/pokedex/discover', { replaceUrl: true });
  }

  toWatchgenerator() {
    this.router.navigateByUrl('/watchgenerator', { replaceUrl: true });
  }

  toMnist() {
    this.router.navigateByUrl('/mnist', { replaceUrl: true });
  }
}
