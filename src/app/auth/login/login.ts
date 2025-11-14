import { Component } from '@angular/core';
import { Auth } from '../auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  credentials = {
    name: "",
    password: ""
  }

  constructor(private auth: Auth, private router: Router) {}

  onLogin(): void {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Erro no login:', error);
      }
    );
  }
}
