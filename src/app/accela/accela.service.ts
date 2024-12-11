import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GetEnvironmentsResponse } from './models';


@Injectable({
  providedIn: 'root'
})
export class AccelaService {

  private baseUrl = 'https://apis.accela.com/v4';
  private appId = '637798588965730207';

  constructor(private http: HttpClient) { }

  getEnvironments(agencyName: string) {
    const url = `${this.baseUrl}/agencies/${agencyName}/environments`;
    const headers = new HttpHeaders({
      'x-accela-appid': this.appId,
    });
    return this.http.get<GetEnvironmentsResponse>(url, { headers }).pipe(
      map((response) => response.result.map((env) => env.name)) // Map out the name of each env to an array of strings
    );
  }
}
