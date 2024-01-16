import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccelaService } from '../accela.service';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

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
  commentsArray: any[] = []
  commentsLoading: boolean = true;
  imageBlobUrl!: string;
  selectedDocumentImageBlobUrl: string | null = null;

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
          console.log("inspections",inspectionsResponse)
          this.inspectionsArray = inspectionsResponse.result.map(
            (inspection: any) => ({
              address: inspection.address,
              id: inspection.id,
              inspectorFullName: inspection.inspectorFullName,
              resultComment: inspection.resultComment,
              resultType: inspection.resultType,
              status: inspection.status.value,
              type: inspection.type.value,
              totalTime: inspection.totalTime
            })
          );
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
          // console.log('documents', documentsResponse);
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

  saveInspData(id: number) {
    this.accelaService.selectedInspection = this.inspectionsArray.filter(inspection => inspection.id === id)[0]
  }

  public actionSheetButtons = [
    // {
    //   text: 'Download',
    //   role: 'download',
    //   data: {
    //     action: 'download',
    //   },
    // },
    {
      text: 'View',
      role: 'view',
      data: {
        action: 'view',
      },
    },
    {
      text: 'Share',
      role: 'share',
      data: {
        action: 'share',
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
        // {
        //   text: 'Download',
        //   role: 'download',
        //   handler: async () => {
        //     this.downloadDocument(specifiedDocument);
        //   },
        // },
        {
          text: 'View',
          role: 'view',
          handler: () => {
            this.viewDocument(specifiedDocument);
          },
        },
        {
          text: 'Share',
          role: 'share',
          handler: () => {
            this.shareDocument(specifiedDocument);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
      ],
    });
    await actionSheet.present();
  }



  // Function to convert a Blob to a Base64 encoded string
  private convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  }

  private viewDocument(specifiedDocument: any) {
    console.log('Viewing document');
    this.accelaService.obtainDocumentBlob(specifiedDocument).subscribe(
      (blob) => {
        this.selectedDocumentImageBlobUrl = URL.createObjectURL(blob);
      },
      (error) => {
        console.error('Error viewing document', error);
      }
    );
  }

  private shareDocument(specifiedDocument: any) {
    this.accelaService
      .obtainDocumentBlob(specifiedDocument)
      .subscribe(async (blob: Blob) => {
        const fileName = specifiedDocument.fileName;
        try {
          const base64Data = await this.convertBlobToBase64(blob);

          const result = await Filesystem.writeFile({
            path: fileName,
            data: base64Data,
            directory: Directory.Documents,
            recursive: true,
            encoding: Encoding.UTF8,
          });

          if (result && result.uri) {
            // Use result.uri directly without adding 'file://' prefix
            console.log('Full File URL:', result.uri);

            await Share.share({
              url: result.uri,
              text: fileName,
            });
          } else {
            console.error('File save failed, unable to share.');
          }
        } catch (error) {
          console.error('Error saving file:', error);
        }
      });
  }



  closeImage() {
    this.selectedDocumentImageBlobUrl = null;
  }

   // async downloadDocument(specifiedDocument: any) {
  //   try {
  //     this.accelaService.obtainDocumentBlob(specifiedDocument).subscribe(
  //       async (blob: Blob) => {
  //         const fileName = specifiedDocument.fileName; // Adjust based on your API response

  //         // Convert the Blob to a Base64 encoded string
  //         const base64Data = await this.convertBlobToBase64(blob);

  //         const result = await Filesystem.writeFile({
  //           path: fileName,
  //           data: base64Data,
  //           directory: Directory.Documents,
  //           recursive: true,
  //           encoding: Encoding.UTF8,
  //         });

  //         if (result) {
  //           console.log('File saved successfully:', result.uri);
  //         } else {
  //           console.error('File save failed.');
  //         }
  //       },
  //       (error) => {
  //         console.error('Error downloading file:', error);
  //       }
  //     );
  //   } catch (error) {
  //     console.error('Error downloading or saving file:', error);
  //   }
  // }
}
