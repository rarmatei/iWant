import { Component } from '@angular/core';

import { HomePage } from '../lists/lists';
import { AboutPage } from '../groups/groups';
import { ContactPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  listsRoot: any = HomePage;
  groupsRoot: any = AboutPage;

  constructor() {

  }
}
