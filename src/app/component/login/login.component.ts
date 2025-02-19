import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SessionStorageService } from '../../services/session-storage.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/models';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent{
  public loginForm = new FormGroup({
    username : new FormControl("",Validators.required),
    password : new FormControl("",Validators.required)
  })

  public request: LoginRequest = {
    username: '',
    password: ''
  }

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private http: HttpClient,
    private readonly loginService:LoginService,
    private toastr: ToastrService) { }

  login() {
    this.request = {
      username: this.loginForm.controls.username?.value,
      password: this.loginForm.controls.password?.value
    }

    this.loginService.login(this.request)
      .subscribe({
        next: (data) => {
          if (data.token) {
            localStorage.setItem("authToken", data.token); // Store token
            this.toastr.success("Login Successful", "Welcome!", { timeOut: 2000 });
            //this.router.navigate(['/dashboard']); // Redirect on success
          } else {
            this.toastr.error("Login Failed", "Invalid credentials", { timeOut: 2000 });
          }
        },
        error: () => {
          this.toastr.error("Error", "Login Failed", { timeOut: 2000 });
        }
      });
  }
}
