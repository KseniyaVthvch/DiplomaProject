import React from "react";
import Card from "../../../components/Card/Card";
import { CoursesInfoProps } from "../interfaces";
import NoDataWrapper from "../../../components/NoDataWrapper/NoDataWrapper";

const Courses = ({ courses, handleClick }: CoursesInfoProps) => {
  return (
    <>
      <h1 className="app-header">Courses</h1>
      <div className="course__container">
        {Boolean(courses?.length) ? (
          courses?.map((course) => (
            <Card
              onClick={() => handleClick(course._id, course)}
              key={course._id}
              title={course.courseTitle}
              className="course-card"
            >
              {course.description}
            </Card>
          ))
        ) : (
          <NoDataWrapper />
        )}
      </div>
    </>
  );
};

export default Courses;
