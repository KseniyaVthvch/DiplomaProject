import React from "react";
import { Button, Input, Modal } from "antd";
import MDEditor from "@uiw/react-md-editor";

interface ManageTaskProps {
  config: {
    title: string;
    button: React.ReactNode;
    onSendData: () => void;
  };
  formData: any;
  setFormData: (data: any) => void;
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const ManageTask = ({
  config,
  formData,
  setFormData,
  isVisible,
  setIsVisible,
}: ManageTaskProps) => {
  return (
    <>
      <Button
        className="icon-button create-task__button"
        onClick={() => {
          setIsVisible(true);
        }}
      >
        {config.button}
      </Button>
      <Modal
        width={800}
        title={config.title}
        visible={isVisible}
        onOk={() => {
          setIsVisible(false);
        }}
        onCancel={() => {
          setIsVisible(false);
        }}
        footer={false}
      >
        <div className="container">
          <Input
            placeholder="Task Title"
            style={{ marginBottom: "20px" }}
            value={formData.task}
            onChange={(e) =>
              setFormData((state: any) => ({ ...state, task: e.target.value }))
            }
          />
          <MDEditor
            height={400}
            value={formData.description}
            onChange={(val) => {
              setFormData((state: any) => ({ ...state, description: val! }));
            }}
          />
          <Button
            style={{ marginTop: "20px" }}
            type="primary"
            onClick={() => config.onSendData()}
          >
            Save
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ManageTask;
