import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { actions } from "../../store";
import { assets, icons } from "../../constants/Images";
import Category from "../Category/Category";
import Searchbar from "../Searchbar/Searchbar";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFavouritesPage = useSelector(
    (state) => state.favourites.onFavouritesPage
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleFavouritesPage = () => {
    dispatch(actions.favouritesActions.toggleFavouritesPage());
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.nav_upper}>
        <div
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={toggleMenu}
        >
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>

        <img
          onClick={() => navigate("/")}
          className={styles.logo}
          src={assets.logo}
        />

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
      <div
        className={`${styles.nav_menu} ${menuOpen ? styles.show : styles.hide}`}
      >
        <Category />
      </div>
    </div>
  );
};

export default Navbar;
