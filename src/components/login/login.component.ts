import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";

import { GapiService } from "../../services/gapi.service";
declare const gapi: any;
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {
  private client_id = "570679171536-v74vbm4errmjkrf6820nngprk6dipjqf.apps.googleusercontent.com";

  constructor(
    private _zone: NgZone,
    private _router: Router,
    private _gapi: GapiService
  ) {}

  ngAfterViewInit() {
    this.gapiInit();
  }

  public gapiInit() {
    // Load google api Auth2 libray
    gapi.load("auth2", () => {
      // Init Auth object
      this._gapi.auth2 = gapi.auth2.init({
        client_id: this.client_id,
        scope: "profile email"
      });

      this.attachSignin(document.getElementById("loginBtn"));
    });
  }

  public attachSignin(element) {
    this._zone.runOutsideAngular(() => {
      // Attaches sign in functionality to button
      this._gapi.auth2.attachClickHandler(
        element,
        {},
        user => {
          this._zone.run(() => {
            const gData = user.getBasicProfile();
            this._gapi.user = gData.getName();
            // Update user loggin status
            this._gapi.loggedIn = true;

            this._router.navigate(["/dashboard"]);
          });
          // Save user information from profile in service
        },
        error => {
          console.log("ERROR", JSON.stringify(error, undefined, 2));
        }
      );
    });
  }

  ngAfterViewI;
}
