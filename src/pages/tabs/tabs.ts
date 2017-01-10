import { Component } from '@angular/core';

import { ListsPage } from '../lists/lists';
import { GroupsPage } from '../groups/groups';
import {NavParams} from "ionic-angular";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  listsRoot: any = ListsPage;
  groupsRoot: any = GroupsPage;

  uid:string;

  constructor(private _navParams:NavParams) {
    this.uid = this._navParams.data;
  }
}
