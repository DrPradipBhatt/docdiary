import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase , FirebaseListObservable } from 'angularfire2/database' ;
import {AuthserviceProvider } from '../../providers/authservice/authservice' ;
import {VisitlistPage} from '../../pages/visitlist/visitlist' ;
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map" ;

/**
 * Generated class for the PatientsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-patients',
  templateUrl: 'patients.html',
})
export class PatientsPage {
  ptname : string ;
  ptlist = [] ;
  ptlist$ : FirebaseListObservable<any>  ;

  constructor(public navCtrl: NavController, public navParams: NavParams ,
     private afbb :AngularFireDatabase , private auth : AuthserviceProvider  ) {
  }

  ionViewDidLoad() {  
    let uid = this.auth.getActiveUser().uid ;
    this.ptlist$ = this.afbb.list(uid + '/patients') ;
    this.ptlist$.subscribe( data => this.ptlist = data ) ;
    console.log('ionViewDidLoad PatientsPage');
  }
  
  addPatient() {
     let uid = this.auth.getActiveUser().uid ; 
     let addpt$ = this.afbb.list(uid + '/patients').push(this.ptname) ; 
     addpt$.then( () => { console.log("done"); this.ptname = "" ; } ,  () => { console.log("Error")}  ) ; 
  }  

  gotoVisitList(pt) {
     this.navCtrl.push(VisitlistPage , { key : pt.$key , ptname : pt.$value }) ;

  } 
}

