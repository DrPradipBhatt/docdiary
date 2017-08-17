import { Component,ViewChild } from '@angular/core';
import { Platform,NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as  firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthserviceProvider} from '../providers/authservice/authservice' ;

import { HomePage } from '../pages/home/home';
import {SigninPage} from '../pages/signin/signin' ;
import {PatientsPage} from '../pages/patients/patients'  ;
import {SetupPage} from '../pages/setup/setup' ;
import {DiseasesPage} from '../pages/diseases/diseases' ;  
import {CamsetupPage} from '../pages/camsetup/camsetup' ;
import {DoctypePage} from '../pages/doctype/doctype' ;

@Component({
  templateUrl: 'app.html'
})   


export class MyApp {

  rootPage:any = HomePage;
  signinPage = SigninPage;
  patientPage = PatientsPage ;
  diseasePage = DiseasesPage ;
  setupPage   = SetupPage ;
  camsetupPage = CamsetupPage ;
  doctypePage = DoctypePage ;
  isAuthenticated = false;
  @ViewChild('nav') nav: NavController;
 
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  private menuCtrl: MenuController, private auth : AngularFireAuth   ,
                private authService: AuthserviceProvider) {
              
       auth.auth.onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
       this.rootPage = HomePage;
      } else {
        this.isAuthenticated = false;
        this.rootPage = SigninPage;
      }
    });            
         
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
     
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }
  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(this.signinPage);
  }
  goPage(page: any) {
    this.nav.push(page);
    this.menuCtrl.close();
  }


}


