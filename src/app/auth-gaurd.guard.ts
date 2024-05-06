import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdGuard implements CanActivate {

  constructor( private router: Router,){}
  
  canActivate(
    
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (sessionStorage.getItem("Role") == "User" && route.data["Role"] == "User") {
        //debugger
        //console.log(sessionStorage.getItem("Role"));
        //console.log(sessionStorage.getItem("Role") == "User")
        //this.router.navigateByUrl('/UserDashboard'); 
        return true;
      }
      else if (sessionStorage.getItem("Role") == "Admin" && route.data["Role"] == "Admin") {

        //this.router.navigateByUrl('/AdminDashboard'); 
        return true;
      }
      else{
        this.router.navigateByUrl("/**");
        return false;

      }
  }  
}
  

