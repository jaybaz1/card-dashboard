import { InMemoryDbService } from "angular-in-memory-web-api";
import * as faker from "faker/locale/en_US";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    /* Fake card data */
    const balance = { id: 0, name: "Test Card", balance: 500 };

    const transactionData = () => {
      return {
        id: faker.random.uuid(),
        amount: faker.finance.amount(),
        date: faker.date.between(dates.from, dates.to)
      };
    };

    const dates = {
      from: "01 May 2018 00:00:00 GMT",
      to: "31 May 2018 23:00:00 GMT"
    };

    /* 
     * Had to manually create the transactions object due to a bug in angular-in-memory-web-api v0.6.0
     * https://github.com/angular/in-memory-web-api/issues/189
     */
    const transactions = [
      {
        name: "Jack Wills",
        category: "Clothes",
        id: faker.random.uuid(undefined, 100, undefined, "-"),
        amount: faker.finance.amount(),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Pret",
        category: "Eating out",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 10, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Skydive UK",
        category: "Entertainment",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 1000, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Game",
        category: "Entertainment",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 50, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Tesco",
        category: "Groceries",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 100, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Netflix",
        category: "Entertainment",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 10, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Spotify",
        category: "Entertainment",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 10, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "K10",
        category: "Eating out",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 10, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Jack Wills",
        category: "Clothes",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 100, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Jack Wills",
        category: "Clothes",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 100, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Pret",
        category: "Eating out",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 10, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Skydive UK",
        category: "Entertainment",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 1000, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Game",
        category: "Entertainment",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 50, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Tesco",
        category: "Groceries",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 100, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Netflix",
        category: "Entertainment",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 10, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Spotify",
        category: "Entertainment",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 10, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "K10",
        category: "Eating out",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 10, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Jack Wills",
        category: "Clothes",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 100, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Ticketmaster",
        category: "Entertainment",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 100, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Cineworld",
        category: "Entertainment",
        id: faker.random.uuid(),
        amount: faker.finance.amount(undefined, 30, undefined, "-"),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Topup",
        category: "Income",
        id: faker.random.uuid(),
        amount: faker.finance.amount(100, 500),
        date: faker.date.between(dates.from, dates.to)
      },
      {
        name: "Topup",
        category: "Income",
        id: faker.random.uuid(),
        amount: faker.finance.amount(100, 500),
        date: faker.date.between(dates.from, dates.to)
      }
    ];

    return { balance, transactions };
  }
}
