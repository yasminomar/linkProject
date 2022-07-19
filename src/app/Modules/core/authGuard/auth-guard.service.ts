import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router,private auth:AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {   
    if(this.auth.isLoggedIn()){
      const token = this.auth.getToken();
      const tokenInfo = this.auth.getDecodedAccessToken(token!);
        if(tokenInfo["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Customer"){
            return true;
        }
    }
    this.router.navigate(['/auth/login']);
     return false;
  }
}
