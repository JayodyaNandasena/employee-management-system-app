import {Injectable} from '@angular/core';
import {jwtDecode} from 'jwt-decode';
import {Token} from '../models/token';
import {UserRole} from '../models/userRole';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getRole(): UserRole | null {
    const token: string | null = this.getToken();
    if (token) {
      try {
        const decodedToken: Token = jwtDecode(token);
        return decodedToken.role as UserRole;
      } catch (error) {
        console.error('Invalid token', error);
        return null;
      }
    }
    return null;
  }
}
