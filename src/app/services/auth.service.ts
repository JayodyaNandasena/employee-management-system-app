import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {Token} from '../models/token';
import {UserRole} from '../models/userRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private userRole: UserRole | null = null;
  private username: string | null = null;

  constructor() {
    this.loadToken();
  }

  private loadToken(): void {
    const storedToken: string | null = localStorage.getItem("authToken");
    if (storedToken) {
      this.setToken(storedToken, false);
    }
  }

  setToken(token: string, store: boolean = true): void {
    if (store) {
      localStorage.setItem("authToken", token);
    }

    this.token = token;
    this.decodeToken();
  }

  private decodeToken(): void {
    if (!this.token) {
      this.userRole = null;
      this.username = null;
      return;
    }

    try {
      const decodedToken: Token = jwtDecode(this.token);
      this.userRole = decodedToken.role as UserRole;
      this.username = decodedToken.sub;
    } catch (error) {
      console.error('Invalid token', error);
      this.clearAuthData();
    }
  }

  getToken(): string | null {
    return this.token;
  }

  getRole(): UserRole | null {
    return this.userRole;
  }

  getUsername(): string | null {
    return this.username;
  }

  clearToken(): void {
    localStorage.removeItem("authToken");
    this.clearAuthData();
  }

  private clearAuthData(): void {
    this.token = null;
    this.userRole = null;
    this.username = null;
  }

  hasRole(roles: UserRole[]): boolean {
    if (this.userRole) {
      return roles.includes(this.userRole);
    }
    return false;
  }
}
