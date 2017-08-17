import { Injectable } from '@angular/core';
import {AngularFireDatabase , FirebaseListObservable , FirebaseObjectObservable } from 'angularfire2/database' ;
import {AuthserviceProvider } from '../../providers/authservice/authservice' ;
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PatientserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PatientserviceProvider {

  constructor(public http: Http, 
    private afbb :AngularFireDatabase , private auth : AuthserviceProvider ) {
   
  }
  
   addPatient() {


   }  
   addVisit() {
     
   }
}
