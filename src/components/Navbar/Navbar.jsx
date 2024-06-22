import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../store";
import { assets, icons } from "../../constants/Images";
import Category from "../Category/Category";
import Searchbar from "../Searchbar/Searchbar";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const onFavouritesPage = useSelector(
    (state) => state.favourites.onFavouritesPage
  );

  const toggleFavouritesPage = () => {
    dispatch(actions.favouritesActions.toggleFavouritesPage());
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.nav_upper}>
        <Link to="/">
          <img className={styles.logo} src={assets.logo} />
        </Link>
        <Searchbar />
        <Link
          to="/favourites"
          className={`${styles.save} ${onFavouritesPage ? styles.active : ""}`}
          onClick={toggleFavouritesPage}
        >
          <img src={icons.save} />
          <p className={styles.save_text}>Saved List</p>
        </Link>
      </div>
      <Category />
    </div>
  );
};

export default Navbar;
