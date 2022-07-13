import { api } from "../../../services/api";

export const userEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (payload) => {
        return `/user/${payload}`;
      },
    }),
    getAllUsers: builder.query({
      query: (query) => {
        return `/user/filter?role=${query}`;
      },
    }),
    updateUser: builder.mutation<any, any>({
      query: (data) => {
        const { id, payload } = data;
        return {
          url: `/user/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
    }),
  }),
});

export const { useGetUserQuery, useGetAllUsersQuery, useUpdateUserMutation } =
  userEndpoints;
