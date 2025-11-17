import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Departamento {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class DepartamentoService {
  private apiUrl = 'http://localhost:8080/departamentos';

  constructor(private http: HttpClient) {}

  getDepartamentos(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl);
  }

  addDepartamento(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(`${this.apiUrl}`, departamento);
  }

  atualizarDepartamento(id: number, departamento: Departamento): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, departamento);
  }

  deleteDepartamento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
