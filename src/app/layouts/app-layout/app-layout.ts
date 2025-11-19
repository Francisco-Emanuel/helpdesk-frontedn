import { Component, OnInit } from '@angular/core';
import { Auth } from '../../auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.html',
  standalone: false,
  styleUrl: './app-layout.css',
})
export class AppLayoutComponent implements OnInit {
  userName: string | null = null;
  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.auth.getUserName();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
