import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flashcards',
  templateUrl: './flashcards.page.html',
  styleUrls: ['./flashcards.page.scss']
})
export class FlashcardsPage {
  email = '';
  password = '';
  isRegistering = false;
  isLoading = false;
  message = '';

  constructor(private auth: AuthService, private router: Router) { }

  @ViewChild('authForm') authForm?: NgForm;

  ionViewWillEnter(): void {
    this.isRegistering = false;
    this.message = '';
    this.password = '';
    this.authForm?.resetForm({
      email: this.email,
      password: ''
    });
  }

  toggleMode() { // Switches between login and registration.
    this.isRegistering = !this.isRegistering; // Flips the current mode.
    this.password = '';
    this.message = '';
  }

  submit() {
    if (this.isLoading) return; // Ignores duplicate submissions.

    this.isLoading = true; // Marks the request as running.
    this.message = ''; // Clears previous feedback.

    const onError = (error: HttpErrorResponse) => { // Handles failed requests.
      this.isLoading = false; // Re-enables the form.
      const errors = error.error?.errors; // Reads Identity's validation messages.

      this.message = error.status === 0
        ? 'Cannot reach the API. Check that it is running and CORS is configured.'
        : errors
          ? Object.values(errors)
            .map(messages => (messages as string[]).join(' ')) // Joins messages within each group.
            .join(' ') // Combines all groups into one string.
          : 'Request failed. Check your email and password.';
    };

    if (this.isRegistering) { // Handles account creation.
      this.auth.register(this.email.trim(), this.password).subscribe({
        next: () => { // Runs after successful registration.
          this.isLoading = false; // Re-enables the form.
          this.isRegistering = false; // Switches to sign-in mode.
          this.password = ''; // Clears the submitted password.
          this.message = 'Account created! You can now sign in.'; // Confirms success.
        },
        error: onError // Displays registration errors.
      });
    } else { // Handles login.
      this.auth.login(this.email.trim(), this.password).subscribe({
        next: () => {
          this.isLoading = false;
          this.password = '';
          this.message = 'Signed in successfully!';
          this.router.navigate(['/flashcards/decks']);
        },
        error: onError
      });
    }
  }

  signInAsGuest(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.message = '';

    this.auth.signInAsGuest().subscribe({
      next: () => {
        this.isLoading = false;
        this.password = '';
        this.router.navigate(['/flashcards/decks']);
      },
      error: () => {
        this.isLoading = false;
        this.message = 'Guest sign-in is unavailable. Please try again.';
      }
    });
  }
}