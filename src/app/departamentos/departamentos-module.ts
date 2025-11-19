import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepList } from './dep-list/dep-list';
import { DepForm } from './dep-form/dep-form';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    DepList,
    DepForm
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
})
export class DepartamentosModule { }
