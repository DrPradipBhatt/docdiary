import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase , FirebaseListObservable } from 'angularfire2/database' ;
import {AuthserviceProvider } from '../../providers/authservice/authservice' ;
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map" ;

/**
 * Generated class for the DiseasesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-diseases',
  templateUrl: 'diseases.html',
})
export class DiseasesPage {
  diseasename : string ;
  diseaselist = [] ;
  diseaselist$ : FirebaseListObservable<any>  ;

  constructor(public navCtrl: NavController, public navParams: NavParams ,
     private afbb :AngularFireDatabase , private auth : AuthserviceProvider  ) {
  }

  ionViewDidLoad() {  
    let uid = this.auth.getActiveUser().uid ;
    this.diseaselist$ = this.afbb.list(uid + '/diseases') ;
    this.diseaselist$.subscribe( data => this.diseaselist = data ) ;
    console.log('ionViewDidLoad PatientsPage');
  }
  
 addDisease() {
     let uid = this.auth.getActiveUser().uid ; 
     let add$ = this.afbb.list(uid + '/diseases').push(this.diseasename) ; 
     add$.then( () => { console.log("done"); this.diseasename = "" ; } ,  () => { console.log("Error")}  ) ; 
  }
}
