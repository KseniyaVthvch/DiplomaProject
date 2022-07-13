import React, { useState } from "react";
import { Button, InputNumber } from "antd";
import { useAddGradeMutation } from "../answersSlice/endpoints";
import { getPerformanceSetting } from "../../../services/getPerfomanceSetting";

export interface GradeProps {
  grade: null | number;
  answerId: string;
}

const Grade = ({ grade, answerId }: GradeProps) => {
  const [value, setValue] = useState(1);
  const [addGrade] = useAddGradeMutation({ fixedCacheKey: "addGrade" });
  const { status } = getPerformanceSetting(grade)

  const sendGrade = async () => {
    try {
      await addGrade({ id: answerId, payload: { grade: value } });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {!grade ? (
        <div className={"answer-grade__wrapper"}>
          <InputNumber min={1} max={100} value={value} onChange={setValue} />
          <Button type="primary" onClick={sendGrade}>
            Save
          </Button>
        </div>
      ) : (
        <div
          className={`answer-grade__wrapper answer-grade ${status}`}
        >
          <span>GRADE: </span>
          {grade}
        </div>
      )}
    </>
  );
};

export default Grade;
