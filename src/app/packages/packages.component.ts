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
  constructor(private api: HttpService,   public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data)
    this.getPackagesData();
  }
async getPackagesData(){
  this.api.getPackages().then( data => {
    this.listPackages = data
    this.myPackage = [];
  })
}
drop(event: CdkDragDrop<string[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    console.log(event.container.data)
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
                      this.updateMyPackage(event.container.data)
  }
}

updateMyPackage(data:any){
  let packageId = data[0].id
  console.log(data[0])

}
}
