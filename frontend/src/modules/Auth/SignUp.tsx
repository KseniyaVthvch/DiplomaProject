import React, { FC, useState } from "react";
import { Form, Input, Button, Row, Select, Upload } from "antd";
import Card from "../../components/Card/Card";
import { useAppDispatch } from "../../store/hooks";
import { setAuth } from "./authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSignupMutation } from "./authSlice/endpoints";
import Loader from "../../components/Loader/Loader";

export enum Role {
  Teacher = "teacher",
  Student = "student",
  Admin = "admin",
}

const SignUp: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [signup, { isLoading }] = useSignupMutation({
    fixedCacheKey: "signUp",
  });
  const { Option } = Select;
  const [form] = Form.useForm();

  const [file, setFile] = useState<any>();

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      const newValues = { ...values, avatar: values.avatar.file };
      Object.keys(newValues).forEach((key) =>
        formData.append(key, newValues[key])
      );
      const result = await signup(formData).unwrap();
      dispatch(setAuth(result));
      navigate("/", { replace: true });
    } catch (error) {
      console.log({ error });
    }
  };

  const onGenderChange = (value: string) => {
    form.setFieldsValue({ role: value.toLowerCase() });
  };
  const props = {
    beforeUpload: (file: any) => {
      setFile(file);
      return false;
    },
    file,
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Row justify="center" align="middle">
      <Card>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="role" label="Role">
            <Select placeholder="Select" onChange={onGenderChange} allowClear>
              {Object.keys(Role).map((key) => (
                <Option key={`${Date.now()}-${key}`} value={key}>
                  {key}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="photo" name="avatar" valuePropName="file">
            <Upload name="avatar" {...props}>
              <Button>Select File</Button>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div>
          Already have an account?
          <Link to="/login" state={{ from: location }}>
            Log in
          </Link>
        </div>
      </Card>
    </Row>
  );
};

export default SignUp;
