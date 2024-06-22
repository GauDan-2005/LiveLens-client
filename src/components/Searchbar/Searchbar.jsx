import { useDispatch } from "react-redux";
import { icons } from "../../constants/Images";
import styles from "./Searchbar.module.css";
import { useRef, useState } from "react";
import { actions } from "../../store";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchQuery = (event) => {
    if (event.keyCode === 13) {
      dispatch(actions.paramsActions.setQ(query));
      navigate("/");
      setQuery("");
    }
  };

  const toggleSearchbtn = () => {
    setToggleBtn((prev) => !prev);
    if (toggleSearchbtn) inputRef.current.focus();
    else inputRef.current.blur();
  };

  return (
    <div className={`${styles.searchbar} ${toggleBtn ? styles.expanded : ""}`}>
      <img
        onClick={() => setToggleBtn(false)}
        src={icons.arrow}
        className={styles.arrow}
      />
      <input
        className={styles.search}
        type="text"
        placeholder="Search for topics, articles and locations..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={searchQuery}
        ref={inputRef}
      />

      <img
        onClick={toggleSearchbtn}
        src={icons.searchNormal}
        className={styles.search_icon}
      />
    </div>
  );
};

export default Searchbar;
