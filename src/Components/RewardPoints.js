import React, { useEffect, useState } from "react";
// import { getAllTransactions } from "./API";
import { useTransactionData } from "../hooks/useTransactionData";
import { RewardPointsTable } from "./RewardPointsTable";
import { months, getLast3Months } from "../utils/utils";
import "../styles/rewardPoints.css";

import {
  calculateRewardPoints,
  calculateCustomerRewards
} from "../utils/calculateRewardPoints";

const RewardPoints = () => {
  const { data, loading, error } = useTransactionData();
  const [customerRewards, setCustomerRewards] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [currentMonths, setCurrentMonths] = useState([]);

  useEffect(() => {
    const last3Months = getLast3Months();
    setCurrentMonths(last3Months);
    setSelectedMonth(last3Months[0].toString());
  }, []);

  useEffect(() => {
    const transactions = calculateRewardPoints(data);
    const customerRewards = calculateCustomerRewards(transactions);
    setCustomerRewards(customerRewards);
  }, [data]);

  function handleChange(e) {
    setSelectedMonth(e.target.value);
  }

  return (
    <div>
      <h2>Reward Points</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <>
          <h3>Total View</h3>
          <RewardPointsTable
            customerRewards={customerRewards}
            calculateBy={"Total"}
            rowsPerPage={5}
          />
          <br />
          <h3>Month View</h3>
          {/* <div>
            {currentMonths.map((month) => {
              return (
                <div className="radio">
                  <label>
                    <input
                      type="radio"
                      name="calculate"
                      value={month}
                      checked={selectedMonth === month.toString()}
                      onChange={handleChange}
                    />
                    {months[month]}
                  </label>
                </div>
              );
            })}
          </div> */}
          <div className="monthMenu">
            <label>
              Currently Viewing: &emsp;&emsp;&emsp;
              <select
                className="clickable"
                value={selectedMonth}
                onChange={handleChange}
              >
                {currentMonths.map((month) => (
                  <option value={month}>{months[month]}</option>
                ))}
              </select>
            </label>
          </div>
          <RewardPointsTable
            customerRewards={customerRewards}
            calculateBy={selectedMonth}
            rowsPerPage={5}
          />
        </>
      )}
    </div>
  );
};

export default RewardPoints;
