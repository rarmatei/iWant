import { Component } from '@angular/core';
import {AngularFire} from "angularfire2";



// import {firebase} from "firebase";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {



  constructor(private af: AngularFire) {
  }

  title:string = "Log in";
  loggedIn:boolean = false;

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
    this.af.auth.subscribe(auth => {
      if(auth) {
        this.loggedIn = true;
      }
    });
  }

  login() {
    this.af.auth.login();
  }

}
