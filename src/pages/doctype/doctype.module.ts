import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctypePage } from './doctype';

@NgModule({
  declarations: [
    DoctypePage,
  ],
  imports: [
    IonicPageModule.forChild(DoctypePage),
  ],
})
export class DoctypePageModule {}
