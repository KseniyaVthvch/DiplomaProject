import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../store/hooks";
import ManageTask from "./ManageTask";
import { ITask } from "../interfaces";
import { useUpdateTaskMutation } from "../tasksSlice/endpoints";

interface ManageTaskContainerProps {
  currentTask: ITask;
}

interface IFormData {
  task: string;
  description: string;
  courseId: string;
}

const EditTaskContainer = ({ currentTask }: ManageTaskContainerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { selectedCourseId } = useAppSelector((state) => state.courses);
  const [formData, setFormData] = useState<IFormData>();
  const [updateTask] = useUpdateTaskMutation({ fixedCacheKey: "updateTask" });

  useEffect(() => {
    setFormData({
      task: currentTask?.task,
      description: currentTask?.description,
      courseId: selectedCourseId as string,
    });
  }, [currentTask, selectedCourseId]);

  const onEditTask = async () => {
    try {
      await updateTask({ id: currentTask._id, payload: formData });
      setIsVisible(false);
    } catch (e) {}
  };

  const editConfig = {
    title: "Edit task",
    button: <EditOutlined />,
    onSendData: onEditTask,
  };

  return formData ? (
    <ManageTask
      formData={formData}
      setFormData={setFormData}
      config={editConfig}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    />
  ) : null;
};

export default EditTaskContainer;
