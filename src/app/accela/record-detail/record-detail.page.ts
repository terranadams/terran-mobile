import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccelaService } from '../accela.service';
import { forkJoin } from 'rxjs';
import { ActionSheetController } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { DisplayedCommentDetails, DisplayedDocumentDetails, DisplayedInspectionDetails, DisplayedRecordDetails, Document, InspectionResult, Record, RecordComment } from '../models';

@Component({
  selector: 'app-record-detail',
  templateUrl: './record-detail.page.html',
  styleUrls: ['./record-detail.page.scss'],
})
export class RecordDetailPage implements OnInit {
  urlValue!: string | null;
  record!: DisplayedRecordDetails | undefined;;
  inspectionsArray: DisplayedInspectionDetails[] = [];
  inspectionsLoading: boolean = true;
  documentsArray: DisplayedDocumentDetails[] = [];
  documentsLoading: boolean = true;
  commentsArray: DisplayedCommentDetails[] = [];
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
      // Set the urlValue from the route parameter
      this.urlValue = paramMap.get('record-detail');

      // Find the matching record from the service
      this.record = this.accelaService.recordsArray.filter(
        (record) => record.value === this.urlValue
      )[0];

      // Check if record is defined before proceeding
      if (!this.record) {
        console.error('Record not found');
        return; // Exit early if record is undefined
      }

      // Proceed only if `this.record` is defined
      forkJoin([
        this.accelaService.getRecordInspections(this.record.value),
        this.accelaService.getRecordDocuments(this.record.value),
        this.accelaService.getRecordComments(this.record.value),
      ]).subscribe(
        ([inspectionsResponse, documentsResponse, commentsResponse]) => {
          // Handle inspections response
          if (
            inspectionsResponse &&
            inspectionsResponse.result &&
            inspectionsResponse.result.length > 0
          ) {
            console.log('inspections', inspectionsResponse);
            this.inspectionsArray = inspectionsResponse.result.map(
              (inspection: InspectionResult) => ({
                address: inspection.address.streetAddress,
                id: Number(inspection.id),
                inspectorFullName: inspection.inspectorFullName,
                resultComment: inspection.resultComment,
                resultType: inspection.resultType,
                status: inspection.status.value,
                type: inspection.type.value,
                totalTime: inspection.totalTime,
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
            this.documentsArray = documentsResponse.result.map(
              (document: any) => ({
                id: document.id,
                fileName: document.fileName,
              })
            );
          } else {
            console.log('No documents found.');
          }
          this.documentsLoading = false;

          // Handle comments response
          if (
            commentsResponse &&
            commentsResponse.result &&
            commentsResponse.result.length > 0
          ) {
            this.commentsArray = commentsResponse.result.map(
              (comment: any) => ({
                id: comment.id,
                text: comment.text,
              })
            );
            console.log('commentsArray', this.commentsArray);
          } else {
            console.log('No comments found');
          }
          this.commentsLoading = false;
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.inspectionsLoading = false;
          this.documentsLoading = false;
          this.commentsLoading = false;
        }
      );
    });
  }


  public saveInspData(id: number) {
    this.accelaService.selectedInspection = this.inspectionsArray.filter(
      (inspection) => inspection.id === id
    )[0];
  }

  public actionSheetButtons = [
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

  private shareDocument(specifiedDocument: Document) {
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

  public closeImage() {
    this.selectedDocumentImageBlobUrl = null;
  }

}
