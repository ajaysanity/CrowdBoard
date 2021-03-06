import { HttpService } from './services/http.service';
import { QrService } from './services/qr.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { LinkGeneratorComponent } from './link-generator/link-generator.component';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { NgxPrintModule } from 'ngx-print';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { NgxSpinnerModule } from "ngx-spinner";
import { DashboardComponent } from './dashboard/dashboard.component';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import {MatFormFieldModule} from '@angular/material/form-field';


import {MatTableModule} from '@angular/material/table';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PackagesComponent } from './packages/packages.component';
import { AlertComponent } from './alert/alert.component';
import { OthersComponent } from './others/others.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LinkGeneratorComponent,
    DashboardComponent,
    PackagesComponent,
    AlertComponent,
    OthersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxPrintModule,
    BrowserAnimationsModule,
    AngularFireFunctionsModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    QRCodeModule,
    NgxSpinnerModule
  ],
  providers: [QrService, AngularFireAuth, AngularFireAuthGuard, HttpService],
  entryComponents:[PackagesComponent, AlertComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
