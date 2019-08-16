import { HttpClient } from '@angular/common/http';
import { QrInfo } from './../../models/TableInfo.model';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TableInfo } from 'src/models/TableInfo.model';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  QrFormData: QrInfo;
  private TableCollection: AngularFirestoreCollection<TableInfo>
  MyTable: Observable<TableInfo[]>
  urls = "http://localhost:5000/crowdconnect2/us-central1/app/api";

  constructor(private http: HttpClient,private fireDb: AngularFirestore, private toast: ToastrService) { }

  // To create a Table Information
  async CreateTable(TableForm: NgForm){
    this.TableCollection = this.fireDb.collection<TableInfo>(`_qr`)
    await this.TableCollection.doc('z6M53gdxs4dmj15STX80KPPdvF62').set(TableForm)
    .then(snapshot =>{
      this.SuccessToast("Success", "Thank you for using our tool");
    }).catch(err => this.FailedToast("Failed!", err)
    )
} 

httpCreateTable(TableForm: NgForm){
  // this.http.get(`${this.urls}?id=jsWEGzuuM2Upm6D0c06v`).subscribe(y => {
  //   console.log(y)
  // })
  return this.http.post(`${this.urls}/table`,TableForm.value).subscribe( x => {
    console.log(x)
  }, err => {
    console.log(err)
  })
}

// Just a success toast 
  SuccessToast(Title: any, Text: any){
    this.toast.success(Text, Title, {
      timeOut: 3000
    });
  }
// Just a failed toast 
  FailedToast(Title: any, Text: any){
    this.toast.warning(Text, Title, {
      timeOut:3000
    });

  }
}
