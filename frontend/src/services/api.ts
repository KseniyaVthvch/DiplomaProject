import { createApi } from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "../store/store";
import { logOut, refreshTokens } from "../modules/Auth/authSlice";

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ISignUpRequest extends ILoginRequest {
  name: string;
}

export interface IAuthResponse {
  access_token: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:7000",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshToken = (api.getState() as RootState).auth.refresh_token;
    const refreshResult = await baseQuery(
      {
        url: "auth/refresh",
        method: "POST",
        body: { refresh_token: refreshToken },
      },
      api,
      extraOptions
    );
    if (refreshResult.data) {
      api.dispatch(refreshTokens(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["Course", "User", "Answer", "Task"],
  endpoints: () => ({}),
});
