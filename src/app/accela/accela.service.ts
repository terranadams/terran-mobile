import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccelaService {
  public accessToken: string | undefined;
  public recordsArray: any[] = [];

  constructor(private http: HttpClient) {}

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
      scope: 'records inspections',
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

  private encodeFormParams(params: any): string {
    return Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
      )
      .join('&');
  }
}
