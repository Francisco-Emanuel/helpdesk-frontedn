import { Component } from '@angular/core';
import { DepartamentoService, Departamento } from '../departamento.service'; // Importe o serviço
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dep-form',
  standalone: false,
  templateUrl: './dep-form.html',
  styleUrl: './dep-form.css'
})
export class DepForm {
  
  departamento: Departamento = {
    name: ''
  };

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    this.departamentoService.addDepartamento(this.departamento).subscribe(
      (novoDepartamento) => {
        console.log('Departamento salvo:', novoDepartamento);
        this.snackBar.open('Departamento salvo com sucesso!', 'Fechar', { duration: 2000 });
        this.router.navigate(['/departamentos']); 
      },
      (error) => {
        console.error('Erro ao salvar:', error);
        this.snackBar.open('Erro ao salvar departamento.', 'Fechar', { duration: 3000 });
      }
    );
  }
}