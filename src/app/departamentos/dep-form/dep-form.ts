import { Component, OnInit } from '@angular/core';
import { DepartamentoService, Departamento } from '../departamento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dep-form',
  standalone: false,
  templateUrl: './dep-form.html',
  styleUrl: './dep-form.css',
})
export class DepForm implements OnInit {
  departamento: Departamento = {
    name: '',
  };

  constructor(
    private departamentoService: DepartamentoService,
    private router: Router,
    private route: ActivatedRoute, 
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.departamentoService.findById(Number(id)).subscribe((data) => {
        this.departamento = data;
      });
    }
  }

  onSubmit() {
    if (this.departamento.id) {
      this.departamentoService.update(this.departamento).subscribe(
        () => {
          this.snackBar.open('Atualizado com sucesso!', 'Fechar', { duration: 2000 });
          this.router.navigate(['/departamentos']);
        },
        () => this.snackBar.open('Erro ao atualizar.', 'Fechar', { duration: 3000 })
      );
    } else {
      this.departamentoService.addDepartamento(this.departamento).subscribe(
        () => {
          this.snackBar.open('Salvo com sucesso!', 'Fechar', { duration: 2000 });
          this.router.navigate(['/departamentos']);
        },
        () => this.snackBar.open('Erro ao salvar.', 'Fechar', { duration: 3000 })
      );
    }
  }
}
