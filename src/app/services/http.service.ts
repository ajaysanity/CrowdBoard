import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  uri = "https://us-central1-crowdconnect2.cloudfunctions.net/app/api"
  constructor(private http: HttpClient) { }
  public unsub: Subject<any> = new Subject


  getTableData() {
    return this.http.get(`${this.uri}/superadmin`)
  }
  updateStatus(locationId, status) {
    return new Promise((resolve, reject) => {
      let data = {
        locationId: locationId,
        approved: status
      }
      this.http.put(`${this.uri}/superadmin`, data).pipe(takeUntil(this.unsub)).subscribe(res => {
        resolve(res)
      });
    }).catch(err => {
      reject(err.message)
    })

  }
  getPackages() {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.uri}/packages`).pipe(takeUntil(this.unsub)).subscribe(res => {
        resolve(res)
      })
    }).catch(err => {
      reject(err.message)
    })
  }
}
