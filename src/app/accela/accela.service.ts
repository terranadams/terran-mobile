import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root',
})
export class AccelaService {
  public accessToken: string | undefined;
  public recordsArray: any[] = [];

  constructor(private http: HttpClient, private transfer: FileTransfer, private file: File,) {}

  private encodeFormParams(params: any): string {
    return Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
      )
      .join('&');
  }

  getAccessToken() {
    const apiUrl = 'https://auth.accela.com/oauth2/token';

    const body = {
      client_id: '637798588965730207',
      client_secret: '3b6fde55100043c4ad64387717f52561',
      username: 'TADAMS',
      password: 'Accela01',
      agency_name: 'CRC',
      environment: 'SUPP',
      grant_type: 'password',
      scope: 'records inspections documents',
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post(apiUrl, this.encodeFormParams(body), { headers });
  }

  getRecords(accessToken: string | undefined) {
    const apiUrl = 'https://apis.accela.com/v4/records/mine';
    const headers = new HttpHeaders({
      Authorization: `${accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.get<any>(apiUrl, { headers });
  }

  getRecordInspections(recordId: string) {
    const apiUrl = `https://apis.accela.com/v4/records/${recordId}/inspections`;
    const headers = new HttpHeaders({
      Authorization: `${this.accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(apiUrl, { headers });
  }

  getRecordDocuments(recordId: string) {
    const apiUrl = `https://apis.accela.com/v4/records/${recordId}/documents`;
    const headers = new HttpHeaders({
      Authorization: `${this.accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(apiUrl, { headers });
  }


  downloadDocument(specifiedDocument: any): Observable<string> {
    const apiUrl = `https://apis.accela.com/v4/documents/${specifiedDocument.id}/download`;

    const fileTransfer: FileTransferObject = this.transfer.create();

    return new Observable<string>((observer) => {
      fileTransfer.download(apiUrl, this.file.dataDirectory + 'downloaded-document.pdf').then(
        (entry) => {
          console.log('Download complete: ' + entry.toURL());
          observer.next('Download complete: ' + entry.toURL());
          observer.complete();
        },
        (error) => {
          console.error('Error downloading document:', error);
          observer.error('Error downloading document');
        }
      );
    });
  }

  // OG call for running on the browser
  // downloadDocument(specifiedDocument: any) {
  //   const apiUrl = `https://apis.accela.com/v4/documents/${specifiedDocument.id}/download`;
  //   const headers = new HttpHeaders({
  //     Authorization: `${this.accessToken}`,
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   });
  //   return this.http.get(apiUrl, { headers, responseType: 'blob' });
  // }
}
