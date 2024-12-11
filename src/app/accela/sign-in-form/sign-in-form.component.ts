import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  @Output() recordsFetched = new EventEmitter<void>();

  onFetchRecords() {
    // Simulate a successful API call
    this.recordsFetched.emit();
  }


  constructor(private accelaService: AccelaService, private loadingController: LoadingController) {}

  ngOnInit() {}

  public getEnvironments() {
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

  public async onSubmit() {
    if (!this.isFormValid()) {
      this.errorMessage = 'All fields are required!';
      return;
    }

    try {
      await this.getAccessToken();
      await this.getMyRecords();
    } catch (err) {
      console.error('Error during submission:', err);
      this.errorMessage = 'An error occurred during submission. Please try again.';
    }
  }

  private async getAccessToken() {
    const loading = await this.loadingController.create({
      message: 'Getting Access Token...',
    });
    await loading.present();

    return new Promise<void>((resolve, reject) => {
      this.accelaService
        .getAccessToken(this.username, this.password, this.agencyName, this.selectedEnvironment)
        .subscribe({
          next: async (response) => {
            // console.log('Access Token Response:', response);
            this.accelaService.setAccessToken(response.access_token);
            await loading.dismiss();
            resolve();
          },
          error: async (err) => {
            console.error('Failed to get access token:', err);
            this.errorMessage = 'Invalid credentials or request failed.';
            await loading.dismiss();
            reject(err);
          },
        });
    });
  }

  private async getMyRecords() {
    const loading = await this.loadingController.create({
      message: 'Fetching Records...',
    });
    await loading.present();

    return new Promise<void>((resolve, reject) => {
      this.accelaService.getMyRecords().subscribe({
        next: async (records) => {
          // console.log('My Records:', records);
          await loading.dismiss();
          this.recordsFetched.emit();
          resolve();
        },
        error: async (err) => {
          console.error('Failed to fetch records:', err);
          this.errorMessage = 'Failed to fetch your records. Please try again.';
          await loading.dismiss();
          reject(err);
        },
      });
    });
  }

  public onAgencyNameChange() {
    this.isEnvironmentsFetched = false;
    this.isUsernamePasswordVisible = false;
    this.selectedEnvironment = '';
  }

  public toggleSubmitButton() {
    if (this.isEnvironmentsFetched) {
      this.isUsernamePasswordVisible = true;
    }
  }

  public isFormValid() {
    return (
      this.agencyName.trim() !== '' &&
      this.username.trim() !== '' &&
      this.password.trim() !== '' &&
      this.selectedEnvironment.trim() !== ''
    );
  }
}
