import React from "react";
import { IAnswers } from "../interfaces";
import NoDataWrapper from "../../../components/NoDataWrapper/NoDataWrapper";
import Card from "../../../components/Card/Card";
import AnswerListItem from "./AnswerListItem";

interface AnswersListProps {
  data: IAnswers[];
}

const AnswersList = ({ data }: AnswersListProps) => {
  return (
    <div>
      {data.map((item) =>
        item.answers.length > 0 ? (
          <Card className="answer-item__card" title={item.task} key={item._id}>
            {item?.answers?.map((item) => (
              <div key={item._id}>
                <AnswerListItem answer={item} />
              </div>
            ))}
          </Card>
        ) : (
          <NoDataWrapper />
        )
      )}
    </div>
  );
};

export default AnswersList;
