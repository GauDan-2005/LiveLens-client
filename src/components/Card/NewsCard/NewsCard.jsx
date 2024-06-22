import PropTypes from "prop-types";
import styles from "./NewsCard.module.css";
import { Link } from "react-router-dom";

const NewsCard = ({ article }) => {
  const dateObject = new Date(article.publishedAt);

  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const backgroundStyle = {
    "--bg-image": article.urlToImage ? `url(${article.urlToImage})` : "none",
  };

  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  const stringToKebabCase = (input) => {
    // Step 1: Convert to lowercase and replace spaces/underscores with dashes
    let kebabCaseString = input.toLowerCase().replace(/[_\s]+/g, "-");

    // Step 2: Handle camel case by inserting dashes before uppercase letters
    kebabCaseString = kebabCaseString.replace(
      /[A-Z]/g,
      (match) => "-" + match.toLowerCase()
    );

    // Remove leading dash, if any
    if (kebabCaseString.charAt(0) === "-") {
      kebabCaseString = kebabCaseString.slice(1);
    }

    return kebabCaseString;
  };

  return (
    <Link to={`/news/${article.title}`} className={styles.news_card}>
      <div className={styles.news_img} style={backgroundStyle} />
      <p className={styles.title}>{article.title}</p>
      <div className={styles.author_div}>
        {article.author && <p className={styles.author}>By {article.author}</p>}
        <p className={styles.date}>{formattedDate}</p>
      </div>
    </Link>
  );
};

NewsCard.propTypes = {
  article: PropTypes.object.isRequired,
};

export default NewsCard;
