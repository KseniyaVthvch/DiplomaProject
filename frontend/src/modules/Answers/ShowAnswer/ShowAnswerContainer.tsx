import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { useGetAnswerByUserAnsTaskIdsQuery } from "../answersSlice/endpoints";
import CreateAnswerContainer from "../CreateAnswer/CreateAnswerContainer";
import ShowAnswer from "./ShowAnswer";
import Loader from "../../../components/Loader/Loader";

const ShowAnswerContainer = () => {
  const userId = useAppSelector((state) => state.user.user._id);
  const taskId = useAppSelector((state) => state.task.currentTask._id);
  const {
    data: answer,
    isLoading,
    isError,
    refetch,
  } = useGetAnswerByUserAnsTaskIdsQuery(
    { userId, taskId },
    { skip: !taskId || !userId }
  );

  if (!answer) return <CreateAnswerContainer refetch={refetch} />;
  return isLoading ? <Loader /> : <ShowAnswer answer={answer} />;
};

export default ShowAnswerContainer;
