import { TestBed, inject } from "@angular/core/testing";

import { AuthGuard } from "./auth-guard.service";

describe("CanActivateUserService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
  });

  it(
    "should be created",
    inject([AuthGuard], (service: AuthGuard) => {
      expect(service).toBeTruthy();
    })
  );
});
