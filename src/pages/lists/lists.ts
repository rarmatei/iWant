import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import * as Rx from "rxjs/Rx";
import {NavController, NavParams} from 'ionic-angular';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {AngularFire, FirebaseListObservable} from "angularfire2";

interface ItemsGroup {
  name:string;
  items: string[];
}

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {

  itemsGroups:Rx.Observable<ItemsGroup[]>;

  constructor(navParams:NavParams, af:AngularFire) {

    const uid:string = navParams.data;

    const userGroups:Rx.Observable<string[]> =
      af.database
        .list(`/users/${uid}/groups`)
        .map(groups => groups.map( group => group.$value));

    const fullGroups:FirebaseListObservable<string[][]> =
      af.database
        .list('/groups');

    this.itemsGroups = Rx.Observable
      .combineLatest(userGroups, fullGroups, this._groupsCombiner)
      .map(groups => {
        return groups.map(group => {
          return {
            name: group.$key,
            items: group
          };
        });
      });
  }

  private _groupsCombiner = (userGroups:string[], fullGroups:any[]):any[] => {
    return fullGroups.filter(group => userGroups.indexOf(group.$key) >= 0);
  };

}
