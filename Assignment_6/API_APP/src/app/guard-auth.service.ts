import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthService implements CanActivate {

  // Initialization

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  // Methods

  canActivate(): boolean {
    console.log("guard..");
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}