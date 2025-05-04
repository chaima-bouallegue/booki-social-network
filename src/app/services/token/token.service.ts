import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private jwtHelper: JwtHelperService;

  constructor() {
    this.jwtHelper = new JwtHelperService();
  }

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  isTokenValid(): boolean {
    const token = this.token;
    if (!token) {
      return false;
    }
    // Check expiry date
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    if (isTokenExpired) {
      this.clearToken(); // Utilise la nouvelle méthode
      return false;
    }
    return true;
  }

  isTokenNotValid(): boolean {
    return !this.isTokenValid();
  }

  get userRoles(): string[] {
    const token = this.token;
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log(decodedToken.authorities);
      return decodedToken.authorities || [];
    }
    return [];
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }
}
