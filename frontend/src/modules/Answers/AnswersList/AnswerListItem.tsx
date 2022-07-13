import React from "react";
import ImageBase from "../../../components/ImageBase";
import { IAnswer } from "../interfaces";
import moment from "moment";
import Grade from "./Grade";
import MDEditor from "@uiw/react-md-editor";

interface AnswerListItemProps {
  answer: IAnswer;
}

const AnswerListItem = ({ answer }: AnswerListItemProps) => {
  const { fileB64, mimetype } = answer.user.avatar;
  const date = moment(answer.createdAt).format("MMMM Do YYYY, h:mm:ss a");
  return (
    <div className="answer-item__wrapper">
      <div className="answer-item__image-wrapper">
        <ImageBase
          file={fileB64}
          type={mimetype}
          className={"answer-item-list__image"}
        />
        <div>
          <div className="student-name">{answer.user.name}</div>
          <div>{date}</div>
        </div>
        <Grade grade={answer.grade} answerId={answer._id} />
      </div>

      <div>
        <MDEditor.Markdown source={answer.answer} />
      </div>
    </div>
  );
};

export default AnswerListItem;
