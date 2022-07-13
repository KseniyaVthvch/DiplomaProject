import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../../store/hooks";
import { useCreateTaskMutation } from "../tasksSlice/endpoints";
import ManageTask from "./ManageTask";

const CreateTaskContainer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { selectedCourseId, selectedCourse } = useAppSelector(
    (state) => state.courses
  );
  const [formData, setFormData] = useState({
    task: "",
    description: "",
    courseId: selectedCourseId,
    author: selectedCourse.author,
  });

  const [createTask] = useCreateTaskMutation({
    fixedCacheKey: "create",
  });

  const onCreateTask = async () => {
    try {
      await createTask(formData).unwrap();
      setIsVisible(false);
    } catch (e) {}
  };

  const createConfig = {
    title: "Create task",
    button: (
      <>
        <PlusCircleOutlined />
        <span style={{ marginLeft: "10px" }}>Create task</span>
      </>
    ),
    onSendData: onCreateTask,
  };

  return (
    <ManageTask
      formData={formData}
      setFormData={setFormData}
      config={createConfig}
      isVisible={isVisible}
      setIsVisible={setIsVisible}
    />
  );
};

export default CreateTaskContainer;
