import React, { useEffect, useState } from "react";
import useTablePagination from "../hooks/useTablePagination";
import styles from "../styles/DetailsTable.module.css";
import TablePagination from "./TablePagination";
import { formatDate } from "../utils/utils";

export const TransactionDetailsTable = ({ transactions, rowsPerPage }) => {
  console.log("here", transactions);
  const [page, setPage] = useState(1);
  const { slice, range } = useTablePagination(transactions, page, rowsPerPage);
  console.log("here2", slice);

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>Transaction ID</th>
            <th className={styles.tableHeader}>Purchase Amount</th>
            <th className={styles.tableHeader}>Points</th>
            <th className={styles.tableHeader}>Purchase Date</th>
          </tr>
        </thead>
        <tbody>
          {slice.length > 0 ? (
            slice.map((transaction) => (
              <tr
                className={styles.tableRowItems}
                key={transaction.transactionID}
              >
                <td className={styles.tableCell}>
                  {transaction.transactionID}
                </td>
                <td className={styles.tableCell}>
                  {transaction.transactionAmountUSD}
                </td>
                <td className={styles.tableCell}>{transaction.rewardPoints}</td>
                <td className={styles.tableCell}>
                  {formatDate(new Date(transaction.transactionDate))}
                </td>
              </tr>
            ))
          ) : (
            <p>No Transaction Found.</p>
          )}
        </tbody>
      </table>
      <TablePagination
        range={range}
        slice={slice}
        setPage={setPage}
        page={page}
      />
    </>
  );
};
