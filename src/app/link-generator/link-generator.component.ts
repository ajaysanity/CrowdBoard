import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as uuid from 'uuid';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-link-generator',
  templateUrl: './link-generator.component.html',
  styleUrls: ['./link-generator.component.css']
})
export class LinkGeneratorComponent {
  prefix = "";
  nooflinks = 1;
  locationqrcodesCollection: AngularFirestoreCollection;
  locationqrcodes: Observable<any[]>;
  collection = "";

  form : FormGroup;
  validation_messages = {
      'collection': [{ type: 'required', message: 'Collection is required.' }],
      'prefix': [
        { type: 'required', message: 'URL Prefix is required.' },
        { type: 'pattern', message: 'URL is invalid.' }
      ],
      'nooflinks': [
        { type: 'required', message: 'Number of links is required.'},
        { type: 'min', message: 'Min. number of links is 1.' }
      ],
  }

  constructor(
    private db: AngularFirestore,
    public formBuilder: FormBuilder,) {

      this.form = this.formBuilder.group({
        collection: ['', Validators.required],
        prefix: ['', Validators.compose([Validators.required, Validators.pattern('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}')])],
        nooflinks: ['', Validators.compose([Validators.required, Validators.min(1)])],
    });
  }

  onGenerate(){


    let prefixClean = this.prefix.trim();
    if (prefixClean.length == 0 || this.nooflinks < 1){
      alert("Invalid input");
    }

    this.locationqrcodesCollection = this.db.collection(this.collection);
    this.locationqrcodes = this.locationqrcodesCollection.valueChanges();    

    for (let count=0; count<this.nooflinks; count++) {
      this.locationqrcodesCollection.add({
        text: uuid.v4()
      });
    }
  }
}
