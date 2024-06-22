import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { actions } from "./store";
import { fetchAddress } from "./store/Category";
import { fetchNews } from "./store/News";

import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Favourites from "./pages/Favourites/Favourites";

import styles from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  const query = useSelector((state) => state.params.q);
  const page = useSelector((state) => state.params.page);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        dispatch(
          actions.categoryActions.setCoordinates({ latitude, longitude })
        );
        dispatch(fetchAddress());
      },
      (err) => {
        console.log(err.message);
      }
    );
  };

  useEffect(() => {
    getLocation();
    dispatch(actions.favouritesActions.initializeFavourites());
  }, []);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch, query, page]);

  return (
    <div className={styles.app}>
      <Navbar />
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />

        {/* Favourites */}
        <Route path="/favourites" element={<Favourites />} />

        {/* News id routes */}
        <Route path="/news/:articleName" element={<News />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
