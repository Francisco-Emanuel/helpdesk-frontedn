import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { AuthModule } from './auth/auth-module';
import { DepartamentosModule } from './departamentos/departamentos-module';
import { ChamadosModule } from './chamados/chamados-module';
// Importe o HTTP_INTERCEPTORS
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppLayoutComponent } from './layouts/app-layout/app-layout';

// Imports do Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

// 1. IMPORTE O NOVO INTERCEPTADOR
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    App,
    AppLayoutComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule,
    DepartamentosModule,
    ChamadosModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    
    // 2. ADICIONE O INTERCEPTADOR AOS PROVIDERS
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true // "multi: true" diz que podemos ter múltiplos interceptors
    }
  ],
  bootstrap: [App]
})
export class AppModule { }