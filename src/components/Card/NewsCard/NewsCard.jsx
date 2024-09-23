import PropTypes from "prop-types";
import styles from "./NewsCard.module.css";
import { Link, useNavigate } from "react-router-dom";

import { icons } from "../../../constants/Images";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../../store";

const NewsCard = ({ article, isFavourite }) => {
  const dispatch = useDispatch;
  const navigate = useNavigate();

  const favourites = useSelector((state) => state.favourites.favorites);
  const dateObject = new Date(article.publishedAt);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  const isFav = favourites.some((article) => article.title === article.title);

  const saveNews = () => {
    if (isFav) {
      dispatch(actions.favouritesActions.removeFromFavorites(article));
    } else {
      dispatch(actions.favouritesActions.addToFavorites(article));
    }
  };

  const handleNavigation = (url) => {
    navigate(url);
  };

  const backgroundStyle = {
    "--bg-image": article.urlToImage ? `url(${article.urlToImage})` : "none",
  };

  return (
    <div className={styles.news_card}>
      <div
        className={styles.news_img}
        style={backgroundStyle}
        onClick={() => handleNavigation(`/news/${article.title}`)}
      />
      <p className={styles.title}>{article.title}</p>
      <div className={styles.author_div}>
        {article.author && <p className={styles.author}>By {article.author}</p>}
        <p className={styles.date}>{formattedDate}</p>
      </div>
      {isFavourite && (
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
      )}
    </div>
  );
};

NewsCard.propTypes = {
  article: PropTypes.object.isRequired,
};

export default NewsCard;
