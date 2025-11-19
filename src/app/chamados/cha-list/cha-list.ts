import { Component, OnInit } from '@angular/core';
import { ChamadoService, Chamado } from '../chamado.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cha-list',
  standalone: false,
  templateUrl: './cha-list.html',
  styleUrl: './cha-list.css',
})
export class ChaList implements OnInit {
  displayedColumns: string[] = [
    'id',
    'title',
    'local',
    'status',
    'departamento',
    'dataAbertura',
    'acoes',
  ];
  dataSource: Chamado[] = [];

  constructor(private chamadoService: ChamadoService, private snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.loadChamados();
  }

  loadChamados(): void {
    this.chamadoService.getChamados().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.error('Erro ao buscar chamados', error);
        this.snackBar.open('Erro ao carregar chamados.', 'Fechar', { duration: 3000 });
      }
    );
  }
  onEdit(element: Chamado): void {
    this.router.navigate(['/chamados/editar', element.id]);
  }

  // NOVO: Lógica de exclusão
  onDelete(element: Chamado): void {
    if (element.id && confirm(`Deseja excluir o chamado "${element.title}"?`)) {
      this.chamadoService.deleteChamado(element.id).subscribe(
        () => {
          this.snackBar.open('Chamado excluído com sucesso!', 'Fechar', { duration: 2000 });
          this.loadChamados();
        },
        () => this.snackBar.open('Erro ao excluir o chamado.', 'Fechar', { duration: 3000 })
      );
    }
  }
}
