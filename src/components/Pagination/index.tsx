import { FC } from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { useActions } from "@/hooks/useActions";
import { useAppSelector, RootState } from "@/redux/store";

const Pagination: FC = () => {
  const pagesTotal = useAppSelector(
    (state: RootState) => state.products.totalPages
  );
  const { setPageCurrent } = useActions();

  return (
    <ReactPaginate
      className={styles.root}
      pageLinkClassName={styles.link}
      breakLabel="..."
      nextLabel=">"
      // forcePage={pageCurrent - 1}
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
