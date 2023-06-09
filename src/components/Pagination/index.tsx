import React, { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useActions } from "../../hooks/useActions";
import { useAppSelector, RootState } from "../../redux/store";

// interface IPaginationProps {
//   handleChangePage: (page: number) => void;
//   totalPages: number;
//   //   selectedPage: number;
// }
const Pagination: FC = () =>
  //   {
  //   handleChangePage,
  //   totalPages,
  //   //   selectedPage,
  // }
  {
    const pageCurrent = useAppSelector(
      (state: RootState) => state.filter.pageCurrent
    );
    const pagesTotal = useAppSelector(
      (state: RootState) => state.filter.pagesTotal
    );
    const { setPageCurrent, setPagesTotal } = useActions();

    return (
      <ReactPaginate
        className={styles.root}
        pageLinkClassName={styles.link}
        breakLabel="..."
        nextLabel=">"
        forcePage={pageCurrent - 1}
        previousLabel="<"
        activeLinkClassName={styles.activeLink}
        previousClassName={styles.page}
        nextClassName={styles.page}
        nextLinkClassName={styles.link}
        previousLinkClassName={styles.link}
        onPageChange={(event) => setPageCurrent(event.selected + 1)}
        pageRangeDisplayed={8}
        pageCount={pagesTotal}
        renderOnZeroPageCount={null}
      />
    );
  };

export default Pagination;
