import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
})
export class AccountSettingsPage {
  mode: 'email' | 'password' | null = null;
  value = '';
  busy = false;
  message = '';

  constructor(
    private auth: AuthService,
    private alerts: AlertController,
    private router: Router
  ) { }

  openForm(mode: 'email' | 'password' | null): void {
    this.mode = mode;
    this.value = '';
    this.message = '';
  }

  async saveChange(): Promise<void> {
    const mode = this.mode;
    const value = mode === 'email' ? this.value.trim() : this.value;
    if (!mode || !value.trim() || this.busy) return;

    const alert = await this.alerts.create({
      header: 'Confirm your password',
      inputs: [
        { name: 'currentPassword', type: 'password', placeholder: 'Current password' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Save',
          handler: ({ currentPassword }) => {
            if (!currentPassword) return false;

            this.busy = true;
            this.message = '';

            this.auth.updateAccount(mode, value, currentPassword).subscribe({
              next: () => this.returnToLogin(),
              error: error => this.showError(error, 'Could not update your account.')
            });
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmDelete(): Promise<void> {
    if (this.busy) return;

    const alert = await this.alerts.create({
      header: 'Delete your account?',
      message: 'This permanently deletes your account, decks, and cards.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete Account',
          role: 'destructive',
          handler: () => {
            this.busy = true;
            this.message = '';

            this.auth.deleteAccount().subscribe({
              next: () => this.returnToLogin(),
              error: error => this.showError(error, 'Could not delete your account.')
            });
          }
        }
      ]
    });

    await alert.present();
  }

  private returnToLogin(): void {
    this.busy = false;
    this.openForm(null);
    this.auth.signOut();
    void this.router.navigate(['/flashcards'], { replaceUrl: true });
  }

  private showError(error: any, fallback: string): void {
    this.busy = false;

    if (error.status === 401) {
      this.returnToLogin();
      return;
    }

    this.message = error.status === 403
      ? 'Account settings are unavailable for the shared guest account.'
      : error.error?.message || fallback;
  }

}
