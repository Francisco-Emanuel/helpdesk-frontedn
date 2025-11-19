import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChamadoService, ChamadoRequest, Chamado } from '../chamado.service';
import { DepartamentoService, Departamento } from '../../departamentos/departamento.service';

@Component({
  selector: 'app-cha-form',
  standalone: false,
  templateUrl: './cha-form.html',
  styleUrl: './cha-form.css',
})
export class ChaForm implements OnInit {
  chamado: ChamadoRequest & { id?: number } = {
    title: '',
    descr: '',
    local: '',
    status: 'Aberto',
    departamentoId: null,
  };

  departamentos: Departamento[] = [];

  constructor(
    private chamadoService: ChamadoService,
    private departamentoService: DepartamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.departamentoService.getDepartamentos().subscribe(
      (data) => (this.departamentos = data),
      (error) => console.error('Erro ao carregar departamentos', error)
    );

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.chamadoService.findById(Number(id)).subscribe((data: Chamado) => {
        this.chamado.id = data.id;
        this.chamado.title = data.title;
        this.chamado.descr = data.descr;
        this.chamado.local = data.local;
        this.chamado.status = data.status;
        this.chamado.departamentoId = data.departamento?.id ?? null;
      });
    }
  }

  onSubmit() {
    if (!this.chamado.departamentoId) {
      this.snackBar.open('Selecione um departamento!', 'Fechar', { duration: 3000 });
      return;
    }

    if (this.chamado.id) {
      this.chamadoService.update(this.chamado as ChamadoRequest & { id: number }).subscribe(
        () => {
          this.snackBar.open('Chamado atualizado com sucesso!', 'Fechar', { duration: 2000 });
          this.router.navigate(['/chamados']);
        },
        (error) => {
          console.error('Erro ao atualizar chamado:', error);
          this.snackBar.open('Erro ao atualizar chamado. Verifique os dados.', 'Fechar', {
            duration: 3000,
          });
        }
      );
    } else {
      this.chamadoService.addChamado(this.chamado as ChamadoRequest).subscribe(
        () => {
          this.snackBar.open('Chamado aberto com sucesso!', 'Fechar', { duration: 2000 });
          this.router.navigate(['/chamados']);
        },
        (error) => {
          console.error('Erro ao abrir chamado:', error);
          this.snackBar.open('Erro ao abrir chamado. Verifique os dados.', 'Fechar', {
            duration: 3000,
          });
        }
      );
    }
  }
}
