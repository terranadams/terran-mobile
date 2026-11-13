import { Component, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-theme-toggle',
  template: `
  <ion-icon name="moon-outline" aria-hidden="true"></ion-icon>
    <ion-toggle
      aria-label="Dark mode"
      color="primary"
      [checked]="darkMode"
      (ionChange)="setDarkMode($any($event).detail.checked)">
    </ion-toggle>
  `,
  styles: [`
    :host {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    ion-icon {
      font-size: 20px;
    }
  `]
})
export class ThemeToggleComponent {
  get darkMode(): boolean {
    return document.documentElement.classList.contains('theme-dark');
  }

  setDarkMode(enabled: boolean): void {
    document.documentElement.classList.toggle('theme-dark', enabled);
    localStorage.setItem('app-theme', enabled ? 'dark' : 'light');
  }
}

@NgModule({
  imports: [IonicModule],
  declarations: [ThemeToggleComponent],
  exports: [ThemeToggleComponent]
})
export class ThemeToggleModule { }