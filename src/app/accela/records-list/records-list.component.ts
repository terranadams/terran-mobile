import { Component, OnInit } from '@angular/core';
import { AccelaService } from '../accela.service';
import { RecordItem } from '../models';

@Component({
  selector: 'app-records-list',
  templateUrl: './records-list.component.html',
  styleUrls: ['./records-list.component.scss'],
})
export class RecordsListComponent implements OnInit {

  public records: RecordItem[] = [];

  constructor(private accelaService: AccelaService) { }

  public ngOnInit() {
    this.accelaService.getMyRecords().subscribe((data) => {
      this.records = data;
    });
  }

}
