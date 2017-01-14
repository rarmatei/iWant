import 'rxjs/add/operator/map';
import { Component } from '@angular/core';
import * as Rx from "rxjs/Rx";
import {NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
import {AngularFire} from "angularfire2";
import { ModalController } from 'ionic-angular';
import {AddItemPage} from "../add-item/add-item";

interface ItemsGroup {
  name:string;
  items: FullItem[];
}

type FullGroup = {name:string, items: string[]};
type FullItem = {key:string, value: string};

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {

  itemsGroups:Rx.Observable<ItemsGroup[]>;

  constructor(private _modalCtrl: ModalController, navParams:NavParams, private _af:AngularFire) {

    const uid:string = navParams.data;

    const userGroups:Rx.Observable<string[]> =
      this._af.database
        .list(`/users/${uid}/groups`)
        .map(groups => groups.map( group => group.$value));

    const fullGroups:Rx.Observable<FullGroup[]> =
      this._af.database
        .list('/groups', { preserveSnapshot: true })
        .map(groups => groups.map(group => {
          return {
            name: group.getKey(),
            items: group.val()
          }
        }));

    this.itemsGroups = Rx.Observable
      .combineLatest(userGroups, fullGroups, this._groupsCombiner)
      .map(groups => {
        return groups.map(group => {
          return {
            name: group.name,
            items: this.getItems(group.items)
          };
        });
      });
  }

  addItemToGroup(itemsGroup:ItemsGroup) {
    let modal = this._modalCtrl.create(AddItemPage, {
      groupName: itemsGroup.name
    });
    modal.present();
  }

  removeItem(itemKey:string, groupName:string) {
    this._af.database
      .list(`/groups/${groupName}`)
      .remove(itemKey);
  }

  private _groupsCombiner = (userGroups:string[], fullGroups:FullGroup[]):any[] => {
    return userGroups.map(group => {
      const fullGroup = fullGroups.find(fullGroup => fullGroup.name === group);
      if(fullGroup) {
        return fullGroup;
      } else {
        return {
          name: group,
          items: []
        }
      }
    });
  };

  private getItems(groupItems:any):FullItem[] {
    const items:FullItem[] = [];
    for (var key in groupItems) {
      if (groupItems.hasOwnProperty(key)) {
        items.push({
          key: key,
          value: groupItems[key]
        });
      }
    }
    return items;
  }

}
