import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    if (this.userService.checkLoggedIn()) {
      return of(true);
    } else {
      // If not logged in, navigate to the signup page and pass the return URL as a query parameter
      const returnUrl = state.url;
      const urlTree = this.router.createUrlTree(['/signup'], {
        queryParams: { returnUrl },
      });
      return of(urlTree);
    }
  }
}
