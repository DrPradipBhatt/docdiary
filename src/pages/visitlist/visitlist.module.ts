import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitlistPage } from './visitlist';

@NgModule({
  declarations: [
    VisitlistPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitlistPage),
  ],
})
export class VisitlistPageModule {}
