import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import { AuthService } from "../../../services";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {
  constructor(
    private readonly location: Location,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {}

  goBack() {
      this.location.back();
  }

  logout() {
    this.authService.clearToken();
    this.toastr.success('You have logged out. See you again soon!', 'Logged Out', { timeOut: 5000 });
    this.router.navigate(['']);
  }
}
