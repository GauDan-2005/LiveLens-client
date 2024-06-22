import { useDispatch } from "react-redux";
import { icons } from "../../constants/Images";
import styles from "./Searchbar.module.css";
import { useState } from "react";
import { actions } from "../../store";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchQuery = () => {
    dispatch(actions.paramsActions.setQ(query));
    navigate("/");
  };

  return (
    <div className={styles.searchbar}>
      <input
        className={styles.search}
        type="text"
        placeholder="Search for topics, articles and locations..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <img
        onClick={searchQuery}
        src={icons.searchNormal}
        className={styles.search_icon}
      />
    </div>
  );
};

export default Searchbar;
