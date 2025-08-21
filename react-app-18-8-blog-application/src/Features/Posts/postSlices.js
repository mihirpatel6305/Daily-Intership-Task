import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/axios";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/");
      return res.data;
    } catch (error) {
      const message = error.message;
      return rejectWithValue(message);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    removePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post.id !== Number(action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const postActions = postSlice.actions;

export default postSlice.reducer;
