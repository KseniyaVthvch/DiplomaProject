import React, { FC, ReactNode } from "react";

interface CustomCardProps {
  title?: string | ReactNode;
  className?: string;
  onClick?: () => void;
  style?: any;
  children: ReactNode;
}

const CustomCard: FC<CustomCardProps> = ({
  title,
  className,
  onClick,
  style,
  children,
}) => {
  return (
    <div
      className={`custom-card ant-card ${className}`}
      onClick={onClick}
      style={style}
    >
      {title && <div className="card-title">{title}</div>}
      <div className="card-body">{children}</div>
    </div>
  );
};

export default CustomCard;
