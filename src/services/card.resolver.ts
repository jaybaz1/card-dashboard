import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";

import { Observable, forkJoin } from "rxjs/index";

import { BankingService } from "./banking.service";

import { IAccount, ITransactions } from "../interfaces";

@Injectable()

/* Prefetch card data */
export class CardResolver implements Resolve<[IAccount, ITransactions[]]> {
  constructor(private _bankingService: BankingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<[IAccount, ITransactions[]]> {
    const cardRequest = this._bankingService.account();
    const transactionsRequest = this._bankingService.transactions();
    return forkJoin(cardRequest, transactionsRequest);
  }
}
