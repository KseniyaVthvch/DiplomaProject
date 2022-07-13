import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import MDEditor from "@uiw/react-md-editor";

const { TextArea } = Input;

export interface CreateAnswerProps {
  value: string;
  setValue: (value: string) => void;
  addAnswerHandler: () => void;
}

const CreateAnswer = ({
  value,
  setValue,
  addAnswerHandler,
}: CreateAnswerProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onOk = () => {
    addAnswerHandler();
    setIsModalVisible(false);
  };

  const onCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="create-answer__container">
      <Button
        style={{ borderRadius: "8px" }}
        className="create-answer__button"
        type="primary"
        onClick={() => setIsModalVisible(true)}
      >
        Add answer
      </Button>
      <Modal
        title={"Add answer"}
        visible={isModalVisible}
        onOk={onOk}
        onCancel={onCancel}
      >
        <MDEditor
          height={400}
          value={value}
          onChange={(val) => setValue(val as string)}
        />
        {/*<TextArea*/}
        {/*  rows={4}*/}
        {/*  value={value}*/}
        {/*  onChange={(e) => setValue(e.target.value)}*/}
        {/*/>*/}
      </Modal>
    </div>
  );
};

export default CreateAnswer;
