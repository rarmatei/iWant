import { Component } from '@angular/core';
import {TabsPage} from "../tabs/tabs";
import {NavController} from "ionic-angular";
import {AngularFire} from "angularfire2";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {



  constructor(private _navCtrl:NavController, private _af:AngularFire) {

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
    this._af.auth.login();
  }

}
