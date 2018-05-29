import { NgZone, Injectable } from "@angular/core";

declare const gapi: any;

@Injectable()
export class GapiService {
  public auth2: any;
  public loggedIn: any;
  public user: any;

  constructor(private zone: NgZone) {}

  public onSignOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      location.assign("/login");
    });
  }
}
