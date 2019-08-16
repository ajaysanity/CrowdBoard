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
    public formBuilder: FormBuilder,
    public qrService: QrService,
    public http: HttpClient) {
    this.form = this.formBuilder.group({
      nooflinks: ['', Validators.compose([Validators.required, Validators.min(1)])],
    });
  }

  onSubmit(form: NgForm) {
    let FormValue = form.value;
    let counter = FormValue.QrQuantity
    if (FormValue.QrQuantity != null && FormValue.QrQuantity >= 1 && FormValue.urlPrefix != null) {
      for (let i=0; i<= counter; i++ ){
        this.qrService.httpCreateTable(form)
        this.qrService.SuccessToast("Success", `${FormValue.QrQuantity} Successfully Added`)
      }
    } else if (FormValue.QrQuantity < 1) {
      this.qrService.FailedToast("Failed", "Invalid Number")
    } else {
      this.qrService.FailedToast("Failed", "Form not Completed")
    }

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
