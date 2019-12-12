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
  getPackages(locationId) {
    return new Promise((resolve, reject) => {
      this.http.get(`${this.uri}/packages?locationId=${locationId}`).pipe(takeUntil(this.unsub)).subscribe(res => {
        resolve(res)
      })
    }).catch(err => {
      reject(err.message)
    })
  }
  getMyPackages(locationId){
    return new Promise((resolve, reject) => {
      this.http.get(`${this.uri}/mypackages?locationId=${locationId}`).pipe(takeUntil(this.unsub)).subscribe(res => {
        resolve(res)
      })
    }).catch(err => {
      reject(err.message)
    })
  }

  deleteMyPackage(locationId: any, packageId: any){
    return new Promise((resolve, reject) => {
      this.http.delete(`${this.uri}/packages?locationId=${locationId}&packageId=${packageId}`).pipe(takeUntil(this.unsub)).subscribe(res => {
        resolve(res)
      })
    }).catch(err => {
      reject(err.message)
    })
  }
  updateMyPackage(data: any){
    return new Promise((resolve, reject) => {
      this.http.post(`${this.uri}/packages`,data).pipe(takeUntil(this.unsub)).subscribe(res => {
        resolve(res)
      })
    }).catch(err => {
      reject(err.message)
    })
  }
}
