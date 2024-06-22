import { configureStore } from "@reduxjs/toolkit";

import newsReducer from "./News";
import paramsReducer from "./Parameter";
import categoryReducer from "./Category";
import favouritesReducer from "./Favourites";

import { newsActions } from "./News";
import { paramsActions } from "./Parameter";
import { categoryActions } from "./Category";
import { favouritesActions } from "./Favourites";

const store = configureStore({
  reducer: {
    news: newsReducer,
    params: paramsReducer,
    category: categoryReducer,
    favourites: favouritesReducer,
  },
});

export const actions = {
  newsActions,
  paramsActions,
  categoryActions,
  favouritesActions,
};

export default store;
