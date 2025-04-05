import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from "../services";
import {UserRoles} from "../models";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles: UserRoles[] = route.data['expectedRoles'];

    if (this.authService.isLoggedIn() && this.authService.hasRole(expectedRoles)) {
      return true;
    }

    this.router.navigateByUrl('/unauthorized', { replaceUrl: true });
    return false;
  }
}
