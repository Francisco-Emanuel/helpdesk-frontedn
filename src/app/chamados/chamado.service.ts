import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Chamado {
  id?: number;
  title: string;
  descr: string;
  local: string;
  status: string;
  departamentoId: BigInteger;
}

@Injectable({
  providedIn: 'root' 
})
export class DepartamentoService {
  private apiUrl = 'http://localhost:8080/chamados'; 

  constructor(private http: HttpClient) { }

  getChamados(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.apiUrl);
  }

  addChamado(chamado: Chamado): Observable<Chamado> {
    return this.http.post<Chamado>(this.apiUrl, chamado);
  }

}