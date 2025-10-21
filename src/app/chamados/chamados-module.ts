import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChaList } from './cha-list/cha-list';
import { ChaForm } from './cha-form/cha-form';



@NgModule({
  declarations: [
    ChaList,
    ChaForm
  ],
  imports: [
    CommonModule
  ]
})
export class ChamadosModule { }
