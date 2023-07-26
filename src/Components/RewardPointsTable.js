import React, { useEffect, useState } from "react";
import useTablePagination from "../hooks/useTablePagination";
import styles from "../styles/Table.module.css";
import TablePagination from "./TablePagination";
import { months } from "../utils/utils";
import { TransactionDetailsTable } from "./TransactionDetailsTable";

export const RewardPointsTable = ({
  customerRewards,
  calculateBy,
  rowsPerPage
}) => {
  console.log("here", customerRewards);
  const [page, setPage] = useState(1);
  const { slice, range } = useTablePagination(
    customerRewards,
    page,
    rowsPerPage
  );
  console.log("here2", slice);
  const [expandedCustomerID, setExpandedCustomerID] = useState(null);

  const onToggleTransactionDetails = (customerID) => {
    // console.log("waaaaaaa", customerID);
    if (expandedCustomerID === customerID) {
      setExpandedCustomerID(null);
    } else {
      setExpandedCustomerID(customerID);
    }
  };

  useEffect(() => {
    setExpandedCustomerID(null);
  }, [page]);

  return (
    <>
      <table className={styles.table}>
        <thead className={styles.tableRowHeader}>
          <tr>
            <th className={styles.tableHeader}>Customer ID</th>
            <th className={styles.tableHeader}>Customer UserName</th>
            <th className={styles.tableHeader}>Points</th>
          </tr>
        </thead>
        <tbody>
          {slice.length > 0 ? (
            slice.map((customerRecord) => (
              <React.Fragment key={customerRecord[0]}>
                {/* {console.log(customerRewards)} */}
                {/* {console.log(customerID === expandedCustomerID)} */}
                <tr
                  className={styles.tableRowItems}
                  onClick={() => onToggleTransactionDetails(customerRecord[0])}
                >
                  <td className={styles.tableCell}>
                    {expandedCustomerID === customerRecord[0] ? (
                      <span className={styles.arrowExpanded}>{"  >  "}</span>
                    ) : (
                      <span className={styles.arrow}>{"  >  "}</span>
                    )}
                    {"          " + customerRecord[0]}
                  </td>
                  <td className={styles.tableCell}>
                    {customerRecord[1]["customerName"]}
                  </td>
                  <td className={styles.tableCell}>
                    {customerRecord[1][calculateBy] == null
                      ? 0
                      : customerRecord[1][calculateBy]["totalRewards"]}
                  </td>
                </tr>
                {expandedCustomerID === customerRecord[0] && (
                  <tr>
                    <td className={styles.tableExpanded} colSpan="3">
                      <h4>Transaction Details</h4>
                      {customerRecord[1][calculateBy] !== undefined ? (
                        <TransactionDetailsTable
                          transactions={
                            customerRecord[1][calculateBy]["transactions"]
                          }
                          rowsPerPage={5}
                        />
                      ) : (
                        <p>No Transaction Found.</p>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="2">
                {months ? (
                  <>
                    No transactions found for .
                    {calculateBy === "Total" ? "Total" : months[calculateBy]}
                  </>
                ) : (
                  <>No Transaction Found.</>
                )}
              </td>
            </tr>
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

{
  /* // <table className={styles.table}>
                        //   <thead className={styles.tableRowHeader}>
                        //     <tr>
                        //       <th className={styles.tableHeader}>
                        //         Transaction ID
                        //       </th>
                        //       <th className={styles.tableHeader}>
                        //         Purchase Amount
                        //       </th>
                        //       <th className={styles.tableHeader}>Points</th>
                        //       <th className={styles.tableHeader}>
                        //         Purchase Date
                        //       </th>
                        //     </tr>
                        //   </thead>
                        //   <tbody>
                        //     {customerRecord[1][calculateBy]["transactions"].map(
                        //       (transaction) => (
                        //         <tr
                        //           className={styles.tableRowItems}
                        //           key={transaction.transactionID}
                        //         >
                        //           <td className={styles.tableCell}>
                        //             {transaction.transactionID}
                        //           </td>
                        //           <td className={styles.tableCell}>
                        //             {transaction.transactionAmountUSD}
                        //           </td>
                        //           <td className={styles.tableCell}>
                        //             {transaction.rewardPoints}
                        //           </td>
                        //           <td className={styles.tableCell}>
                        //             {formatDate(
                        //               new Date(transaction.transactionDate)
                        //             )}
                        //           </td>
                        //         </tr>
                        //       )
                        //     )}
                        //   </tbody>
                        // </table> */
}
