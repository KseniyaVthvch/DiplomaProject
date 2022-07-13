import { api, IAuthResponse, ILoginRequest } from "../../../services/api";


export const authEndpoints = api.injectEndpoints({
  endpoints: builder=>({
    login: builder.mutation<IAuthResponse, ILoginRequest>({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        body: payload,
      }),
    }),

    signup: builder.mutation<IAuthResponse, any>({
      query: (payload) => ({
        url: "auth/signup",
        method: "POST",
        body: payload,
      }),
    }),
  })
})

export const {useLoginMutation, useSignupMutation} = authEndpoints