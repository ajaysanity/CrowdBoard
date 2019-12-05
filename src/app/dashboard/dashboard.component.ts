import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { authInfo } from 'src/models/auth.model';
import { QrService } from '../services/qr.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface staticModel{
  Name: string,
  Location: string,
  Phone: string,
  ZipCode: string
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
  ],
})
export class DashboardComponent implements OnInit {
  loginData: authInfo;
  columnHeader = ['Name','Location','Phone', 'ZipCode'];

  data: staticModel[] = [{
    'Name': 'My Bar Ph',
    'Location': 'Quezon City',
    'Phone': '123541',
    'ZipCode': '123'
  },{
    'Name': 'My Bar Cebu',
    'Location': 'Cebu City',
    'Phone': 'cebuo123',
    'ZipCode': '3333'
  }]

  constructor(public auth: QrService,public FireFunctions: AngularFireFunctions,private router: Router) { }

  ngOnInit() {
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
}
