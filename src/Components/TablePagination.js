import React, { useEffect } from "react";

import styles from "../styles/TablePagination.module.css";

const TablePagination = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  return (
    <div className={styles.tablePagination}>
      <button
        className={styles.button}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        {" < "}
      </button>
      {range.map((el, index) => (
        <button
          key={index}
          className={`${styles.button} ${
            page === el ? styles.activeButton : styles.inactiveButton
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
      ))}
      <button
        className={styles.button}
        onClick={() => setPage(page + 1)}
        disabled={page === range[range.length - 1]}
      >
        {" > "}
      </button>
    </div>
  );
};

export default TablePagination;
