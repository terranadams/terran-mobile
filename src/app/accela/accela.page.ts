import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-accela',
  templateUrl: './accela.page.html',
  styleUrls: ['./accela.page.scss'],
})
export class AccelaPage implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Trigger the method to get the access token when the page loads
    this.getAccessToken();
  }

  getAccessToken() {
    // Define the API endpoint to obtain the access token
    const apiUrl = 'https://auth.accela.com/oauth2/token';

    // Define the request body with the required parameters
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

    // Set the headers for the request (specify content type)
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    // Send a POST request to the API
    this.http.post(apiUrl, this.encodeFormParams(body), { headers }).subscribe(
      (response) => {
        // Log the response to the console (you can handle it as needed)
        console.log('Access Token Response:', response);
      },
      (error) => {
        // Handle errors if the request fails
        console.error('Error:', error);
      }
    );
  }

  // Helper function to encode the form data as a URL-encoded string
  encodeFormParams(params: any): string {
    return Object.keys(params)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');
  }
}
