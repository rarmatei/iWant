import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { GroupsPage } from '../pages/groups/groups';
import { ListsPage } from '../pages/lists/lists';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from "../pages/login/login";
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import { getFirebaseConfig } from "./FirebaseConfig";
import {AddItemPage} from "../pages/add-item/add-item";
@NgModule({
  declarations: [
    MyApp,
    GroupsPage,
    ListsPage,
    TabsPage,
    LoginPage,
    AddItemPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(getFirebaseConfig(), {
    provider: AuthProviders.Facebook,
    method: AuthMethods.Redirect
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GroupsPage,
    ListsPage,
    TabsPage,
    LoginPage,
    AddItemPage
  ],
  providers: []
})
export class AppModule {}
