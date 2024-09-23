import { useState } from "react";
import { useSelector } from "react-redux";

import NewsCard from "../../components/Card/NewsCard/NewsCard";
import Pagination from "../../components/Pagination/Pagination";

import styles from "./Favourites.module.css";

const Favourites = () => {
  const [currPage, setCurrPage] = useState(1);
  const articlePerPage = 12;
  const lastIndex = currPage * articlePerPage;
  const firstIndex = lastIndex - articlePerPage;

  const favArray = useSelector((state) => state.favourites.favorites);

  const currPageNewArray = favArray.slice(firstIndex, lastIndex);
  const pageSize = favArray.length;

  return (
    <div className={styles.home}>
      <div className={styles.heading_div}>
        <p className={styles.heading}>Favourite News</p>
        <hr className={styles.heading_hr} />
      </div>
      {favArray.length > 0 ? (
        <div className={styles.news_cards_div}>
          {currPageNewArray.map((article) => (
            <NewsCard
              key={article.title}
              article={article}
              isFavourite={true}
            />
          ))}
        </div>
      ) : (
        <p className={styles.fallback_text}>No News Saved yet.</p>
      )}
      {Math.ceil(pageSize / articlePerPage) && (
        <Pagination
          totalArticles={pageSize}
          articlePerPage={articlePerPage}
          currPage={currPage}
          setCurrPage={setCurrPage}
        />
      )}
    </div>
  );
};

export default Favourites;
