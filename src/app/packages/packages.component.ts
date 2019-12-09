import { HttpService } from './../services/http.service';
import { Component, OnInit } from '@angular/core';
import { PackageModel } from 'src/models/admin.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.css']
})
export class PackagesComponent implements OnInit {
  listPackages: any
  myPackage: any;

  constructor(private api: HttpService) { }

  ngOnInit() {
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
  } else {
    transferArrayItem(event.previousContainer.data,
                      event.container.data,
                      event.previousIndex,
                      event.currentIndex);
                      this.updateMyPackage(event.container.data)
  }
}

updateMyPackage(data:any){
  console.log(data[0].id)

}
}
