import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAddress = createAsyncThunk(
  "category/fetchAddress",
  async (_, { getState }) => {
    const state = getState();
    const coord = state.category.coord;
    try {
      const response = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: {
            q: `${coord.latitude},${coord.longitude}`,
            key: import.meta.env.VITE_WEATHER_API_KEY,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const initialState = {
  city: "",
  state: "",
  country: "",
  world: "world",
  coord: {
    latitude: 0,
    longitude: 0,
  },
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCoordinates(state, action) {
      const { latitude, longitude } = action.payload;
      state.coord.latitude = latitude;
      state.coord.longitude = longitude;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        const location = action.payload.location;
        if (location) {
          state.city = location.name;
          state.state = location.region;
          state.country = location.country;
        }
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;
