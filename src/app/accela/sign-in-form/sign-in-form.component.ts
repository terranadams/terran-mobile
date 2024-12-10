import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
})
export class SignInFormComponent implements OnInit {
  agencyName: string = '';
  username: string = '';
  password: string = '';

  onSubmit() {
    console.log('Form Submitted:', {
      agencyName: this.agencyName,
      username: this.username,
      password: this.password,
    });
  }

  constructor() {}

  ngOnInit() {}
}
