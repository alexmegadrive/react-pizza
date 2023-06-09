import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

interface IPaginationProps {
  handleChangePage: (page: number) => void;
  totalPages: number;
  //   selectedPage: number;
}
const Pagination: FC<IPaginationProps> = ({
  handleChangePage,
  totalPages,
  //   selectedPage,
}) => {
  return (
    <ReactPaginate
      className={styles.root}
      pageLinkClassName={styles.link}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      activeLinkClassName={styles.activeLink}
      previousClassName={styles.page}
      nextClassName={styles.page}
      nextLinkClassName={styles.link}
      previousLinkClassName={styles.link}
      onPageChange={(event) => handleChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;
