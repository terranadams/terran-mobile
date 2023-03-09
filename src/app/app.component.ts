import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  onLogout() {
    console.log('your mom');
  }
  constructor(private router: Router) {}

  toHome() {
    this.router.navigateByUrl('', { replaceUrl: true });
  }

  toPokedex() {
    this.router.navigateByUrl('/pokedex/discover', { replaceUrl: true });
  }

  toWatchgenerator() {
    this.router.navigateByUrl('/watchgenerator', { replaceUrl: true });
  }
}
