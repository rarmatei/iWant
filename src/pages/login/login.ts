import { Component } from '@angular/core';
import {TabsPage} from "../tabs/tabs";
import {NavController} from "ionic-angular";
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {



  constructor(private _navCtrl:NavController, private _af:AngularFire, private platform: Platform) {

  }

  title:string = "Log in";

  ionViewDidLoad() {
    this._af.auth.subscribe(auth => {
      if(auth) {
        this._af.database
          .object('/users/'+auth.uid)
          .subscribe(user => {
            if(!user.$exists()) {
              this._af.database
                .object('/users/'+auth.uid)
                .set({
                  groups: []
                });
            }
          });
        this._navCtrl.setRoot(TabsPage, auth.uid);
      }
    });
  }

  login() {
    if (this.platform.is('cordova')) {
      Facebook.login(['email']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential);
      });
    } else {
      this._af.auth.login();
    }
  }

}
