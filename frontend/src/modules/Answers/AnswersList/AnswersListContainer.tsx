import React, { useEffect, useState } from "react";
import AnswersList from "./AnswersList";
import { useGetAllAnswersQuery } from "../answersSlice/endpoints";
import { useAppSelector } from "../../../store/hooks";
import { useGetCoursesQuery } from "../../Courses/coursesSlice/endpoints";
import Loader from "../../../components/Loader/Loader";
import NoDataWrapper from "../../../components/NoDataWrapper/NoDataWrapper";
import { Select } from "antd";

const { Option } = Select;

const AnswersListContainer = () => {
  const [courseId, setCourseId] = useState("");
  const id = useAppSelector((state) => state.user.user._id);
  const { data: courses, isLoading: isCourseFetching } = useGetCoursesQuery(
    id,
    {
      skip: Boolean(!id),
    }
  );
  const { data, isLoading, isFetching } = useGetAllAnswersQuery(
    { userId: id, courseId },
    {
      skip: Boolean(!id || !courseId),
    }
  );

  useEffect(() => {
    if (courses && courses.length > 0) {
      setCourseId(courses[0]._id);
    }
  }, [courses]);
  const onHandleSelect = (id: string) => {
    setCourseId(id);
  };

  if (isCourseFetching || isLoading || isFetching) {
    return <Loader />;
  }
  return (
    <div>
      <div className="answers__select-wrapper">
        <h1 className="app-header">Answers</h1>
        {courses && (
          <Select
            className="answer-list__select"
            defaultValue={courseId || courses[0]._id}
            style={{ width: 120 }}
            onChange={onHandleSelect}
          >
            {courses.map((item) => (
              <Option value={item._id} key={item._id}>
                {item.courseTitle}
              </Option>
            ))}
          </Select>
        )}
      </div>

      {data?.length > 0 ? <AnswersList data={data} /> : <NoDataWrapper />}
    </div>
  );
};

export default AnswersListContainer;
