import { QrService } from './../services/qr.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-link-generator',
  templateUrl: './link-generator.component.html',
  styleUrls: ['./link-generator.component.css']
})
export class LinkGeneratorComponent implements OnInit {
  ngOnInit() {

  }
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
    public formBuilder: FormBuilder,
    public qrService: QrService,
    public http: HttpClient) {
    this.form = this.formBuilder.group({
      nooflinks: ['', Validators.compose([Validators.required, Validators.min(1)])],
    });
  }

  onSubmit(form: NgForm) {
    let FormValue = form.value;
    if (FormValue.QrQuantity != null && FormValue.QrQuantity >= 1 && FormValue.urlPrefix != null) {
      this.onGenerate(FormValue.QrQuantity, FormValue.urlPrefix,form).then(() => {
        setTimeout(() => {
          this.formHammer(form)
        }, 1200)
        this.qrService.SuccessToast("Success", `${FormValue.QrQuantity} Successfully Added`)
      }).catch(err => {
        this.qrService.FailedToast("Failed", err)
      });
    } else if (FormValue.QrQuantity < 1) {
      this.qrService.FailedToast("Failed", "Invalid Number")
    } else {
      this.qrService.FailedToast("Failed", "Form not Completed")

    }

  }


  formHammer(form?: NgForm) {
    form.resetForm()
    this.QrData = {
      urlPrefix: '',
      QrQuantity: null,
      used: false
    }
  }
  checkIfExist(code) {
    return new Promise((resolve, reject) => {
      this.db.collection('table_qr', ref => {
        return ref
          .where('text', '==', code)
      }).valueChanges()
        .subscribe(values => {

          if (values.length > 0) {
            resolve(true)
          }
          else {
            resolve(false)
          }

        })
    })
  }

  async onGenerate(quantity: number, urlPrefix?: string, form?: NgForm) {

    // this.locationqrcodesCollection = await this.db.collection(this.collection);
    // this.locationqrcodes = await this.locationqrcodesCollection.valueChanges();    
    for (let count = 0; count < quantity; count++) {
      let code = uuid.v4()
      let x = true

      while (x) {

        await this.checkIfExist(code).then(data => {
          console.log(data)
          if (data) {

            code = uuid.v4()
          }
          else {
            x = false
            return
          }
        })
      }
      code = `${urlPrefix}/${code}`
      this.qr_codes.push(code)
      this.qrService.httpCreateTable(form)
      console.log("Success");
    }

  }
}
