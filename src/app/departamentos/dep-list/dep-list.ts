import { Component, inject, model, OnInit } from '@angular/core';
import { DepartamentoService, Departamento } from '../departamento.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  name: string;
}

@Component({
  selector: 'app-dep-list',
  standalone: false,
  templateUrl: './dep-list.html',
  styleUrl: './dep-list.css',
})
export class DepList implements OnInit {
  displayedColumns: string[] = ['name', 'acoes'];
  dataSource: Departamento[] = [];

  readonly name = model('');
  readonly dialog = inject(MatDialog);

  constructor(
    private departamentoService: DepartamentoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDepartamentos();
  }

  openDialog(element: Departamento): void {
    if (!element.id) return;
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { id: element.id, name: element.name },
    });

    dialogRef.afterClosed().subscribe((new_name: string | undefined) => {
      console.log('The dialog was closed, result:', new_name);

      if (new_name && new_name.trim().length > 0 && new_name.trim() !== element.name) {
        const updatedDepartamento: Departamento = {
          id: element.id,
          name: new_name.trim(),
        };

        this.departamentoService.update(updatedDepartamento).subscribe(
          () => {
            this.snackBar.open('Atualizado com sucesso!', 'Fechar', { duration: 2000 });
            this.loadDepartamentos();
          },
          () => this.snackBar.open('Erro ao atualizar.', 'Fechar', { duration: 3000 })
        );
      } else if (new_name !== undefined) {
        this.snackBar.open('Nenhuma alteração feita ou nome inválido.', 'Fechar', {
          duration: 2000,
        });
      }
    });
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


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  readonly dialogRef = inject(MatDialogRef<DialogOverviewExampleDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly name = model(this.data.name);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
