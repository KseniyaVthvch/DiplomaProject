import React from "react";
import { ITask } from "../interfaces";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal, Button } from "antd";
import { useDeleteTaskMutation } from "../tasksSlice/endpoints";

interface DeleteTaskContainerProps {
  currentTask: ITask;
}

const DeleteTaskContainer = ({ currentTask }: DeleteTaskContainerProps) => {
  const [visible, setVisible] = React.useState(false);
  const [deleteTask, { isLoading }] = useDeleteTaskMutation({
    fixedCacheKey: "deleteTask",
  });

  const handleOk = () => {
    try {
      deleteTask(currentTask?._id);
      setVisible(false);
    } catch (e) {
      setVisible(false);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        className=" icon-button delete-task__button"
        onClick={() => setVisible(true)}
      >
        <DeleteOutlined />
      </Button>
      <Modal
        visible={visible}
        onOk={handleOk}
        confirmLoading={isLoading}
        onCancel={handleCancel}
      >
        <p>
          Task <b>{currentTask.task}</b> will be deleted
        </p>
      </Modal>
    </>
  );
};

export default DeleteTaskContainer;
