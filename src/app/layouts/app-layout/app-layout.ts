import { Component } from '@angular/core';
import { Auth } from '../../auth/auth'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.html',
  standalone: false,
  styleUrl: './app-layout.css'
})
export class AppLayoutComponent {

  constructor(private auth: Auth, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}