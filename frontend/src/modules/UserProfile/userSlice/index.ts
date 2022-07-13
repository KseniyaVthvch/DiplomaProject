import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAvatar {
  fileB64: string;
  mimetype: string;
}

export interface IUser {
  name: string;
  email: string;
  role: string;
  _id: string;
  avatar: IAvatar;
}

const initialState = {
  user: {} as IUser,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.user = { ...action.payload, _id: action.payload?._id };
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
