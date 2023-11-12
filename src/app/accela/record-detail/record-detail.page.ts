import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccelaService } from '../accela.service';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.page.html',
  styleUrls: ['./record-detail.page.scss'],
})
export class RecordDetailPage implements OnInit {
  urlValue!: any;
  record!: any;

  constructor(
    private route: ActivatedRoute,
    public accelaService: AccelaService
  ) {}

  inspectionsLoading: boolean = true;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.urlValue = paramMap.get('record-detail');
      this.record = this.accelaService.recordsArray.filter(record => record.value === this.urlValue)[0]
      // console.log(this.record)
    });

    this.accelaService.getRecordInspections(this.record.value).subscribe(response => {
      console.log(response)
      this.inspectionsLoading = false
    })
  }
}
