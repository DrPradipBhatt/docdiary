import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamsetupPage } from './camsetup';

@NgModule({
  declarations: [
    CamsetupPage,
  ],
  imports: [
    IonicPageModule.forChild(CamsetupPage),
  ],
})
export class CamsetupPageModule {}
