import React from "react";
import NoData from "../Illustrations/NoData";

interface NoDataWrapperProps {
  message?: string;
}

const NoDataWrapper = ({ message }: NoDataWrapperProps) => {
  const text = message || "There is no data";
  return (
    <div className="no-data__container">
      <NoData />
      <p>{text}</p>
    </div>
  );
};

export default NoDataWrapper;
