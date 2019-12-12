import { QrService } from './../services/qr.service';
import { HttpService } from './../services/http.service';
import { Component, OnInit, Inject } from '@angular/core';
import { PackageModel } from 'src/models/admin.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  listPackages: any
  myPackage: any;
  constructor(private api: HttpService,   public dialogRef: MatDialogRef<DashboardComponent>,private alert: QrService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data)
    this.getPackagesData();
    this.getMyPackagesData();
  }
async getPackagesData(){
  this.api.getPackages(this.data.id).then( data => {
    this.listPackages = data
  })
}
async getMyPackagesData(){
  this.api.getMyPackages(this.data.id).then(data =>{
    this.myPackage = data
  })
}
drop(event: CdkDragDrop<string[]>, packageType: any) {
  let i = 0
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
                      if(packageType === 'packages'){
                        console.log(event.previousContainer.data)
                        this.deleteMyPackage(event.container.data)

                      }else{
                         this.updateMyPackage(event.container.data)

                      }

  }
}

updateMyPackage(data:any){
  let packageId = data[0].id
  let name = data[0].name
  let locationId = this.data.id
  let datum ={
    packageId: packageId,
    name: name,
    locationId: locationId
  }
  this.api.updateMyPackage(datum).then( (res:any) => this.alert.SuccessToast('Success!', res.message))
  .catch( (err:any) => this.alert.FailedToast('Failed', err.message))
}

deleteMyPackage(data:any){
  let packageId = data[0].id
  let locationId = this.data.id

  this.api.deleteMyPackage(locationId,packageId).then( (res:any) => this.alert.SuccessToast('Success!', res.message))
  .catch( (err:any) => this.alert.FailedToast('Failed', err.message))
  
}
}
