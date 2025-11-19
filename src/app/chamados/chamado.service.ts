import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../departamentos/departamento.service';

export interface Chamado {
  id?: number;
  title: string;
  descr: string;
  local: string;
  status: string;
  dataAbertura?: string;
  tecnico?: string;
  departamento?: Departamento;
  usuario?: any;
}

export interface ChamadoRequest {
  title: string;
  descr: string;
  local: string;
  status: string;
  departamentoId: number | null; 
}

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {
  private apiUrl = 'http://localhost:8080/chamados';

  constructor(private http: HttpClient) { }

  getChamados(): Observable<Chamado[]> {
    return this.http.get<Chamado[]>(this.apiUrl);
  }

  addChamado(chamado: ChamadoRequest): Observable<Chamado> {
    return this.http.post<Chamado>(this.apiUrl, chamado);
  }
}
