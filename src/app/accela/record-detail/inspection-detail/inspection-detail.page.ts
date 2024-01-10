import { Component, OnInit } from '@angular/core';
import { AccelaService } from '../../accela.service';

@Component({
  selector: 'app-inspection-detail',
  templateUrl: './inspection-detail.page.html',
  styleUrls: ['./inspection-detail.page.scss'],
})
export class InspectionDetailPage implements OnInit {
  constructor(public accelaService: AccelaService) {}

  inspectionData!: any

  ngOnInit() {
    this.inspectionData = this.accelaService.getSelectedInspection()
    console.log(this.inspectionData)
  }
}
