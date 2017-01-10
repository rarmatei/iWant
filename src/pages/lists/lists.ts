import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'lists.html'
})
export class HomePage {

  items:number[] = [1,2,3,4];

  //TODO possibly remove constructor
  constructor(public navCtrl: NavController) {

  }

}
