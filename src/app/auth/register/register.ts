import { Component } from '@angular/core';
import { Auth } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html'
})
export class Register {
userData = {
    name: '',
    password: '',
    password_confirmation: '' 
  };
  errorMessage: string | null = null; 

  constructor(private auth: Auth, private router: Router) {}

  onRegister(): void {
    this.errorMessage = null; 

    
    if (this.userData.password !== this.userData.password_confirmation) {
      this.errorMessage = 'As senhas não conferem.';
      return;
    }

    
    const dataToSend = {
      name: this.userData.name,
      password: this.userData.password
    };

    this.auth.register(dataToSend).subscribe(
      () => {
        this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
      },
      (error) => {
        console.error('Erro no registro:', error);
        this.errorMessage = error.error?.message || 'Ocorreu um erro durante o registro. Verifique os dados e tente novamente.';
      }
    );
  }
}
