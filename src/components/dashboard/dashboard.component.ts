import { Component } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";

import { GapiService } from "../../services/gapi.service";
import { BankingService } from "../../services/banking.service";

import { IAccount, ITransactions } from "../../interfaces";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  public account: IAccount;
  public transactions: ITransactions[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _bankService: BankingService,
    private _gapi: GapiService
  ) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        const data = this.route.snapshot.data.card;
        this.account = data[0];
        this.transactions = data[1];
        console.log(data);
      }
    });
  }

  public onSignOut() {
    this._gapi.onSignOut();
  }
}
