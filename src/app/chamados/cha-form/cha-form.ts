import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChamadoService, ChamadoRequest } from '../chamado.service';
import { DepartamentoService, Departamento } from '../../departamentos/departamento.service';

@Component({
  selector: 'app-cha-form',
  standalone: false,
  templateUrl: './cha-form.html',
  styleUrl: './cha-form.css'
})
export class ChaForm implements OnInit {
  
  chamado: ChamadoRequest = {
    title: '',
    descr: '',
    local: '',
    status: 'Aberto', // Valor padrão
    departamentoId: null
  };

  departamentos: Departamento[] = [];

  constructor(
    private chamadoService: ChamadoService,
    private departamentoService: DepartamentoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Carregar departamentos para o <mat-select>
    this.departamentoService.getDepartamentos().subscribe(
      (data) => this.departamentos = data,
      (error) => console.error('Erro ao carregar departamentos', error)
    );
  }

  onSubmit() {
    if (!this.chamado.departamentoId) {
      this.snackBar.open('Selecione um departamento!', 'Fechar', { duration: 3000 });
      return;
    }

    this.chamadoService.addChamado(this.chamado).subscribe(
      () => {
        this.snackBar.open('Chamado aberto com sucesso!', 'Fechar', { duration: 2000 });
        this.router.navigate(['/chamados']);
      },
      (error) => {
        console.error('Erro ao abrir chamado:', error);
        this.snackBar.open('Erro ao abrir chamado. Verifique os dados.', 'Fechar', { duration: 3000 });
      }
    );
  }
}