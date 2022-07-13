import React, { useState } from "react";
import CreateAnswer from "./CreateAnswer";
import { useCreateAnswerMutation } from "../answersSlice/endpoints";
import { useAppSelector } from "../../../store/hooks";
import Loader from "../../../components/Loader/Loader";

interface CreateAnswerContainerProps {
  refetch: () => void;
}

const CreateAnswerContainer = ({ refetch }: CreateAnswerContainerProps) => {
  const [value, setValue] = useState("");
  const userId = useAppSelector((state) => state.user.user._id);
  const taskId = useAppSelector((state) => state.task.currentTask._id);
  const [createAnswer, { isLoading }] = useCreateAnswerMutation({
    fixedCacheKey: "createAnswer",
  });

  const addAnswerHandler = () => {
    const payload = {
      answer: value,
      userId,
      taskId,
    };
    createAnswer(payload);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : (
    <CreateAnswer
      value={value}
      setValue={setValue}
      addAnswerHandler={addAnswerHandler}
    />
  );
};

export default CreateAnswerContainer;
