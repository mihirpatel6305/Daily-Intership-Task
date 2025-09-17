import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPrevMessage } from "../api/messages";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (receiverId) => {
    const data = await getPrevMessage(receiverId);
    return { receiverId, messages: data };
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: {},
    loading: false,
  },
  reducers: {
    addMessage: (state, action) => {
      const { receiverId, message } = action.payload;
      if (!state.messages[receiverId]) {
        state.messages[receiverId] = [];
      }
      state.messages[receiverId].push(message);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        const { receiverId, messages } = action.payload;
        state.messages[receiverId] = messages || [];
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
