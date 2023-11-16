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
  inspectionsArray: any[] = [];
  inspectionsLoading: boolean = true;
  documentsArray: any[] = []
  documentsLoading: boolean = false

  constructor(
    private route: ActivatedRoute,
    public accelaService: AccelaService
  ) {}


  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.urlValue = paramMap.get('record-detail');
      this.record = this.accelaService.recordsArray.filter(
        (record) => record.value === this.urlValue
      )[0];
      // console.log(this.record)
    });

    this.accelaService.getRecordInspections(this.record.value).subscribe(
      (response) => {
        if (response && response.result && response.result.length > 0) {
          // Map through inspections and store relevant properties in inspectionsArray
          this.inspectionsArray = response.result.map((inspection: any) => ({
            id: inspection.id,
            status: inspection.status.value[0],
            type: inspection.type ? inspection.type.value : 'N/A', // Handle case where type is not present
          }));

          console.log(this.inspectionsArray);
        } else {
          console.log('No inspections found.');
        }
        this.inspectionsLoading = false;
      },
      (error) => { // this thing here is a second argument passed to the subscribe function, used for handling errors
        console.error('Error fetching inspections:', error);
        this.inspectionsLoading = false;
      }
    );
  }
}
