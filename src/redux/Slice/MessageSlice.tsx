import { createSlice } from '@reduxjs/toolkit';

export interface messageType {
  id: string;
  subject: string;
  content: string;
  isRead: boolean;
}
const initialStart: messageType[] = [];
// @ts-ignore */
const MessageSlice = createSlice({
  name: 'message',
  initialState: initialStart,
  reducers: {
    addMessage: (start, { payload }) => {
      start.push(payload);
    },
    setRead: (start, { payload }) => {
      start.forEach((m) => {
        console.log(payload);

        if (m.id === payload) m.isRead = true;
      });
    },
    resetMessages: (start) => {
      while (start.length > 0) {
        start.pop();
      }
    },
  },
});
export const { addMessage, setRead, resetMessages } = MessageSlice.actions;
export default MessageSlice.reducer;
