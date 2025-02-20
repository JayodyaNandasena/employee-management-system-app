import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) {  }

  login(request: LoginRequest) {
    console.log(environment.baseUrl);
    return this.http.post<{ token: string, expiresIn: number }>(`${environment.baseUrl}/auth/login`, request, {responseType:"json"});
  }
}
