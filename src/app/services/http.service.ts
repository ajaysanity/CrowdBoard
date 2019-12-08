import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  uri ="https://us-central1-crowdconnect2.cloudfunctions.net/app/api"
  constructor(private http: HttpClient) { }
  public unsub: Subject<any> = new Subject


  getTableData(){
    return this.http.get(`${this.uri}/superadmin`)
  }
  updateStatus(locationId, status){
    return new Promise((resolve, reject) => {
      let data = {
        locationId: locationId,
        approved: status
      }
      this.http.put(`${this.uri}/superadmin`,data).pipe(takeUntil(this.unsub)).subscribe(res => {
        resolve(res)
      });
    })

  }
}
