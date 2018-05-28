import { Component, OnInit } from "@angular/core";

import { GapiService } from "../services/gapi.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private _gapi: GapiService) {}

  ngOnInit() {}
}
