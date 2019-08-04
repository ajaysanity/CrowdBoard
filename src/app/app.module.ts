import { QrService } from './services/qr.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LoginComponent } from './login/login.component';
import { LinkGeneratorComponent } from './link-generator/link-generator.component';
import { QRCodeModule } from 'angularx-qrcode';
import { CommonModule } from '@angular/common';
import {ToastrModule} from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import {NgxPrintModule} from 'ngx-print';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LinkGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    NgxPrintModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    QRCodeModule
  ],
  providers: [QrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
