import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('authToken');

    let clonedRequest = request;
    if (token) {
      clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle token expiration
        if (error.status === 401) {
          // Redirect to log in
          this.router.navigate([''], {queryParams: {sessionExpired: true}});

          // Clear invalid token
          localStorage.removeItem('authToken');

          // Prevent error propagation to .subscribe()
          return EMPTY;
        }

        return throwError(() => error);
      })
    );
  }
}
