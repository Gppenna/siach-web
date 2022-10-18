import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

    authenticate(credentials:any, callback?:any): Observable<any> {

        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.email + ':' + credentials.senha)
        } : {});

        return this.http.get(`${environment.apiUrl}login`, {headers: headers});

    }

    logout() {
        return this.http.post(`${environment.apiUrl}logout`, {});
    }

}