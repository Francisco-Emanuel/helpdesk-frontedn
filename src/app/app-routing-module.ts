import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Login } from './auth/login/login';
import { Register } from './auth/register/register';
import { DepList } from './departamentos/dep-list/dep-list';
import { ChaList } from './chamados/cha-list/cha-list';
import { DepForm } from './departamentos/dep-form/dep-form';
import { ChaForm } from './chamados/cha-form/cha-form';

import { AppLayoutComponent } from './layouts/app-layout/app-layout';

const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'departamentos', component: DepList },
      { path: 'departamentos/criar', component: DepForm },
      { path: 'departamentos/editar/:id', component: DepForm },

      { path: 'chamados', component: ChaList },
      { path: 'chamados/criar', component: ChaForm },
      { path: 'chamados/editar/:id', component: ChaForm },

      { path: '', redirectTo: '/chamados', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
