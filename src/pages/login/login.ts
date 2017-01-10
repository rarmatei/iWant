import { Component } from '@angular/core';
import {AngularFire} from "angularfire2";
import * as Rx from "rxjs/Rx";
import {TabsPage} from "../tabs/tabs";
import {NavController} from "ionic-angular";


// import {firebase} from "firebase";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/

interface User {
  uid:string;
  groups:string[];
}

interface Group {
  $key:string;
  items: string[];
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {



  constructor(private af: AngularFire, private navCtrl:NavController) {

    Rx.Observable
      .combineLatest(
        this.user.map(user => user.groups),
        af.database.list('/groups'),
        (userGroups:string[], fullGroups:Group[]) => {
          return fullGroups.filter(group => userGroups.indexOf(group.$key) >= 0);
        }
      )
      .subscribe((groups:Group[]) => {
        this.items = [].concat.apply([], groups);
      });

  }

  title:string = "Log in";
  loggedIn:boolean = false;
  newGroup:string;

  private user:Rx.ReplaySubject<User> = new Rx.ReplaySubject<User>(1);

  items:string[] = [];

  ionViewDidLoad() {

    this.af.auth.subscribe(auth => {
      if(auth) {
        this.af.database
          .object('/users/'+auth.uid)
          .subscribe(user => {
            if(user.$exists()) {
              this.user.next({
                uid: auth.uid,
                groups: user.groups
              });
            } else {
              this.user.next({
                uid: auth.uid,
                groups: []
              });
              this.af.database
                .object('/users/'+auth.uid)
                .set({
                  groups: []
                });
            }
          });
        this.navCtrl.setRoot(TabsPage);
      }
    });
  }

  login() {
    this.af.auth.login();
  }

  addNewGroup() {
    if(this.newGroup) {
      this.user.take(1).subscribe(user => {
        this.af.database
          .object(`users/${user.uid}`)
          .update({
            groups: [...user.groups, this.newGroup]
          });
      });
      this.newGroup = "";
    }
  }

}
