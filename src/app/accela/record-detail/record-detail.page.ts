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
        {
          text: 'Download',
          role: 'download',
          handler: async () => {
            this.downloadDocument(specifiedDocument);
          },
        },
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
            this.accelaService
              .obtainDocumentBlob(specifiedDocument)
              .subscribe(async (blob: Blob) => {
                const fileName = specifiedDocument.fileName;
                const fileURL = await this.blobToText(blob);
                Share.share({ url: fileURL, text: fileName });
              });
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

  async downloadDocument(specifiedDocument: any) {
    try {
      this.accelaService.obtainDocumentBlob(specifiedDocument).subscribe(
        async (blob: Blob) => {
          const fileName = specifiedDocument.fileName; // You may need to adjust this based on your API response

          // Convert the Blob to a string, assuming it's not binary data
          const text = await this.blobToText(blob);

          const result = await Filesystem.writeFile({
            path: fileName, // Provide a suitable file path
            data: text, // Pass the converted text as data
            directory: Directory.Documents, // Choose the directory where you want to save the file
            encoding: Encoding.UTF8, // Use the appropriate encoding
          });

          if (result) {
            console.log('File saved successfully:', result.uri);
          } else {
            console.error('File save failed.');
          }
        },
        (error) => {
          console.error('Error downloading file:', error);
        }
      );
    } catch (error) {
      console.error('Error downloading or saving file:', error);
    }
  }

  // Function to convert a Blob to text
  async blobToText(blob: Blob): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          resolve(event.target.result as string);
        } else {
          reject('Failed to read Blob as text.');
        }
      };
      reader.onerror = () => {
        reject('Error reading Blob as text.');
      };
      reader.readAsText(blob);
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

  closeImage() {
    this.selectedDocumentImageBlobUrl = null;
  }
}
