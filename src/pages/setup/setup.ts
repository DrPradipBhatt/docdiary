import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase , FirebaseObjectObservable } from 'angularfire2/database' ;
import {AuthserviceProvider } from '../../providers/authservice/authservice' ;
import { Observable } from 'rxjs/Rx';
import "rxjs/add/operator/map" ;
/**
 * Generated class for the SetupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setup',
  templateUrl: 'setup.html',
})
export class SetupPage {
  docname : string ;
  docqualification : string ;
  clinicname : string ; 
  setup$ : FirebaseObjectObservable<any> ;
  
  constructor(public navCtrl: NavController, public navParams: NavParams , 
    private auth : AuthserviceProvider , private afdb : AngularFireDatabase ) {
  }

  ionViewWillLoad() {  
     let uid = this.auth.getActiveUser().uid ;
    this.setup$ = this.afdb.object(uid + '/setup') ;
    this.setup$.subscribe( data => { 
      if (data) {
        this.docname = data.docname ;
        this.docqualification = data.docqualification ;
        this.clinicname = data.clinicname ;
      } else {
         this.docname = "" ;
        this.docqualification = "" ;
        this.clinicname = "" ; 
     

          }

        } 
           
      ) ;
 }

 onSubmit(f) {
     let uid = this.auth.getActiveUser().uid ;
    let setup2$ : FirebaseObjectObservable<any>  = this.afdb.object(uid + '/setup') ;
        setup2$.update( { docname : this.docname , docqualification : this.docqualification , 
                       clinicname : this.clinicname } ).then( () => console.log("data updated")) ;
 }

}
