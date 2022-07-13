import React, { useEffect } from "react";
import { useGetCoursesQuery } from "../coursesSlice/endpoints";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setCourses,
  setSelectedCourse,
  setSelectedCourseId,
} from "../coursesSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import Courses from "./Courses";
import { ICourseInfo } from "../interfaces";
import NoDataWrapper from "../../../components/NoDataWrapper/NoDataWrapper";

const CoursesContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const id = useAppSelector((state) => state.user.user._id);
  const { data: courses, isLoading } = useGetCoursesQuery(id, {
    skip: Boolean(!id),
  });

  useEffect(() => {
    dispatch(setCourses(courses));
  }, [courses, dispatch]);

  const handleClick = (courseId: string, course: ICourseInfo) => {
    dispatch(setSelectedCourseId(courseId));
    dispatch(setSelectedCourse(course));
    navigate(`course/${courseId}`);
  };

  return isLoading ? (
    <Loader />
  ) : courses ? (
    <Courses handleClick={handleClick} courses={courses} />
  ) : (
    <NoDataWrapper />
  );
};

export default CoursesContainer;
