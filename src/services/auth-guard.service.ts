import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs";

import { GapiService } from "./gapi.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private _gapi: GapiService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // If user is not logged in redirect to login page
    if (!this._gapi.loggedIn) {
      this.router.navigate(["login"]);
    }

    // Otherwise return true
    return this._gapi.loggedIn;
  }
}
