import { api } from "../../../services/api";
import { ICourse, ICourseInfo } from "../interfaces";

export const coursesEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<ICourseInfo[], any>({
      query: (userId) => {
        return `/courses/${userId}`;
      },
      providesTags: ["Course"],
    }),
    getCoursesById: builder.query<ICourse, string>({
      query: (courseId) => {
        return `/courses/info/${courseId}`;
      },
      providesTags: ["Course"],
    }),
    createCourse: builder.mutation({
      query: (payload) => ({
        url: "/courses",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Course"],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useGetCoursesByIdQuery,
  useDeleteCourseMutation,
} = coursesEndpoints;
