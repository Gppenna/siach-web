import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppStateService } from 'src/app/app.state';
import { AuthenticationService } from './authentication-service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor() { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      console.log(document.cookie);
        const xhr = req.clone({
          withCredentials: true
        });
        return next.handle(xhr);
      }
}