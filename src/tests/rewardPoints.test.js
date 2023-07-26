import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import RewardPoints from "./rewardPoints";
import {
  compareByNumber,
  months,
  calculateRewardPoints,
  calculatePoints
} from "./utils";

jest.mock("./api");

describe("RewardPoints", () => {
  it("calculates reward points correctly for different transaction amounts", () => {
    expect(calculatePoints(120)).toBe(90); // $120 = 2 * $20 + 1 * $50 = 90 points
    expect(calculatePoints(80)).toBe(30); // $80 = 1 * $30 = 30 points
    expect(calculatePoints(60)).toBe(10); // $60 = 1 * $10 = 10 points
    expect(calculatePoints(200)).toBe(250); // $200 = 2 * $100 + 1 * 50 = 250 points
    expect(calculatePoints(40)).toBe(0); // $40 = 0 points (below $50 threshold)
    expect(calculatePoints(50)).toBe(0); // $50 = 0 points (on the $50 threshold)
  });

  it("renders calculate by total/month list correctly according to the data", async () => {
    const mockTransactions = [
      {
        customerID: 1,
        customerName: "aaa",
        transactionAmount: 80,
        transactionDate: "2023-01-04 10:34:23"
      },
      {
        customerID: 2,
        customerName: "aaa",
        transactionAmount: 100,
        transactionDate: "2023-01-05 10:34:23"
      },
      {
        customerID: 1,
        customerName: "aaa",
        transactionAmount: 50,
        transactionDate: "2023-02-06 10:34:23"
      },
      {
        customerID: 3,
        customerName: "aaa",
        transactionAmount: 120,
        transactionDate: "2023-03-04 10:34:23"
      }
    ];

    render(<RewardPoints />);

    await waitFor(() => {
      mockTransactions.forEach((transaction) => {
        expect(screen.getByText("Total")).toBeInTheDocument();
        expect(screen.getByText("Jan")).toBeInTheDocument();
        expect(screen.getByText("Feb")).toBeInTheDocument();
        expect(screen.getByText("Mar")).toBeInTheDocument();
      });
    });
  });

  it("renders no calculate by month options that does not exist in the data", async () => {
    const mockTransactions = [
      {
        customerID: 1,
        customerName: "aaa",
        transactionAmount: 80,
        transactionDate: "2023-01-04 10:34:23"
      },
      {
        customerID: 2,
        customerName: "aaa",
        transactionAmount: 100,
        transactionDate: "2023-01-05 10:34:23"
      },
      {
        customerID: 1,
        customerName: "aaa",
        transactionAmount: 50,
        transactionDate: "2023-03-06 10:34:23"
      },
      {
        customerID: 3,
        customerName: "aaa",
        transactionAmount: 120,
        transactionDate: "2023-03-04 10:34:23"
      }
    ];

    render(<RewardPoints />);

    await waitFor(() => {
      mockTransactions.forEach((transaction) => {
        expect(screen.getByText("Total")).toBeInTheDocument();
        expect(screen.getByText("Jan")).toBeInTheDocument();
        expect(screen.getByText("Feb")).toBeNull();
        expect(screen.getByText("Mar")).toBeInTheDocument();
      });
    });
  });
});
