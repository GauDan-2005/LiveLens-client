import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { getState }) => {
    const state = getState();
    const params = state.params;
    try {
      const response = await axios.get("https://newsapi.org/v2/everything", {
        headers: {
          "X-Api-Key": import.meta.env.VITE_NEWS_API_KEY,
        },
        params,
      });
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const initialState = {
  total: 0,
  newsArray: [],
  status: "idle",
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        const filteredArticles = action.payload.articles.filter(
          (article) => article.title !== "[Removed]"
        );

        state.status = "succeeded";
        state.newsArray = filteredArticles;
        state.total = action.payload.totalResults;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const newsActions = newsSlice.actions;

export default newsSlice.reducer;
