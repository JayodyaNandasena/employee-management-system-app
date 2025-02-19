import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) {  }

  login(request: LoginRequest) {
    return this.http.post<{ token: string, expiresIn: number }>("http://localhost:8081/auth/login", request, {responseType:"json"});
  }


}
