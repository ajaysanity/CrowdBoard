import { AngularFireAuth } from '@angular/fire/auth';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn$: boolean
constructor(private afAuth: AngularFireAuth){
  this.afAuth.authState.subscribe(res => {
    if (res && res.uid) {
      this.isLoggedIn$ = true;
    } else {
      this.isLoggedIn$ = false;
    }
  });}


}
