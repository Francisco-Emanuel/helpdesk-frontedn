import { Component, OnInit } from '@angular/core';
import { DepartamentoService, Departamento } from '../departamento.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dep-list',
  standalone: false,
  templateUrl: './dep-list.html',
  styleUrl: './dep-list.css'
})
export class DepList implements OnInit { 
  
  displayedColumns: string[] = ['name', 'acoes'];
  dataSource: Departamento[] = []; 

  constructor(
    private departamentoService: DepartamentoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDepartamentos(); 
  }

  loadDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.error('Erro ao buscar departamentos', error);
        this.snackBar.open('Erro ao carregar departamentos.', 'Fechar', { duration: 3000 });
      }
    );
  }

  onEdit(element: Departamento): void {
    console.log('Editar:', element);
  }

  onDelete(element: Departamento): void {
    if (element.id && confirm(`Deseja realmente excluir "${element.name}"?`)) {
      this.departamentoService.deleteDepartamento(element.id).subscribe(
        () => {
          this.snackBar.open('Departamento excluído com sucesso!', 'Fechar', { duration: 2000 });
          this.loadDepartamentos(); 
        },
        (error) => {
          console.error('Erro ao excluir', error);
          this.snackBar.open('Erro ao excluir departamento.', 'Fechar', { duration: 3000 });
        }
      );
    }
  }
}