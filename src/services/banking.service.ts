import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { IAccount, ITransactions } from "../interfaces";

@Injectable()
export class BankingService {
  constructor(private http: HttpClient) {}

  account(): Observable<IAccount> {
    return this.http.get<IAccount>(`api/balance`);
  }

  transactions(): Observable<ITransactions[]> {
    return this.http.get<ITransactions[]>(`api/transactions`);
  }
}
