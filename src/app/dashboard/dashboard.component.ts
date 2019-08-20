import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { authInfo } from 'src/models/auth.model';
import { QrService } from '../services/qr.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loginData: authInfo;

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
