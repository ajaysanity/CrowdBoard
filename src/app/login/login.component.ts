import { AngularFireAuth } from '@angular/fire/auth';
import { authInfo } from './../../models/auth.model';
import { QrService } from './../services/qr.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInMessage: string = '';
  form: FormGroup;
  loginData: authInfo;
  bar: false;
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
    this.bar = false;
  }

  async onSignin(form: NgForm) {
    //value of form
    let authValue = form.value
    //validation for form
    if (authValue.email != null && authValue.password != null) {
      await this.afAuth.auth.signInWithEmailAndPassword(authValue.email, authValue.password)
        .then(res => {
          //getting the token data from the server
          res.user.getIdTokenResult().then(idTokenResult => {
            let admin = idTokenResult.claims.admin
            // check if the credentials has an admin privileges
            if (admin) {
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
          //switch case for handling error
          switch (errCode) {
            case 'auth/wrong-password': {
              this.auth.FailedToast('Failed', 'Incorrect Password')
            }
            case 'auth/invalid-email': {
              this.auth.FailedToast('Failed', 'Invalid Email')
            }
            case 'auth/user-disabled': {
              this.auth.FailedToast('Failed', 'Account Disabled')
            }
            case 'auth/user-not-found': {
              this.auth.FailedToast('Failed', 'User not found')
            }
            default: {
              this.auth.FailedToast('Failed', 'Something Went Wrong')
            }
          }
        });
    } else {
      this.auth.FailedToast('Failed', 'Please Complete all the Fields')
    }
  }

}
