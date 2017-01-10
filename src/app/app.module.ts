import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/groups/groups';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/lists/lists';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from "../pages/login/login";
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { getFirebaseConfig } from "./FirebaseConfig";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage
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
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage
  ],
  providers: []
})
export class AppModule {}
