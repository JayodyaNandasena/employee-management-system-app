import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {SessionStorageService} from '../../services/session-storage.service';
import {Router} from '@angular/router';
import {LoginRequest} from '../../models/models';
import {ToastrService} from 'ngx-toastr';
import {NgIf} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {LoginService} from '../../services/login.service';
import {AuthService} from '../../services/auth.service';
import {UserRole} from '../../models/userRole';

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
    private readonly sessionStorageService: SessionStorageService,
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
    }

    this.loginService.login(this.request)
      .subscribe({
        next: (data) => {
          if (data.token) {
            this.authService.setToken(data.token);

            this.toastr.success("Login Successful", "Welcome!", {timeOut: 4000});

            const role: UserRole | null = this.authService.getRole();
            if (role === UserRole.USER) {
              this.router.navigate(['/dashboardNonManager']);
            }

            this.router.navigateByUrl('/dashboardManager');
          } else {
            this.toastr.error("Login Failed", "Invalid credentials", {timeOut: 3000});
          }
        },
        error: () => {
          this.toastr.error("Error", "Login Failed", {timeOut: 3000});
        }
      });
  }
}
