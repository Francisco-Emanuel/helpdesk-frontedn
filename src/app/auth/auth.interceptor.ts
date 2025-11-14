import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from './auth'; // Importe seu serviço Auth

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: Auth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1. Pegue o token do seu serviço
    const authToken = this.authService.getToken();

    // 2. Verifique se é uma requisição para a nossa API
    //    (Não queremos enviar o token para outros sites)
    //    e se o token existe.
    if (authToken && req.url.startsWith('http://localhost:8080')) {
      
      // 3. Clone a requisição e adicione o header de Autorização
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      // 4. Envie a requisição clonada
      return next.handle(authReq);
    }

    // 5. Se não tiver token ou não for para nossa API,
    //    apenas envie a requisição original.
    return next.handle(req);
  }
}