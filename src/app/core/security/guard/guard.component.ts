import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppStateService } from 'src/app/app.state';


@Injectable()
export class GuardComponent implements CanActivate {
  USER_EMAIL_SESSION_ATTRIBUTE = 'authenticatedUserEmail';

  constructor( private readonly router: Router, public appStateService: AppStateService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    console.log(state, route, 'rotas');
    this.appStateService.isUserLoggedIn().subscribe((user:any) => {
      console.log(user, 'user');
      if(user.email != null) {
        this.appStateService.state.userData = user;
        sessionStorage.setItem(this.USER_EMAIL_SESSION_ATTRIBUTE, user.email);
        if(
          state.url === '/login' ||
          state.url === '/registrar' ||
          (state.url === '/admin' && this.appStateService.getAuthority() !== '1')
          ) {
          this.router.navigate(['/inicio']);
        }
      }
      else {
        sessionStorage.removeItem(this.USER_EMAIL_SESSION_ATTRIBUTE);
        if(state.url === '/login') {
          this.router.navigate(['/login']);
        }
        else if(state.url === '/registrar') {
          this.router.navigate(['/registrar']);
        }
        else {
          this.router.navigate(['/login']);
        }
      }
    });
    return sessionStorage.getItem(this.USER_EMAIL_SESSION_ATTRIBUTE) != null ? true : false;
  }

}
