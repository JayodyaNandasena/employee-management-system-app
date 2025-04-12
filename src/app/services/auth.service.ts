import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {Token, UserRoles} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private expiresAt: number | null = null;
  private userRole: UserRoles | null = null;
  private username: string | null = null;
  private employeeId: string | null = null;

  constructor() {
    this.loadToken();
  }

  isTokenExpired(): boolean {
    if (!this.expiresAt) {
      return false;
    }

    try {
      const now = Date.now().valueOf() / 1000;
      return this.expiresAt < now;
    } catch (error) {
      return true;
    }
  }

  public isLoggedIn(): boolean {
    return !!this.token && !this.isTokenExpired();
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
      this.expiresAt = null;
      this.userRole = null;
      this.username = null;
      this.employeeId = null;
      return;
    }

    try {
      const decodedToken: Token = jwtDecode(this.token);
      this.expiresAt = decodedToken.exp;
      this.userRole = decodedToken.role as UserRoles;
      this.username = decodedToken.sub;
      this.employeeId = decodedToken.id;
    } catch (error) {
      console.error('Invalid token', error);
      this.clearAuthData();
    }
  }

  getToken(): string | null {
    return this.token;
  }

  getRole(): UserRoles | null {
    return this.userRole;
  }

  getUsername(): string | null {
    return this.username;
  }

  getEmployeeId(): string | null {
    return this.employeeId;
  }

  clearToken(): void {
    localStorage.removeItem("authToken");
    this.clearAuthData();
  }

  private clearAuthData(): void {
    this.token = null;
    this.userRole = null;
    this.username = null;
    this.employeeId = null;
  }

  hasRole(roles: UserRoles[]): boolean {
    if (this.userRole) {
      return roles.includes(this.userRole);
    }
    return false;
  }
}
