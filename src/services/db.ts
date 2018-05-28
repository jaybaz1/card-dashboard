import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const balance = { id: 1, name: "Test Card", balance: 500 };
    return { balance };
  }
}
