import {Component} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthService} from "../../../services";
import {Location} from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  constructor(
    private readonly location: Location,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastr: ToastrService
  ) {
  }

  goBack() {
    this.location.back();
  }

  logout() {
    this.authService.clearToken();
    this.toastr.success('You have logged out. See you again soon!', 'Logged Out', {timeOut: 5000});
    this.router.navigate(['']);
  }
}
