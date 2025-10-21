import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepList } from './dep-list/dep-list';
import { DepForm } from './dep-form/dep-form';



@NgModule({
  declarations: [
    DepList,
    DepForm
  ],
  imports: [
    CommonModule
  ]
})
export class DepartamentosModule { }
