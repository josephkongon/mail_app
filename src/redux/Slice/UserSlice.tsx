import { createSlice } from '@reduxjs/toolkit';

const initialStart: userType = {
  userId: '',
  username: '',
  Token: '',
};
// @ts-ignore */
const UserSlice = createSlice({
  name: 'user',
  initialState: initialStart,
  reducers: {
    setUserData: (start, { payload }) => {
      start.userId = payload.userId;
      start.username = payload.username;
      start.Token = payload.token;
    },
  },
});

export const { setUserData } = UserSlice.actions;
export default UserSlice.reducer;

interface userType {
  userId: string;
  username: string;
  Token: string;
}
