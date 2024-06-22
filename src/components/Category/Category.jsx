import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { actions } from "../../store";
import { CATEGORIES } from "../../constants/enums";
import styles from "./Category.module.css";

const Category = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useSelector((state) => state.params.q);
  const city = useSelector((state) => state.category.city);
  const state = useSelector((state) => state.category.state);
  const country = useSelector((state) => state.category.country);

  const changeCategory = (input) => {
    dispatch(actions.paramsActions.setQ(input));
    navigate("/");
  };

  return (
    <div className={styles.category}>
      <div
        onClick={() => changeCategory(city + " " + state)}
        className={`${styles.category_box} ${
          city + " " + state === query ? styles.active : ""
        }`}
      >
        <p className={styles.category_text}>Local</p>
      </div>
      <div
        onClick={() => changeCategory(country)}
        className={`${styles.category_box} ${
          country === query ? styles.active : ""
        }`}
      >
        <p className={styles.category_text}>{country}</p>
      </div>
      <div
        onClick={() => changeCategory("world")}
        className={`${styles.category_box} ${
          "world" === query ? styles.active : ""
        }`}
      >
        <p className={styles.category_text}>World</p>
      </div>
      <hr className={styles.hr} />
      {CATEGORIES.map((category) => (
        <div
          onClick={() => changeCategory(category)}
          key={category}
          className={`${styles.category_box} ${
            category === query ? styles.active : ""
          }`}
        >
          <p className={styles.category_text}>{category}</p>
        </div>
      ))}
    </div>
  );
};

export default Category;
