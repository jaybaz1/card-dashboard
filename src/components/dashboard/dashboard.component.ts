import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

import { GapiService } from "../../services/gapi.service";
import { BankingService } from "../../services/banking.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private _bankService: BankingService,
    private _gapi: GapiService
  ) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this._bankService.balance().subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
      }
    });
  }

  ngOnInit() {}
  ngAfterViewInit() {
    console.log("fired");
  }

  public onSignOut() {
    this._gapi.onSignOut();
  }
}
