import { HttpService } from './../services/http.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { authInfo } from 'src/models/auth.model';
import { QrService } from '../services/qr.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { AdminModel } from 'src/models/admin.model';

export interface staticModel{
  Name: string,
  Location: string,
  Phone: string,
  ZipCode: string,
  description: string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class DashboardComponent implements OnInit {
  loginData: authInfo;
  AdminModel: AdminModel
  columnHeader = ['name','location','phone', 'zipcode','approved','actions'];
  expanded: staticModel | null;


  constructor(public auth: QrService,public FireFunctions: AngularFireFunctions,private router: Router, private api: HttpService) { }

  ngOnInit() {
    this.getData()
  }
makeAdmin(form: NgForm){
let adminEmail = form.value.email
const addAdminRole = this.FireFunctions.httpsCallable('addAdminRole');
addAdminRole({email: adminEmail}).subscribe( res => {
  console.log(res)
})
}
goToLink(){
  this.router.navigateByUrl('linkgenerator')
}

getData(){
  let adminObj = [];
  let obj = [];
  let x = 0;
  this.api.getTableData().toPromise().then( (result: AdminModel) => {
    this.AdminModel = result as AdminModel;
    // adminObj.push(this.AdminModel);
  })

}
}
