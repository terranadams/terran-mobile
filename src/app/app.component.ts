import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

// remember the capacitor.config.ts file is where I copy my app to iOS
export class AppComponent {
  onLogout() {
    console.log('loggin\' out');
  }
  constructor(
    private router: Router,
  ) {}

  ngOnInit() {

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

  toAccela() {
    this.router.navigateByUrl('/accela', { replaceUrl: true })
  }
}
