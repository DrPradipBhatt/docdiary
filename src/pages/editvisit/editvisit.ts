import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController} from 'ionic-angular';
import firebase from "firebase" ;
import {AngularFireDatabase , FirebaseListObservable } from 'angularfire2/database' ;
import {AuthserviceProvider } from '../../providers/authservice/authservice' ;
import jic from '../../shared/jic' ;

/**
 * Generated class for the EditvisitPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editvisit',
  templateUrl: 'editvisit.html',
})
export class EditvisitPage {  
  pt : any ;
  visit : any ;
  photonum : any ;  
  loading  : any  ;

  constructor(public navCtrl: NavController, public navParams: NavParams , 
    private afbb :AngularFireDatabase , private auth : AuthserviceProvider ,
       private loadingCtrl: LoadingController, ) {
    this.pt = navParams.get("pt") ;
    this.visit = navParams.get("visit" )  ;  

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditvisitPage');
  } 
  takephoto(no) {  
    this.photonum = no ;
    let uploadButton = document.getElementById("btnUpload");
    uploadButton.click();
  }
  // style="display:none;"
  onBtnUploadChange(event:any){  
    
     this.loading = this.loadingCtrl.create({
      content: 'Updating Image ..'
    });  
    let targetFile = event.srcElement.files[0];
    let uploader = document.getElementById("btnUpload");  
     this.loading.present() ;
     this.pushUpload(targetFile) ;

 //    this.pushUpload2(targetFile) ;  Some Bug in compression 
}
pushUpload2(upload : any ) {
  let compressionfactor = 20 ;
  // This will be from saved data in local storage in future 
   var fileReader = new FileReader();
       fileReader.onload = (event : any )=> {
         var img = new Image() ;
       img.src=event.target.result;
       let blob = jic.compressblob(img , compressionfactor , 'jpg') ;
       this.uploadblob(blob) ;
 }  ;
      fileReader.readAsDataURL(upload);
}   
// No Compresssion     
uploadblob(blob : any) {   
  const storageRef = firebase.storage().ref(); 
  let uid = this.auth.getActiveUser().uid ;
  let filename = new Date().getTime() + '.jpg' ; 
  let path = uid + '/' + this.pt.key  + '/' + filename  ; 
  const uploadTask = storageRef.child(path).put(blob);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) =>  {
      // upload in progress
      let snap = snapshot as firebase.storage.UploadTaskSnapshot ;
     
    },
    (error) => {
      // upload failed
      console.log(error) ;
      this.loading.dismiss() ; 
    },
    () => {  
      this.loading.dismiss() ;
      // upload success
      let url = uploadTask.snapshot.downloadURL
      this.saveFileData(url , filename )
      return undefined
    }
  );


}
pushUpload(upload: any ) {
  const storageRef = firebase.storage().ref(); 
  let uid = this.auth.getActiveUser().uid ;
    let filename = new Date().getTime() + '.jpg' ; 
  let path = uid + '/' + this.pt.key  + '/' + filename ; 
  const uploadTask = storageRef.child(path).put(upload);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) =>  {
      // upload in progress
      let snap = snapshot as firebase.storage.UploadTaskSnapshot ;
     
    },
    (error) => {
      // upload failed
      console.log(error) ;
      this.loading.dismiss() ;
    },
    () => {
      // upload success
      this.loading.dismiss() ;
      let url = uploadTask.snapshot.downloadURL
      this.saveFileData(url, filename   )  ; 
      return undefined
    }
  );
}  
private saveFileData(url , filename  ) {
  let updobject : any ;
    switch (this.photonum)  {
     case  1  : 
       updobject = { photourl1 : url  , filename1 : filename }  ; 
       break ;  
    case  2  : 
       updobject = { photourl2 : url  , filename2 : filename }  ; 
       break ;  
  case  3  : 
       updobject = { photourl3 : url  , filename3 : filename }  ; 
       break ;  
  case  4  : 
       updobject = { photourl4 : url  , filename4 : filename }  ; 
       break ;  
  case  5  : 
       updobject = { photourl5 : url  , filename5 : filename }  ; 
       break ;  
   default :  

           updobject = { photourl1 : url  , filename1 : filename }  ; 
       break ;
       

    } 

  let uid = this.auth.getActiveUser().uid ; 
  let editvisit$ = this.afbb.object(uid + '/' + this.pt.key + '/' + this.visit.$key  )
  .update( updobject  ) ;   
  editvisit$.then( () => { this.updatephotourl(url , filename) ;  } ,  () => { console.log("Error")}  ) ; 

//   this.db.list(`${this.basePath}/`).push(upload);
}  
  updatephotourl(url,filename) {    

    switch (this.photonum)  {
     case  1  : 
       this.visit.photourl1 = url   ;
       this.visit.filename1 = filename  ; 
       break ;  
     case  2  : 
       this.visit.photourl2 = url   ;
       this.visit.filename2 = filename  ; 
       break ;  
     case  3  : 
       this.visit.photourl3 = url   ;
       this.visit.filename3 = filename  ; 
       break ;  
     case  4  : 
       this.visit.photourl4 = url   ;
       this.visit.filename4 = filename  ; 
       break ;  
     case  5  : 
       this.visit.photourl5 = url   ;
       this.visit.filename = filename  ; 
       break ;  
     default   : 
       this.visit.photourl1 = url   ;
       this.visit.filename1 = filename  ; 
       break ;  
       
   
    }
}

updatevisit() {
  let uid = this.auth.getActiveUser().uid ; 
  let editvisit$ = this.afbb.object(uid + '/' + this.pt.key + '/' + this.visit.$key  )
   .update( { diagnosis : this.visit.diagnosis  } ) ;   
  editvisit$.then( () => { console.log("done") ;  } ,  () => { console.log("Error")}  ) ; 
 
}




}
