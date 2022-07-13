import React from "react";
import { Button, Form, Input, Select } from "antd";
import { IUser } from "../../UserProfile/userSlice";
import Card from "../../../components/Card/Card";
const { Option } = Select;

export interface CreateCourseProps {
  data: IUser[];
  onFinish: (values: any) => Promise<void>;
}

const CreateCourse = ({ data, onFinish }: CreateCourseProps) => {
  return (
    <div>
      <h1 className="app-header">Course creation</h1>
      <Card className="course-creation">
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="courseTitle"
            rules={[{ required: true, message: "Please input title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="students" label="Students">
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Students"
            >
              {data?.map((item) => (
                <Option key={item._id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default CreateCourse;
