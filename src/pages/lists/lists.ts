import { Component } from '@angular/core';
import * as Rx from "rxjs/Rx";
import {NavController, NavParams} from 'ionic-angular';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from "angularfire2";


interface Group {
  $key:string;
  items: string[];
}

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {

  items:Group[];

  constructor(navParams:NavParams, af:AngularFire) {

    const uid:string = navParams.data;

    const userGroups:Rx.Observable<string[]> =
      af.database
        .list(`/users/${uid}/groups`)
        .map(afGroups => afGroups.map(afGroup => afGroup.$value));

    const fullGroups:FirebaseListObservable<Group[]> =
      af.database
        .list('/groups');

    Rx.Observable
      .combineLatest(userGroups, fullGroups, this._groupsCombiner)
      .subscribe((groups:Group[]) => {
        this.items = [].concat.apply([], groups);
      });
  }

  private _groupsCombiner = (userGroups:string[], fullGroups:Group[]):Group[] => {
    return fullGroups.filter(group => userGroups.indexOf(group.$key) >= 0);
  };

}
