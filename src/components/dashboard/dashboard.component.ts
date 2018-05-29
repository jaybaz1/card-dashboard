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
  public activeTab: string = "all";
  public newBalance: number;

  private transactions: ITransactions[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _bankService: BankingService,
    private _gapi: GapiService
  ) {
    // Subscribe to router events waiting for last event to fire 'NavigationEnd'
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        const data = this.route.snapshot.data.card;
        this.init(data);
      }
    });
  }

  private init(data) {
    // Setup dashboard
    this.user = this._gapi.user;

    // Get account data
    this.account = data[0];

    // Get and store complete transactions data
    this.transactions = this.orderByDate(data[1]);

    // Get transactions data, property to be used in view
    this.filteredTransactions = this.transactions;

    // Store transactions into categories
    this.categorisedTransactions = this.initCategories(data[1]);

    // Calcalate card balance
    this.newBalance = this.getBalance(this.transactions);
  }

  public getIncomes() {
    this.resetTransactions();
    this.activiteTab("income");
    this.filteredTransactions = this.transactions.filter(
      transaction => transaction.category === "Income"
    );
  }

  public getExpenditures() {
    this.resetTransactions();
    this.activiteTab("expenditures");
    this.filteredTransactions = this.transactions.filter(
      transaction => transaction.category !== "Income"
    );
  }

  public getAllTransactions() {
    this.resetTransactions();
    this.activiteTab("all");
    this.filteredTransactions = this.transactions;
  }

  public getCategorisedTransactions() {
    this.activiteTab("cat");
    this.showCategories = !this.showCategories;
  }

  // Sort transactions into categories and return new data object
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

  private getBalance(transactions: ITransactions[]) {
    let balance = this.account.balance;
    transactions.forEach(transaction => {
      balance += parseInt(transaction.amount);
    });

    return balance;
  }

  // Return new object - Assign transactions to categories
  // Total up category amount
  private sortCategories(categoryArr: string[], t: ITransactions[]) {
    const res = [];
    categoryArr.forEach(category => {
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

  // Order the transactions by date
  private orderByDate(transactions: ITransactions[]) {
    return transactions.sort(function(a, b) {
      const d1: any = new Date(b.date);
      const d2: any = new Date(a.date);
      return d1 - d2;
    });
  }

  private resetTransactions() {
    this.showCategories = false;
  }

  private activiteTab(tab) {
    this.activeTab = tab;
  }

  public onSignOut() {
    this._gapi.onSignOut();
  }
}
