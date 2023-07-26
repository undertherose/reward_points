import { calculatePoints } from "./utils";

export const calculateRewardPoints = (transactions) => {
  // console.log("c2", rewardPointsOverView);
  // console.log("taaa", customerRewardsDetails);
  console.log("t", transactions);

  transactions.forEach((transaction) => {
    const month = new Date(transaction.transactionDate).getMonth();
    // console.log("t2", month);
    const rewards = calculatePoints(transaction.transactionAmountUSD);

    transaction.month = month;
    transaction.rewardPoints = rewards;
  });

  // console.log("t2", transactions);

  return transactions;
};

const groupByCustomer = (transactions) => {
  const groupByCustomer = {};

  transactions.forEach((transaction) => {
    const { customerID } = transaction;
    if (!groupByCustomer[customerID]) {
      groupByCustomer[customerID] = [];
    }
    // delete transaction.customerID;
    groupByCustomer[customerID].push(transaction);
  });

  return groupByCustomer;
};

const groupByMonth = (groupByCustomer) => {
  const groupByMonth = {};

  groupByMonth["Total"] = { totalRewards: 0, transactions: groupByCustomer };
  groupByMonth["customerName"] = groupByCustomer[0].customerName;
  groupByCustomer.forEach((transaction) => {
    const { month } = transaction;
    if (!groupByMonth[month]) {
      groupByMonth[month] = { totalRewards: 0, transactions: [] };
    }

    groupByMonth[month]["totalRewards"] += transaction.rewardPoints;
    groupByMonth["Total"]["totalRewards"] += transaction.rewardPoints;
    // delete transaction["month"];
    // console.log("c", transaction);
    groupByMonth[month]["transactions"].push(transaction);
  });

  return groupByMonth;
};

export const calculateCustomerRewards = (transactions) => {
  // console.log("c2", rewardPointsOverView);
  // console.log("taaa", customerRewardsDetails);
  const transactionsGroupByCustomer = groupByCustomer(transactions);
  // console.log("t5", transactionsGroupByCustomer);
  Object.keys(transactionsGroupByCustomer).forEach((customerID) => {
    const transactionsGroupByMonth = groupByMonth(
      transactionsGroupByCustomer[customerID]
    );
    // console.log(transactionsGroupByMonth);
    transactionsGroupByCustomer[customerID] = transactionsGroupByMonth;
  });

  console.log("oooo", transactionsGroupByCustomer);
  console.log("oooo22222", Object.entries(transactionsGroupByCustomer));
  return Object.entries(transactionsGroupByCustomer);
};
