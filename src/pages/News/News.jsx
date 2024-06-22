import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { actions } from "../../store";

import styles from "./News.module.css";
import { icons } from "../../constants/Images";

const News = () => {
  const id = useParams();
  const dispatch = useDispatch();

  const favourites = useSelector((state) => state.favourites.favorites);
  const newsArray = useSelector((state) => state.news.newsArray);
  const currNews = newsArray.find(
    (article) => article.title === id.articleName
  );
  const isFav = favourites.some((article) => article.title === currNews.title);

  const saveNews = () => {
    if (isFav) {
      dispatch(actions.favouritesActions.removeFromFavorites(currNews));
    } else {
      dispatch(actions.favouritesActions.addToFavorites(currNews));
    }
  };

  // FORAMTING DATE
  const dateObject = new Date(currNews.publishedAt);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  return (
    <div className={styles.news_page}>
      <img className={styles.news_img} src={currNews.urlToImage} />
      <div className={styles.news_div}>
        <div className={styles.news_title_div}>
          <p className={styles.news_title}>{currNews.title}</p>
          <div className={styles.news_detail_div}>
            <div className={styles.author_div}>
              <p className={styles.author_text}>{currNews.author}</p>
              <p className={styles.author_text}>{formattedDate}</p>
            </div>
            {currNews.url && (
              <a href={currNews.url} className={styles.source_div}>
                {currNews.source.name && (
                  <p className={styles.source_name}>{currNews.source.name}</p>
                )}
                <img className={styles.icon} src={icons.link} />
              </a>
            )}
          </div>
        </div>
        <hr className={styles.news_hr} />
        <p className={styles.news_content}>{currNews.content}</p>
        <p className={styles.news_content}>{currNews.description}</p>
      </div>
      <div
        onClick={saveNews}
        className={`${styles.fav_div} ${isFav ? styles.fav_isfav : ""}`}
      >
        <img
          className={styles.fav_icon}
          src={icons.save}
          alt="Add to favourites"
        />
      </div>
    </div>
  );
};

export default News;
