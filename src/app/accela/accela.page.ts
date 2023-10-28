import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AnimationController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-accela',
  templateUrl: './accela.page.html',
  styleUrls: ['./accela.page.scss'],
})
export class AccelaPage implements OnInit {
  private accessToken: string | undefined; // To store the access token

  constructor(
    private http: HttpClient,
    private animationCtrl: AnimationController,
    private loadingCtrl: LoadingController
  ) {}

  @ViewChild('content', { read: ElementRef, static: true })
  content!: ElementRef; // this is getting the element we want to animate by the local ref #content

  ngOnInit() {
    // Trigger the method to get the access token when the page loads
    this.getAccessToken();
  }

  recordsArray: any[] = [];

  // Function to get the access token
  getAccessToken() {
    this.loadingCtrl
      .create({ message: 'Getting Access Token...' })
      .then((loadingEl) => {
        loadingEl.present();

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

        // Send a POST request to the API to get the access token
        this.http
          .post(apiUrl, this.encodeFormParams(body), { headers })
          .subscribe(
            (response: any) => {
              // Store the access token obtained from the response
              this.accessToken = response.access_token;

              // Now that we have the access token, make a GET request for records
              console.log(`Access token: ${this.accessToken}`);
              this.getRecords();
            },
            (error) => {
              console.error('Error:', error);
            }
          );
        loadingEl.dismiss();
      });
  }

  // Function to get records
  getRecords() {
    const apiUrl = 'https://apis.accela.com/v4/records/mine';
    const headers = new HttpHeaders({
      Authorization: `${this.accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    this.loadingCtrl
      .create({ message: 'Getting Some Records...' })
      .then((loadingEl) => {
        loadingEl.present();

        this.http.get<any>(apiUrl, { headers }).subscribe(
          (response) => {
            if (response && response.result && response.result.length > 0) {
              // Map through the objects, extract required data, and store in recordsArray
              this.recordsArray = response.result.map((record: any) => ({
                name: record.name,
                value: record.value,
                assignedUser: record.assignedUser,
              }));
            } else {
              console.log('No records found.');
            }
          },
          (error) => {
            console.error('Error:', error);
          }
        );
        loadingEl.dismiss();
      });
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

  ionViewWillEnter() {
    const animation = this.animationCtrl
      .create()
      .addElement(this.content.nativeElement)
      .duration(200)
      .fromTo('opacity', 0, 1);
    animation.play();
  }
}
