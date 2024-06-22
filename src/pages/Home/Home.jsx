import { useState } from "react";
import { useSelector } from "react-redux";

import NewsCard from "../../components/Card/NewsCard/NewsCard";
import Pagination from "../../components/Pagination/Pagination";

import styles from "./Home.module.css";

const Home = () => {
  const [currPage, setCurrPage] = useState(1);
  const articlePerPage = 12;
  const lastIndex = currPage * articlePerPage;
  const firstIndex = lastIndex - articlePerPage;

  const newsArray = useSelector((state) => state.news.newsArray);
  const status = useSelector((state) => state.news.status);

  const pageSize = newsArray.length;
  const currPageNewArray = newsArray.slice(firstIndex, lastIndex);

  return (
    <div className={styles.home}>
      <div className={styles.heading_div}>
        <p className={styles.heading}>Latest News</p>
        <hr className={styles.heading_hr} />
      </div>
      <div className={styles.news_cards_div}>
        {currPageNewArray.map((article) => (
          <NewsCard key={article.title} article={article} />
        ))}
      </div>
      <Pagination
        totalArticles={pageSize}
        articlePerPage={articlePerPage}
        currPage={currPage}
        setCurrPage={setCurrPage}
      />
    </div>
  );
};

export default Home;
