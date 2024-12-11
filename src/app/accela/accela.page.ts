import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accela',
  templateUrl: './accela.page.html',
  styleUrls: ['./accela.page.scss'],
})
export class AccelaPage implements OnInit {

  showRecordsList: boolean = false;

  onRecordsFetched() {
    this.showRecordsList = true;
  }

  constructor() { }

  ngOnInit() {
  }

}
