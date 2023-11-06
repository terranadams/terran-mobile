import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccelaService {
  constructor(private http: HttpClient) {}

  accessToken: string | undefined; // To store the access token
  tokenLoading: boolean = false;
  recordLoading: boolean = false;
  recordsArray: any[] = [];


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

    this.http.post(apiUrl, this.encodeFormParams(body), { headers }).subscribe(
      (response: any) => {
        this.accessToken = response.access_token;

        console.log(`Access token: ${this.accessToken}`);
        this.getRecords(); // import get record
        this.tokenLoading = false;
      },
      (error) => {
        console.error('Error:', error);
        this.tokenLoading = false;
      }
    );
  }

  // Helper function to encode the form data as a URL-encoded string for getting the access token
  encodeFormParams(params: any): string {
    return Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
      )
      .join('&');
  } // The encodeFormParams function is a helper function that's used to convert an object containing key-value pairs into a URL-encoded string.
  // This is necessary when making a POST request with a "x-www-form-urlencoded" content type, which is a common way to send data in HTTP requests, especially for form submissions.

  getRecords() {
    const apiUrl = 'https://apis.accela.com/v4/records/mine';
    const headers = new HttpHeaders({
      Authorization: `${this.accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    this.recordLoading = true

    this.http.get<any>(apiUrl, { headers }).subscribe(
      (response) => {
        if (response && response.result && response.result.length > 0) {
          // Map through the objects, extract required data, and store in recordsArray
          this.recordsArray = response.result.map((record: any) => ({
            name: record.name,
            value: record.value,
            assignedUser: record.assignedUser,
          }));
          this.recordLoading = false
        } else {
          console.log('No records found.');
          this.recordLoading = false
        }
      },
      (error) => {
        console.error('Error:', error);
        this.recordLoading = false
      }
    );
  }



}
