import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  FileTransfer,
  FileTransferObject,
} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Observable } from 'rxjs';
import { HttpResponse } from '@capacitor/core';
import { GetRecordInspectionsResponse, GetRecordsResponse, Params } from './models';

@Injectable({
  providedIn: 'root',
})
export class AccelaService {
  public accessToken: string | undefined;
  public recordsArray: any[] = [];
  public selectedInspection: any = {}

  constructor(
    private http: HttpClient,
    private transfer: FileTransfer,
    private file: File
  ) {}

  getSelectedInspection() {
    return this.selectedInspection
  }

  private encodeFormParams(params: Params): string {
    return Object.entries(params)
      .map(
        ([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)
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

    return this.http.get<GetRecordsResponse>(apiUrl, { headers });
  }

  getRecordInspections(recordId: string) {
    const apiUrl = `https://apis.accela.com/v4/records/${recordId}/inspections`;
    const headers = new HttpHeaders({
      Authorization: `${this.accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.get<GetRecordInspectionsResponse>(apiUrl, { headers });
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

  getRecordComments(recordId: string) {
    const apiUrl = `https://apis.accela.com/v4/records/${recordId}/comments`;
    const headers = new HttpHeaders({
      Authorization: `${this.accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(apiUrl, { headers });
  }

  obtainDocumentBlob(specifiedDocument: any): Observable<Blob> {
    const apiUrl = `https://apis.accela.com/v4/documents/${specifiedDocument.id}/download`;
    const headers = new HttpHeaders({
      Authorization: `${this.accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    return this.http.get(apiUrl, {
      headers,
      responseType: 'blob',
    });
  }
}
