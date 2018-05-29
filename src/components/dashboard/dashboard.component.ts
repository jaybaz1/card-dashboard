import { Component } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";

import { GapiService } from "../../services/gapi.service";
import { BankingService } from "../../services/banking.service";

import { IAccount, ITransactions } from "../../interfaces";

import { flatMap } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent {
  public account: IAccount;
  public filteredTransactions: ITransactions[];
  public categorisedTransactions: any;
  public showCategories = false;
  public user: any;

  private transactions: ITransactions[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _bankService: BankingService,
    private _gapi: GapiService
  ) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.user = this._gapi.user;
        const data = this.route.snapshot.data.card;
        this.account = data[0];
        this.transactions = this.orderByDate(data[1]);
        this.filteredTransactions = this.orderByDate(data[1]);
        this.categorisedTransactions = this.initCategories(data[1]);
        console.log(this.user, this.categorisedTransactions);
      }
    });
  }

  private initCategories(transactions: ITransactions[]) {
    return this.sortCategories(this.getCategories(transactions), transactions);
  }

  private getCategories(transactions: ITransactions[]) {
    const res: string[] = [];
    transactions.forEach(transaction => {
      if (!res.includes(transaction.category)) {
        res.push(transaction.category);
      }
    });

    return res;
  }

  private sortCategories(c: string[], t: ITransactions[]) {
    const res = [];
    c.forEach(category => {
      let total = 0;
      const newTransactions = t.filter(transaction => {
        const isCategory = transaction.category === category;
        total += isCategory ? parseInt(transaction.amount) : 0;
        return isCategory;
      });
      res.push({
        name: category,
        transactions: newTransactions,
        amount: total
      });
    });
    return res;
  }

  private orderByDate(transactions: ITransactions[]) {
    return transactions.sort(function(a, b) {
      const d1: any = new Date(b.date);
      const d2: any = new Date(a.date);
      return d1 - d2;
    });
  }

  public getIncomes() {
    this.resetTransactions();
    this.filteredTransactions = this.transactions.filter(
      transaction => transaction.category === "Income"
    );
  }

  public getExpenditures() {
    this.resetTransactions();
    this.filteredTransactions = this.transactions.filter(
      transaction => transaction.category !== "Income"
    );
  }

  public getAllTransactions() {
    this.resetTransactions();
    this.filteredTransactions = this.transactions;
  }

  public getCategorisedTransactions() {
    this.showCategories = !this.showCategories;
  }

  private resetTransactions() {
    this.showCategories = false;
  }

  public onSignOut() {
    this._gapi.onSignOut();
  }
}
