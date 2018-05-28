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
  public filteredTransactions: ITransactions[];
  public categories: string[];

  private transactions: ITransactions[];

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
        this.transactions = this.orderByDate(data[1]);
        this.filteredTransactions = this.orderByDate(data[1]);
        console.log(this.filteredTransactions);
      }
    });
  }

  private getCategories() {}

  private orderByDate(transactions: ITransactions[]) {
    return transactions.sort(function(a, b) {
      const d1: any = new Date(b.date);
      const d2: any = new Date(a.date);
      return d1 - d2;
    });
  }

  public getIncomes() {
    this.filteredTransactions = this.transactions.filter(
      transaction => transaction.category === "Income"
    );
  }

  public getExpenditures() {
    this.filteredTransactions = this.transactions.filter(
      transaction => transaction.category !== "Income"
    );
  }

  public getAllTransactions() {
    this.filteredTransactions = this.transactions;
  }

  public onSignOut() {
    this._gapi.onSignOut();
  }
}
