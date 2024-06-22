import PropTypes from "prop-types";

import styles from "./Pagination.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { actions } from "../../store";

const Pagination = ({
  totalArticles,
  articlePerPage,
  currPage,
  setCurrPage,
}) => {
  // const dispatch = useDispatch();
  // const pageNumber = useSelector((state) => state.params.page);
  const pages = [];
  for (let i = 1; i <= Math.ceil(totalArticles / articlePerPage); i++) {
    pages.push(i);
  }

  const prevClick = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);
    } else {
      console.log("min page: 1 is reached.");
    }
  };

  const nextClick = () => {
    if (currPage < pages.length) {
      setCurrPage(currPage + 1);
    } else {
      console.log("max page: " + pages.length + " is reached.");
      // dispatch(actions.paramsActions.setPage(pageNumber + 1));
    }
  };

  return (
    <div className={styles.pagination}>
      <div
        className={`${styles.page} ${styles.nav_btn}`}
        onClick={() => prevClick()}
      >
        <p className={styles.page_text}>Prev</p>
      </div>
      {pages.map((page) => (
        <div
          className={`${styles.page} ${page == currPage ? styles.active : ""}`}
          key={page}
          onClick={() => setCurrPage(page)}
        >
          <p className={styles.page_text}>
            {page === pages.length ? "Last" : page}
          </p>
        </div>
      ))}
      <div
        className={`${styles.page} ${styles.nav_btn}`}
        onClick={() => nextClick()}
      >
        <p className={styles.page_text}>Next</p>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalArticles: PropTypes.number,
  articlePerPage: PropTypes.number,
  currPage: PropTypes.number,
  setCurrPage: PropTypes.func,
};

export default Pagination;
