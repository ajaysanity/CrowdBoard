import { QrService } from './../services/qr.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link-generator',
  templateUrl: './link-generator.component.html',
  styleUrls: ['./link-generator.component.css']
})
export class LinkGeneratorComponent implements OnInit {
  ngOnInit() {

  }
  CollectionType: any[] = ["_qr_table"];
  QrData = this.qrService.QrFormData;
  prefix = "";
  nooflinks = 1;
  isMain = false;
  locationqrcodesCollection: AngularFirestoreCollection;
  locationqrcodes: Observable<any[]>;
  collection = "";
  qr_codes = []
  level = "M";
  form: FormGroup;
  mainCode: string;
  validation_messages = {
    'nooflinks': [
      { type: 'required', message: 'Number of links is required.' },
      { type: 'min', message: 'Min. number of links is 1.' }
    ],
  }

  constructor(
    private db: AngularFirestore,
    public auth: QrService,
    public formBuilder: FormBuilder,
    public qrService: QrService,
    public afAuth: AngularFireAuth,
    public http: HttpClient,
    private router: Router) {
    this.form = this.formBuilder.group({
      nooflinks: ['', Validators.compose([Validators.required, Validators.min(1)])],
    });
  }

  onSubmit(form: NgForm) {
    let FormValue = form.value;
    let counter = FormValue.QrQuantity
    if (FormValue.QrQuantity != null && FormValue.QrQuantity >= 1 && FormValue.urlPrefix != null) {
      try{
        for (let i=0; i< counter; i++ ){

          this.qrService.httpCreateTable(form).subscribe( (res: any) => {
            //response from the server
            // console.log(res.id)

            this.qr_codes.push(FormValue.urlPrefix+"/"+res.id)
          }), err => {
            this.qrService.FailedToast("Failed", `${form.value.QrQuantity} links was not added`)
          }

        }
      }catch(err){

      }finally{
        this.qrService.SuccessToast("Success", `${FormValue.QrQuantity} Successfully Added`)
      }

    } else if (FormValue.QrQuantity < 1) {
      this.qrService.FailedToast("Failed", "Invalid Number")
    } else {
      this.qrService.FailedToast("Failed", "Form not Completed")
    }

  }
  logOut(){
    this.afAuth.auth.signOut().then( () => {
      this.auth.CreateSpinner();

    this.router.navigateByUrl('/')
    })
  }
  goToDashboard(){
    this.router.navigateByUrl('/dashboard')
  }
  formHammer(form?: NgForm) {
    form.resetForm()
    this.QrData = {
      collectionName: '',
      urlPrefix: '',
      QrQuantity: null,
      used: false
    }
  }
}
