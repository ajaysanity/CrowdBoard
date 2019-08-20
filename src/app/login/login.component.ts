import { LinkGeneratorComponent } from './../link-generator/link-generator.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { authInfo } from './../../models/auth.model';
import { QrService } from './../services/qr.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { idTokenResult } from '@angular/fire/auth-guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInMessage: string = '';
  form: FormGroup;
  loginData: authInfo;
  validation_messages = {
    'username': [{ type: 'required', message: 'Required.' }],
    'password': [{ type: 'required', message: 'Required.' }],
  }


  constructor(
    public formBuilder: FormBuilder,
    private router: Router, public auth: QrService, public afAuth: AngularFireAuth) {

    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  async onSignin(form: NgForm) {
    let authValue = form.value
    if(authValue.email != null && authValue.password != null){
      await this.afAuth.auth.signInWithEmailAndPassword(authValue.email, authValue.password)
      .then(res => {
        res.user.getIdTokenResult().then(idTokenResult => {
          let admin = idTokenResult.claims.admin
          if(admin){
            this.auth.CreateSpinner();
            this.auth.SuccessToast('Success!', 'Welcome to Code Generator')
            this.router.navigateByUrl('/linkgenerator');
          } else {
            this.auth.FailedToast('Failed', 'Authorized Users Only')
            this.afAuth.auth.signOut();
          }
        })
      }).catch(err => {
         let errCode = err.code
         if (errCode === 'auth/wrong-password') {
          console.log('Wrong Password');
          this.auth.FailedToast('Failed','Incorrect Password')
      } else if (errCode === 'auth/invalid-email') {
          console.log('Invalid Email');
          this.auth.FailedToast('Failed','Invalid Email')

      } else if (errCode === 'auth/user-disabled') {
          console.log('Account Disabled');
          this.auth.FailedToast('Failed','Account Disabled')

      } else if (errCode === 'auth/user-not-found') {
          console.log('User not found');
          this.auth.FailedToast('Failed','User not found')

      } else {
        this.auth.FailedToast('Failed','Something Went Wrong')
      }
      })
    }else{
      this.auth.FailedToast('Failed', 'Please Complete all the Fields')
    }

    // if(this.form.get('username').value === 'admin' && this.form.get('password').value === 'admin'){
    //   this.router.navigate(['/linkgenerator'])
    // }else{
    //   this.signInMessage = 'Invalid Account';
    // }
  }

}
