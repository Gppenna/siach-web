import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStateService } from 'src/app/app.state';
import { AuthenticationService } from './authentication-service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const xhr = req.clone({
          headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
        });
        return next.handle(xhr);
      }
}