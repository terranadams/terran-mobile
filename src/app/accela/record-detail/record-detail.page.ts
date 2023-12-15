import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccelaService } from '../accela.service';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';

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
  documentsArray: any[] = [];
  documentsLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    public accelaService: AccelaService,
    public actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      this.urlValue = paramMap.get('record-detail');
      this.record = this.accelaService.recordsArray.filter(
        (record) => record.value === this.urlValue
      )[0];
    });

    // Use forkJoin to run both API calls simultaneously
    forkJoin([
      this.accelaService.getRecordInspections(this.record.value),
      this.accelaService.getRecordDocuments(this.record.value),
    ]).subscribe(
      ([inspectionsResponse, documentsResponse]) => {
        // Handle inspections response
        if (
          inspectionsResponse &&
          inspectionsResponse.result &&
          inspectionsResponse.result.length > 0
        ) {
          this.inspectionsArray = inspectionsResponse.result.map(
            (inspection: any) => ({
              id: inspection.id,
              status: inspection.status.value[0],
              type: inspection.type ? inspection.type.value : 'N/A',
            })
          );
          // console.log(this.inspectionsArray);
        } else {
          console.log('No inspections found.');
        }
        this.inspectionsLoading = false;

        // Handle documents response
        if (
          documentsResponse &&
          documentsResponse.result &&
          documentsResponse.result.length > 0
        ) {
          console.log('documents', documentsResponse);
          // Map through documents and store relevant properties in documentsArray
          this.documentsArray = documentsResponse.result.map(
            (document: any) => ({
              id: document.id,
              fileName: document.fileName,
              // Add other properties as needed
            })
          );
          // console.log(this.documentsArray);
        } else {
          console.log('No documents found.');
        }
        this.documentsLoading = false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.inspectionsLoading = false;
        this.documentsLoading = false;
      }
    );
  }

  public actionSheetButtons = [
    {
      text: 'Download',
      role: 'download',
      data: {
        action: 'download',
      },
    },
    {
      text: 'View',
      role: 'view',
      data: {
        action: 'view',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  async presentActionSheet(specifiedDocument: any) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Download',
          role: 'download',
          handler: async () => {
            this.downloadDocument(specifiedDocument);

            // // DOWNLOADING FROM THE BROWSER
            // this.accelaService
            //   .downloadDocument(specifiedDocument)
            //   .subscribe((response) => {
            //     // I'll need to make conditionals for all the different types, only images currently work (application/pdf image/x-png)
            //     const blob = new Blob([response], { type: 'image/x-png' }); // Adjust the type based on your document type
            //     console.log(blob);
            //     const link = document.createElement('a'); // This line creates an anchor element (<a>) in the global document scope.
            //     link.href = window.URL.createObjectURL(blob);
            //     link.download = specifiedDocument.fileName;
            //     link.click();
            //   });

          },
        },
        {
          text: 'View',
          role: 'view',
          handler: () => {
            this.viewDocument(specifiedDocument);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          },
        },
      ],
    });
    await actionSheet.present();
  }

  downloadDocument(specifiedDocument: any) {
    this.accelaService.obtainDocumentBlob(specifiedDocument).subscribe(
      (blob) => {
        console.log(blob)
      },
      (error) => {
        console.error('Error downloading document', error);
      }
    );
  }


  private viewDocument(specifiedDocument: any) {
    console.log('Viewing document');
    // Add your logic to view the document within the application
    // This is where you might want to use a different viewer based on the document type
  }
}
