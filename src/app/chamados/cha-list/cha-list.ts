import { Component, OnInit } from '@angular/core';
import { ChamadoService, Chamado } from '../chamado.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cha-list',
  standalone: false,
  templateUrl: './cha-list.html',
  styleUrl: './cha-list.css'
})
export class ChaList implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'local', 'status', 'departamento', 'dataAbertura'];
  dataSource: Chamado[] = [];

  constructor(
    private chamadoService: ChamadoService,
    private snackBar: MatSnackBar
  ) {}

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
}
