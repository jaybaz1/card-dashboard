import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";

// Components
import { AppComponent } from "../components/app.component";
import { LoginComponent } from "../components/login/login.component";
import { DashboardComponent } from "../components/dashboard/dashboard.component";

import { AuthGuard } from "../services/auth-guard.service";

//Services
import { GapiService } from "../services/gapi.service";
import { BankingService } from "../services/banking.service";
import { InMemoryDataService } from "../services/db";

//Resolvers
import { CardResolver } from "../services/card.resolver";

const appRoutes: Routes = [
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    //canActivate: [AuthGuard]
    resolve: {
      card: CardResolver
    }
  },
  { path: "", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [GapiService, BankingService, AuthGuard, CardResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
