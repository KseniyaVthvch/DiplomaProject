import { api } from "../../../services/api";

export const tasksEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => {
        return `/task`;
      },
      providesTags: ["Task"],
    }),

    createTask: builder.mutation<any, any>({
      query: (payload) => ({
        url: "/task",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Course", "Task"],
    }),

    updateTask: builder.mutation<any, any>({
      query: (data) => {
        const { id, payload } = data;
        return {
          url: `/task/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Course"],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useCreateTaskMutation,
  useGetTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = tasksEndpoints;
