import { Component } from '@angular/core';
import * as Rx from "rxjs/Rx";
import {NavController, NavParams} from 'ionic-angular';
import {AngularFire} from "angularfire2";

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage {

  groups:Rx.Observable<string[]>;
  newGroup:string;
  private newGroupUpdates:Rx.Subject<string> = new Rx.Subject<string>();
  constructor(navParams:NavParams, af:AngularFire) {

    const uid:string = navParams.data;

    this.groups = (<any>af.database
      .object('/users/'+uid))
      .map(user => user.groups);

    this.newGroupUpdates
      .switchMap((newGroup:string) => {
        return this.groups.take(1).map((groups:string[]) => {
          return {
            groups: [...groups, newGroup]
          }
        });
      })
      .subscribe(userUpdate => {
        af.database
          .object(`users/${uid}`)
          .update(userUpdate);
      });

  }

  addNewGroup() {
    if(this.newGroup) {
      this.newGroupUpdates.next(this.newGroup);
      this.newGroup = "";
    }
  }

}
