import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    authenticated = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials:any, callback?:any) {

        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.email + ':' + credentials.senha)
        } : {});

        this.http.get(`${environment.apiUrl}login`, {headers: headers}).subscribe(response => {
            if (response) {
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            return callback && callback();
        });

    }
}