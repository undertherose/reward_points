import { threeMonthsPrior } from "../utils/utils";

const transactions = [
  {
    transactionID: 1,
    customerID: 1,
    customerName: "aaa",
    transactionAmountUSD: 80,
    transactionDate: "2023-05-04 10:34:23 EST"
  },
  {
    transactionID: 2,
    customerID: 1,
    customerName: "aaa",
    transactionAmountUSD: 100,
    transactionDate: "2023-05-05 10:34:23 EST"
  },
  {
    transactionID: 3,
    customerID: 1,
    customerName: "aaa",
    transactionAmountUSD: 50,
    transactionDate: "2023-06-06 10:34:23 EST"
  },
  {
    transactionID: 4,
    customerID: 1,
    customerName: "aaa",
    transactionAmountUSD: 120,
    transactionDate: "2023-07-04 10:34:23 EST"
  },
  {
    transactionID: 5,
    customerID: 2,
    customerName: "bbb",
    transactionAmountUSD: 60,
    transactionDate: "2023-06-04 10:34:23 EST"
  },
  {
    transactionID: 6,
    customerID: 2,
    customerName: "bbb",
    transactionAmountUSD: 130,
    transactionDate: "2023-07-28 10:34:23 EST"
  },
  {
    transactionID: 7,
    customerID: 3,
    customerName: "ccc",
    transactionAmountUSD: 80,
    transactionDate: "2023-06-15 10:34:23 EST"
  },
  {
    transactionID: 8,
    customerID: 4,
    customerName: "ddd",
    transactionAmountUSD: 210,
    transactionDate: "2023-07-16 10:34:23 EST"
  },
  {
    transactionID: 9,
    customerID: 4,
    customerName: "ddd",
    transactionAmountUSD: 60,
    transactionDate: "2023-07-17 10:34:23 EST"
  },
  {
    transactionID: 10,
    customerID: 5,
    customerName: "eee",
    transactionAmountUSD: 90,
    transactionDate: "2023-07-18 10:34:23 EST"
  },
  {
    transactionID: 11,
    customerID: 5,
    customerName: "eee",
    transactionAmountUSD: 180,
    transactionDate: "2023-07-19 10:34:23 EST"
  },
  {
    transactionID: 12,
    customerID: 6,
    customerName: "fff",
    transactionAmountUSD: 140,
    transactionDate: "2023-07-19 10:34:23 EST"
  },
  {
    transactionID: 13,
    customerID: 1,
    customerName: "aaa",
    transactionAmountUSD: 70,
    transactionDate: "2023-07-19 10:34:23 EST"
  },
  {
    transactionID: 14,
    customerID: 1,
    customerName: "aaa",
    transactionAmountUSD: 90,
    transactionDate: "2023-07-20 10:34:23 EST"
  }
];

export async function getRecent3MonthsTransactions(currentTime) {
  const startTime = threeMonthsPrior(currentTime);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // const filteredTransactions =
      resolve(
        transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.transactionDate);
          return transactionDate > startTime;
        })
      );
    }, Math.random() * 5 * 1000);
  });
}
