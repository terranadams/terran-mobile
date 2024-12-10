import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccelaService {

  private baseUrl = 'https://apis.accela.com/v4/';

  constructor(private http: HttpClient) { }

  getEnvironments(agencyName: string) {
    const url = `${this.baseUrl}/agencies/${agencyName}/environments`
    return this.http.get(url);
  }
}
