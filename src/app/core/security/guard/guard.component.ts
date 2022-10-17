import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class GuardComponent implements CanActivate {
  USER_NAME_SESSION_ATTRIBUTE = 'authenticatedUser';

  constructor( private readonly router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if(sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE)) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
