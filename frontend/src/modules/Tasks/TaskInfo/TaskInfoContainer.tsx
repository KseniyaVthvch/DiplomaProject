import React, { useCallback, useEffect } from "react";
import { useIsTeacher } from "../../../App";
import TaskInfo from "./TaskInfo";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../store/hooks";
import { setCurrentTask } from "../tasksSlice";
import { ITask } from "../interfaces";
import { useGetCoursesByIdQuery } from "../../Courses/coursesSlice/endpoints";
import { Navigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import NoDataWrapper from "../../../components/NoDataWrapper/NoDataWrapper";

const TaskInfoContainer = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { isTeacher } = useIsTeacher();
  const paramId = params.id as string;

  const courses = useAppSelector((state) => state.courses.courses);
  const currentTask = useAppSelector((state) => state.task.currentTask);
  const isIdCorrect = courses.some((item) => item._id === paramId);
  const { data, isLoading, refetch } = useGetCoursesByIdQuery(paramId, {
    skip: !isIdCorrect,
  });

  const setTask = useCallback(
    (task: ITask) => {
      dispatch(setCurrentTask(task));
    },
    [dispatch]
  );

  useEffect(() => {
    const tasks = data?.tasks;
    if (tasks) {
      const updatedTaskIndex = tasks.findIndex(
        (item) => item._id === currentTask?._id
      );
      const index = updatedTaskIndex < 0 ? 0 : updatedTaskIndex;
      setTask(tasks[index || 0]);
    }
  }, [currentTask, setTask, data]);

  if (!isIdCorrect) return <Navigate to={"/"} />;
  return isLoading ? (
    <Loader />
  ) : data ? (
    <TaskInfo
      isTeacher={isTeacher}
      setTask={setTask}
      currentTask={currentTask}
      refetch={refetch}
      data={data}
    />
  ) : (
    <NoDataWrapper />
  );
};

export default TaskInfoContainer;
