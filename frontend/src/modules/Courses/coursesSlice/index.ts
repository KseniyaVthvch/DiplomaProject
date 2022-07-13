import { createSlice } from "@reduxjs/toolkit";
import { ICourse, ICourseInfo } from "../interfaces";

interface CoursesState {
  courses: Array<ICourse>;
  error: string | null;
  selectedCourseId: string | null;
  selectedCourse: ICourseInfo;
}

const initialState: CoursesState = {
  courses: [],
  error: null,
  selectedCourseId: null,
  selectedCourse: {} as ICourseInfo,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, { payload }) => {
      state.courses = payload;
    },
    setSelectedCourseId: (state, { payload }) => {
      state.selectedCourseId = payload;
    },
    setSelectedCourse: (state, { payload }) => {
      state.selectedCourse = payload;
    },
  },
});

export const { setCourses, setSelectedCourseId, setSelectedCourse } =
  coursesSlice.actions;

export default coursesSlice.reducer;
