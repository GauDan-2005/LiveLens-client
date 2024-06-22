import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onFavouritesPage: false,
  favorites: [],
  status: "idle",
  error: null,
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    initializeFavourites: (state) => {
      const favList = localStorage.getItem("favorites");
      if (favList) {
        state.favorites = JSON.parse(favList);
      }
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.title !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    toggleFavouritesPage: (state) => {
      state.onFavouritesPage = !state.onFavouritesPage;
    },
  },
});

export const favouritesActions = favouritesSlice.actions;

export default favouritesSlice.reducer;
