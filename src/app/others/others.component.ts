import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { PackageModel } from 'src/models/admin.model';
import { MatTableDataSource } from '@angular/material';
import { QrService } from '../services/qr.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit {
  columnHeader = ['name', 'description', 'price']
  packageModel: any;
  dataSource: any;
  packageData: PackageModel;

  constructor(private api: HttpService,  private alert: QrService,) { }
  ngOnInit() {
    this.getData();
  }
  getData() {
    this.api.getRawPackages().then((result: PackageModel) => {
      this.packageModel = result as PackageModel;
      this.dataSource = new MatTableDataSource(this.packageModel);
    })
  }
  submitPackage(form: NgForm){
    let formValue =form.value
    let data = {
      name: formValue.name,
      description: formValue.description,
      price: formValue.price
    }
    this.api.addRawPackage(data).then((res:any) => {
      this.alert.SuccessToast('Success!', res.message)
      this.getData()
    })
    .catch((err:any) => this.alert.FailedToast('Failed', err.message))
  }
}
