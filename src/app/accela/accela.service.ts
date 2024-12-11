import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GetEnvironmentsResponse } from './models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccelaService {
  private baseUrl = 'https://apis.accela.com/v4';
  private appId = '637798588965730207';

  constructor(private http: HttpClient) {}

  private encodeFormParams(params: Record<string, string>): string {
    return Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }

  getEnvironments(agencyName: string) {
    const url = `${this.baseUrl}/agencies/${agencyName}/environments`;
    const headers = new HttpHeaders({
      'x-accela-appid': this.appId,
    });
    return this.http.get<GetEnvironmentsResponse>(url, { headers }).pipe(
      map((response) => response.result.map((env) => env.name)) // Map out the name of each env to an array of strings
    );
  }

  getAccessToken(
    username: string,
    password: string,
    agencyName: string,
    selectedEnvironment: string
  ) {
    const url = 'https://auth.accela.com/oauth2/token';

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const body = {
      client_id: environment.appId, // Uses the imported 'environment'
      client_secret: environment.clientSecret, // Uses the imported 'environment'
      username: username,
      password: password,
      agency_name: agencyName,
      environment: selectedEnvironment,
      grant_type: 'password',
      scope: 'records',
    };

    return this.http.post<{ access_token: string }>(url, this.encodeFormParams(body), { headers });
  }
}
