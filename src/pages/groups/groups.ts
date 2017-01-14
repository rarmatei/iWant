import { Component } from '@angular/core';
import * as Rx from "rxjs/Rx";
import {NavController, NavParams} from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from "angularfire2";

type UserGroup = {key:string, value: string};

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html'
})
export class GroupsPage {

  groups:Rx.Observable<UserGroup[]>;
  newGroup:string;
  private afGroups: FirebaseListObservable<any[]>;
  constructor(navParams:NavParams, af:AngularFire) {

    const uid:string = navParams.data;
    this.afGroups = af.database
      .list(`/users/${uid}/groups`, { preserveSnapshot: true });

    this.groups = this.afGroups
      .map(groups => groups.map(group => {
        return {
          key: group.getKey(),
          value: group.val()
        }
      }));


  }

  addNewGroup() {
    if(this.newGroup) {
      this.afGroups.push(this.newGroup);
      this.newGroup = "";
    }
  }

  removeGroup(groupKey:string) {
    this.afGroups.remove(groupKey);
  }

}
