import { api } from "../../../services/api";

interface QueryParams {
  taskId: string;
  userId: string;
}

export const answersEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    createAnswer: builder.mutation({
      query: (payload) => ({
        method: "POST",
        url: "answer",
        body: payload,
      }),
    }),
    getAnswerByUserAnsTaskIds: builder.query<any, QueryParams>({
      query(payload) {
        return `answer?userId=${payload.userId}&taskId=${payload.taskId}`;
      },
    }),
    getAllAnswers: builder.query({
      query(payload) {
        return `task/answers?userId=${payload.userId}&courseId=${payload.courseId}`;
      },
      providesTags: ["Answer"],
    }),
    addGrade: builder.mutation<any, any>({
      query: (data) => {
        const { id, payload } = data;
        return {
          url: `answer/grade/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["Answer"],
    }),
    getAverage: builder.query({
      query(payload) {
        return `answer/grade/average/${payload.userId}`;
      },
    }),
  }),
});

export const {
  useCreateAnswerMutation,
  useGetAnswerByUserAnsTaskIdsQuery,
  useGetAllAnswersQuery,
  useAddGradeMutation,
  useGetAverageQuery,
} = answersEndpoints;
