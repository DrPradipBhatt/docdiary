import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase , FirebaseListObservable } from 'angularfire2/database' ;
import {AuthserviceProvider } from '../../providers/authservice/authservice' ;
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map" ;

/**
 * Generated class for the DoctypePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctype',
  templateUrl: 'doctype.html',
})
export class DoctypePage {
  doctypename : string ;
  doctypelist = [] ;
  doctypelist$ : FirebaseListObservable<any>  ;

  constructor(public navCtrl: NavController, public navParams: NavParams ,
     private afbb :AngularFireDatabase , private auth : AuthserviceProvider  ) {
  }

  ionViewDidLoad() {  
    let uid = this.auth.getActiveUser().uid ;
    this.doctypelist$ = this.afbb.list(uid + '/doctypes') ;
    this.doctypelist$.subscribe( data => this.doctypelist = data ) ;
    console.log('ionViewDidLoad PatientsPage');
  }
  
  addDoctype() {
     let uid = this.auth.getActiveUser().uid ; 
     let addpt$ = this.afbb.list(uid + '/doctypes').push(this.doctypename) ; 
     addpt$.then( () => { console.log("done"); this.doctypename = "" ; } ,  () => { console.log("Error")}  ) ; 
  }
}
