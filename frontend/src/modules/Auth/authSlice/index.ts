import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isAuth: boolean;
  token: string | null;
  refresh_token: string | null;
}

const initialState: UserState = {
  isAuth: false,
  token: null,
  refresh_token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, { payload }) => {
      state.isAuth = true;
      state.token = payload.access_token;
      state.refresh_token = payload.refresh_token;
    },

    refreshTokens: (state, { payload }) => {
      state.token = payload.access_token;
      state.refresh_token = payload.refresh_token;
    },

    logOut: (state) => {
      return initialState;
    },
  },
});

export const { logOut, setAuth, refreshTokens } = authSlice.actions;

export default authSlice.reducer;
