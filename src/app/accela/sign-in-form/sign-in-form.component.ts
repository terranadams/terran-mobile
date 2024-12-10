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
  errorMessage: string = '';

  constructor(private accelaService: AccelaService) {}

  fetchEnvironments() {
    if (!this.agencyName.trim()) {
      this.errorMessage = 'Please enter a valid Agency Name';
      return;
    }

    this.accelaService.getEnvironments(this.agencyName).subscribe({
      next: (data) => {
        this.environments = data;
        this.errorMessage = '';
        console.log('Environments:', data);
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch environments. Please check the Agency Name.';
        console.error('Error fetching environments:', err);
      },
    });
  }

  onSubmit() {
    this.fetchEnvironments()
    console.log('Submitted:', {
      agencyName: this.agencyName,
      username: this.username,
      password: this.password,
      environments: this.environments
    });
  }

  ngOnInit() {}
}

