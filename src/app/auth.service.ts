import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = true;
  private username = 'admin';
  private password = 'admin';

  private savelogin(): void {
    localStorage?.setItem('login', '1'); //for this quick demo
  }

  private destroylogin(): void {
    localStorage?.setItem('login', '0'); //for this quick demo
  }

  constructor(private router: Router) {}
  
  login(username: string, password: string): boolean {
    if (username === this.username && password === this.password) {
      this.savelogin();
      this.isAuthenticated = true;
      this.router.navigate(['/']);
      return true;
    }
    return false;
  }

  logout(): void {
    this.destroylogin();
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated = (localStorage?.getItem('login') == '1' ? true : false);
  }
}
