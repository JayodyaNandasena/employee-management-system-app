import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginRequest} from '../../models';
import {ToastrService} from 'ngx-toastr';
import {NgIf} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginService, AuthService} from '../../services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  public loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  public request: LoginRequest = {
    username: '',
    password: ''
  }

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
    private readonly toastr: ToastrService) {
  }

  login() {
    this.request = {
      username: this.loginForm.controls.username?.value,
      password: this.loginForm.controls.password?.value
    };

    this.loginService.login(this.request)
      .subscribe({
        next: (data) => {
          if (data.token) {
            this.authService.setToken(data.token);

            this.toastr.success("Login Successful", "Welcome!", { timeOut: 4000 });

            this.router.navigateByUrl('/dashboard');
          } else {
            this.toastr.error("Login Failed", "Invalid credentials", { timeOut: 3000 });
          }
        },
        error: (error) => {
          if (error.status === 401) {
            this.toastr.error("Invalid Credentials", "Please check your username and password", { timeOut: 3000 });
          } else {
            this.toastr.error("Error", "Login Failed. Please try again later.", { timeOut: 3000 });
          }
        }
      });
  }

}
