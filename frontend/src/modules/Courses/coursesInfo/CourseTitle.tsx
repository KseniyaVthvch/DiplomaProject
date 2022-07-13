import React from "react";
import { Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDeleteCourseMutation } from "../coursesSlice/endpoints";
import { useNavigate } from "react-router-dom";
import { TeamOutlined } from "@ant-design/icons";
import { useIsTeacher } from "../../../App";

interface TitleProps {
  title: string;
  id: string;
  studentsCount?: number;
}

const Title = ({ title, id, studentsCount }: TitleProps) => {
  const navigate = useNavigate();
  const { isTeacher } = useIsTeacher();

  const [visible, setVisible] = React.useState(false);
  const [deleteCourse, { isLoading }] = useDeleteCourseMutation({
    fixedCacheKey: "deleteCourse",
  });

  const handleOk = (e: any) => {
    try {
      deleteCourse(id);
      setVisible(false);
      navigate("/");
    } catch (e) {
      setVisible(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div className="course-title__wrapper">
      <div>
        {title}
        <span className="course-title__icon-wrapper">
          <TeamOutlined />
          <span className="count-of-course-members">{studentsCount}</span>
        </span>
      </div>
      {isTeacher && (
        <Button
          className=" icon-button delete-task__button"
          onClick={() => setVisible(true)}
        >
          <DeleteOutlined />
        </Button>
      )}
      <Modal
        visible={visible}
        onOk={(e) => handleOk(e)}
        confirmLoading={isLoading}
        onCancel={handleCancel}
      >
        <p>
          Course <b>{title}</b> will be deleted
        </p>
      </Modal>
    </div>
  );
};

export default Title;
