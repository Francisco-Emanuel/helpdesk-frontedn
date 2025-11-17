import { Component, OnInit } from '@angular/core';
import { DepartamentoService, Departamento } from '../departamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-dep-list',
  standalone: false,
  templateUrl: './dep-list.html',
  styleUrl: './dep-list.css',
})
export class DepList implements OnInit {
  displayedColumns: string[] = ['name', 'acoes'];
  dataSource: Departamento[] = [];

  constructor(
    private departamentoService: DepartamentoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDepartamentos();
  }

  loadDepartamentos(): void {
    this.departamentoService.getDepartamentos().subscribe(
      (data) => (this.dataSource = data),
      (error) => this.snackBar.open('Erro ao carregar departamentos.', 'Fechar', { duration: 3000 })
    );
  }

  onEdit(element: Departamento): void {
    this.router.navigate(['/departamentos', element.id]);
  }

  onDelete(element: Departamento): void {
    if (element.id && confirm(`Deseja excluir "${element.name}"?`)) {
      this.departamentoService.deleteDepartamento(element.id).subscribe(
        () => {
          this.snackBar.open('Excluído com sucesso!', 'Fechar', { duration: 2000 });
          this.loadDepartamentos();
        },
        () => this.snackBar.open('Erro ao excluir.', 'Fechar', { duration: 3000 })
      );
    }
  }
}
