import { createSlice } from "@reduxjs/toolkit";

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
    setMessages: (state, action) => {
      const { receiverId, messages } = action.payload;

      if (Array.isArray(messages)) {
        const reversedMessages = [...messages].reverse();
        state.messages[receiverId] = [...reversedMessages];
      } else {
        state.messages[receiverId] = [];
      }
    },
    addPrevMessage: (state, action) => {
      const { receiverId, messages } = action.payload;
      if (state.messages[receiverId]) {
        if (Array.isArray(messages)) {
          const reversedMessages = [...messages].reverse();

          state.messages[receiverId] = [
            ...reversedMessages,
            ...(state.messages[receiverId] || []),
          ];
        }
      }
    },
  },
});

export const { addMessage, setMessages, addPrevMessage } =
  messagesSlice.actions;
export default messagesSlice.reducer;
