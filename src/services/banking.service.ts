import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class BankingService {
  constructor(private http: HttpClient) {}

  balance(): Observable<any> {
    return this.http.get(`api/balance`).pipe(map(res => console.log(res)));
  }
}
