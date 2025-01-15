import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accela',
  templateUrl: './accela.page.html',
  styleUrls: ['./accela.page.scss'],
})
export class AccelaPage implements OnInit {

  public showRecordsList: boolean = false;

  public onRecordsFetched() {
    this.showRecordsList = true;
  }

  public ngOnInit() {}
}
