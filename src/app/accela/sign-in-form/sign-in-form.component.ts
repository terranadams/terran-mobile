import { Component, OnInit } from '@angular/core';
import { AccelaService } from '../accela.service';

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


  constructor(private accelaService: AccelaService) {}

  onAgencyNameChange() {
    this.isAgencySubmitted = false;
  }

  fetchEnvironments() {
    if (!this.agencyName.trim()) {
      this.errorMessage = 'Please enter a valid Agency Name';
      return;
    }

    this.accelaService.getEnvironments(this.agencyName).subscribe({
      next: (data: string[]) => {
        if (data.length > 0) {
          this.environments = data;
          this.errorMessage = '';
        } else {
          this.errorMessage = 'No environments found for this Agency Name.';
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch environments. Please check the Agency Name.';
        console.error('Error fetching environments:', err);
      },
    });
  }

  onSubmit() {
    this.isAgencySubmitted = true;
    this.fetchEnvironments()
  }

  ngOnInit() {}
}

