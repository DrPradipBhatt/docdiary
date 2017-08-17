import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase , FirebaseListObservable } from 'angularfire2/database' ;
import {AuthserviceProvider } from '../../providers/authservice/authservice' ;
import {EditvisitPage} from  '../editvisit/editvisit' ; 

/**
 * Generated class for the VisitlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-visitlist',
  templateUrl: 'visitlist.html',
})
export class VisitlistPage {
      pt : any ;
      model = {
        visitdate  : "" ,
        diagnosis  :  "" ,
        photourl1  : ""  ,
        photourl2  : ""  , 
        photourl3  : ""  , 
        photourl4  : ""  ,
        photourl5  : ""  ,
     } ;
     visitlist = [] ;
     visitlist$ : FirebaseListObservable<any>  ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,
    private afbb :AngularFireDatabase , private auth : AuthserviceProvider) {
      this.pt = navParams.data   }

  ionViewDidLoad() {
    let uid = this.auth.getActiveUser().uid ;
    this.visitlist$ = this.afbb.list(uid + '/' + this.pt.key ) ;
    this.visitlist$.subscribe( data =>{  this.visitlist = data;
     console.log(this.visitlist) ; } ) ; 
  }  

  addvisit()  {
   
    let uid = this.auth.getActiveUser().uid ; 
    let addvisit$ = this.afbb.list(uid + '/' + this.pt.key ).push( this.model ) ;   
    addvisit$.then( () => { console.log("done"); this.model.visitdate  = "" ; } ,  () => { console.log("Error")}  ) ; 

  }
  editVisit(visit : any ) {  
   
   console.log(visit) ; 
   this.navCtrl.push(EditvisitPage , { pt : this.pt ,  visit :  visit }) ;
  }

}
