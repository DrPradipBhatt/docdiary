import { Component, OnInit  } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AuthserviceProvider } from '../../providers/authservice/authservice' ;
import {PatientsPage} from '../patients/patients'  ;
import {SetupPage} from '../setup/setup' ;
import {DiseasesPage} from '../diseases/diseases' ;  
import {CamsetupPage} from '../camsetup/camsetup' ;
import {DoctypePage} from '../doctype/doctype' ;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  implements OnInit{
   patientPage = PatientsPage ;
  diseasePage = DiseasesPage ;
  setupPage   = SetupPage ;
  camsetupPage = CamsetupPage ;
  doctypePage = DoctypePage ;
  
  constructor(public navCtrl: NavController ,private  auth : AuthserviceProvider ) {

  }  
   ngOnInit() {
        
     }  
  
     goPage(page : any ) {

        this.navCtrl.push(page) ;
     }
     logout() {
      this.auth.logout() ;

     }
   
}
