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

  }

  onSubmit() {
   
  }

  ngOnInit() {}
}
