import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';  
import { AuthserviceProvider } from '../providers/authservice/authservice';
import {SigninPage} from '../pages/signin/signin' ;
import {PatientsPage} from '../pages/patients/patients'  ;
import {SetupPage} from '../pages/setup/setup' ;
import {DiseasesPage} from '../pages/diseases/diseases' ;  
import {CamsetupPage} from '../pages/camsetup/camsetup' ;
import {DoctypePage} from '../pages/doctype/doctype' ;
import {VisitlistPage} from '../pages/visitlist/visitlist' ;  
import {EditvisitPage } from '../pages/editvisit/editvisit' ; 
import { PatientserviceProvider } from '../providers/patientservice/patientservice';
import * as fbconfig    from './config' ;
let config = fbconfig.firbaseconfig.config ;
// remove above line and fill the below according to your fiebase project 
//const  config = {
//    apiKey: "xxxxx",
//    authDomain: "xxxxxxxx.firebaseapp.com",
//    databaseURL: "https://xxxxxxxx.firebaseio.com",
//    projectId: "xxxxxxx",
//    storageBucket: "xxxxxxx.appspot.com",
//    messagingSenderId: "xxxxxxxx"
// };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    PatientsPage,
    DiseasesPage,
    SetupPage,
    CamsetupPage,
    DoctypePage ,
    VisitlistPage,
    EditvisitPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp) ,
    AngularFireModule.initializeApp(config) ,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage ,
    PatientsPage,
    DiseasesPage,
    SetupPage,
    CamsetupPage,
    DoctypePage , 
    VisitlistPage , 
    EditvisitPage  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthserviceProvider,
    PatientserviceProvider
  ]
})
export class AppModule {}
