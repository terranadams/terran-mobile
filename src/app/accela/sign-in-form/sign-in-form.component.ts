import { Component, OnInit } from '@angular/core';
import { AccelaService } from '../accela.service';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  agencyName: string = '';
  username: string = '';
  password: string = '';
  environments: any[] = [];
  selectedEnvironment: string = '';
  errorMessage: string = '';
  isAgencySubmitted: boolean = false;
  isAgencyNameSubmitted: boolean = false;
  isEnvironmentsFetched: boolean = false;
  isUsernamePasswordVisible: boolean = false;


  constructor(private accelaService: AccelaService, private loadingController: LoadingController) {}

  ngOnInit() {}

  getEnvironments() {
    if (!this.agencyName.trim()) {
      this.errorMessage = 'Please enter a valid Agency Name';
      return;
    }

    this.accelaService.getEnvironments(this.agencyName).subscribe({
      next: (data: string[]) => {
        if (data.length > 0) {
          this.environments = data;
          this.errorMessage = '';
          this.isEnvironmentsFetched = true;
        } else {
          this.errorMessage = 'No environments found for this Agency Name.';
          this.isEnvironmentsFetched = false;
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch environments. Please check the Agency Name.';
        console.error('Error fetching environments:', err);
        this.isEnvironmentsFetched = false;
      },
    });
  }

  async onSubmit() {
    if (!this.agencyName || !this.username || !this.password || !this.selectedEnvironment) {
      this.errorMessage = 'All fields are required!';
      return;
    }

    // Show the loader
    const loading = await this.loadingController.create({
      message: 'Getting Access Token...',
    });
    await loading.present();

    this.accelaService
      .getAccessToken(this.username, this.password, this.agencyName, this.selectedEnvironment)
      .subscribe({
        next: async (response) => {
          console.log('Access Token Response:', response);
          await loading.dismiss(); // Dismiss the loader on success
          // Handle success, e.g., save token or navigate to a new page
        },
        error: async (err) => {
          console.error('Failed to get access token:', err);
          this.errorMessage = 'Invalid credentials or request failed.';
          await loading.dismiss(); // Dismiss the loader on error
        },
      });
  }


  // This method will be called when the agency name changes
  onAgencyNameChange() {
    this.isEnvironmentsFetched = false; // Hide environments and form fields
    this.isUsernamePasswordVisible = false;
    this.selectedEnvironment = '';
  }

  // This method will handle the visibility of the "Submit" button
  toggleSubmitButton() {
    if (this.isEnvironmentsFetched) {
      this.isUsernamePasswordVisible = true;
    }
  }

  // This method checks if all fields are filled and whether the Submit button should be enabled
  isFormValid() {
    return (
      this.agencyName.trim() !== '' &&
      this.username.trim() !== '' &&
      this.password.trim() !== '' &&
      this.selectedEnvironment.trim() !== ''
    );
  }

}

