import { configureStore } from '@reduxjs/toolkit';
import MessageSlice from './Slice/MessageSlice';
import UserSlice from './Slice/UserSlice';
const store = configureStore({
  reducer: {
    user: UserSlice,
    messages: MessageSlice,
  },
});

export { store };
