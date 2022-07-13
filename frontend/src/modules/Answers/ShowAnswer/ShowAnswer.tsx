import React from "react";
import moment from "moment";
import { useAppSelector } from "../../../store/hooks";
import { getPerformanceSetting } from "../../../services/getPerfomanceSetting";
import MDEditor from "@uiw/react-md-editor";

const ShowAnswer = ({ answer }: { answer: any }) => {
  const { status } = getPerformanceSetting(answer.grade);
  const date = moment(answer?.createdAt).format("MMMM Do YYYY");
  const { task } = useAppSelector((state) => state.task.currentTask);
  return (
    <div className="task-details__wrapper answer-button__wrapper">
      <div className="answer__header">
        <div className="answer__header-title">Answer</div>
        <div className="answer-info__date">{date}</div>
        <div className="answer__header-subtitle">
          Grade:
          {answer.grade ? (
            <span className={status}>{answer.grade}</span>
          ) : (
            <span>Answer has not graded yet</span>
          )}
        </div>
      </div>
      <MDEditor.Markdown source={answer?.answer} />
    </div>
  );
};

export default ShowAnswer;
