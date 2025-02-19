import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: Token = jwtDecode(token);
        return decodedToken.role;
      } catch (error) {
        console.error('Invalid token', error);
        return null;
      }
    }
    return null;
  }
}
