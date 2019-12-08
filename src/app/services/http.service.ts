import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  uri ="https://us-central1-crowdconnect2.cloudfunctions.net/app/api"
  constructor(private http: HttpClient) { }


  getTableData(){
    return this.http.get(`${this.uri}/superadmin`)
  }

}
