import { NgZone, Injectable } from "@angular/core";

declare const gapi: any;

@Injectable()
export class GapiService {
  public auth2: any;
  public loggedIn: any;
  public user: any;

  constructor(private zone: NgZone) {}

  // public loadAuth2(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.zone.run(() => {
  //       gapi.load("auth2", {});
  //     });
  //   });
  // }

  // public initAuth2(): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this.zone.run(() => {
  //       gapi.load("auth2", () => {});
  //     });
  //   });
  // }

  public onSignOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function() {
      console.log("User signed out.");
    });
  }
}
