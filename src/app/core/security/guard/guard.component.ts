import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppStateService } from 'src/app/app.state';

@Injectable()
export class GuardComponent implements CanActivate {
  USER_NAME_SESSION_ATTRIBUTE = 'authenticatedUser';

  constructor( private readonly router: Router, public appStateService: AppStateService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    console.log(state, route, 'rotas');
    if(this.appStateService.isUserLoggedIn()) {
      if(state.url === '/login') {
        this.router.navigate(['/inicio']);
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
