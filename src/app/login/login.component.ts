import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signInMessage: string = '';
  form : FormGroup;
  validation_messages = {
      'username': [{ type: 'required', message: 'Required.' }],
      'password': [{ type: 'required', message: 'Required.' }],
  }


  constructor(
    public formBuilder: FormBuilder,
    private router: Router) {

      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSignin(){
    if(this.form.get('username').value === 'admin' && this.form.get('password').value === 'admin'){
      this.router.navigate(['/linkgenerator'])
    }else{
      this.signInMessage = 'Invalid Account';
    }
  }

}
