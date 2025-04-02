import {environment} from '../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoginRequest} from "../models";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) {
  }

  login(request: LoginRequest) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<{ token: string, expiresIn: number }>(
      `${environment.baseUrl}/auth/login`,
      request,
      { headers: headers, responseType: 'json' }
    );
  }

}
