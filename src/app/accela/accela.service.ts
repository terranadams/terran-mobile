import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  AccessTokenResponse,
  GetEnvironmentsResponse,
  RecordItem,
} from './models';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RecordItemRaw, RecordResponse } from '../pokedex/models';

@Injectable({
  providedIn: 'root',
})
export class AccelaService {
  private baseUrl = 'https://apis.accela.com/v4';
  private appId = '637798588965730207';
  public accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  private encodeFormParams(params: Record<string, string>): string {
    return Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');
  }

  public getEnvironments(agencyName: string) {
    const url = `${this.baseUrl}/agencies/${agencyName}/environments`;
    const headers = new HttpHeaders({
      'x-accela-appid': this.appId,
    });
    return this.http.get<GetEnvironmentsResponse>(url, { headers }).pipe(
      map((response) => response.result.map((env) => env.name)) // Map out the name of each env to an array of strings
    );
  }

  public getAccessToken(
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
      client_id: environment.appId,
      client_secret: environment.clientSecret,
      username: username,
      password: password,
      agency_name: agencyName,
      environment: selectedEnvironment,
      grant_type: 'password',
      scope: 'records',
    };

    return this.http.post<AccessTokenResponse>(
      url,
      this.encodeFormParams(body),
      { headers }
    );
  }

  public setAccessToken(token: string) {
    this.accessToken = token;
  }

  public getMyRecords(): Observable<RecordItem[]> {
    const url = `${this.baseUrl}/records/mine`;

    const headers = new HttpHeaders({
      Authorization: `${this.accessToken}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    return this.http.get<RecordResponse>(url, { headers }).pipe(
      map((response) =>
        response.result.map((record: RecordItemRaw) => ({
          customId: record.customId || '',
          id: record.id || '',
          type: record.type?.text || '',
          assignedUser: record.assignedUser || '',
          status: record.status?.text || '',
          value: record.value || '',
        }))
      )
    );
  }

}
