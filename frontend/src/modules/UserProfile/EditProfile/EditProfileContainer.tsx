import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Button, Form, Input, Row, Upload, Modal } from "antd";
import Loader from "../../../components/Loader/Loader";
import Card from "../../../components/Card/Card";
import { useUpdateUserMutation } from "../userSlice/endpoints";
import { setUser } from "../userSlice";
import { EditOutlined } from "@ant-design/icons";

const EditProfileContainer = () => {
  const dispatch = useAppDispatch();
  const [updateUser, { isLoading, isSuccess }] = useUpdateUserMutation({
    fixedCacheKey: "updateUser",
  });
  const [form] = Form.useForm();
  const { user } = useAppSelector((state) => state.user);

  const [file, setFile] = useState<any>();

  const [isVisible, setIsVisible] = useState(false);

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData();
      if (values.avatar) {
        values.avatar = values.avatar.file;
      } else {
        delete values.avatar;
      }
      Object.keys(values).forEach((key) => formData.append(key, values[key]));
      const newUserInfo = await updateUser({
        id: user._id,
        payload: formData,
      }).unwrap();
      if (newUserInfo) {
        dispatch(setUser(newUserInfo));
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    if (isSuccess) setIsVisible(false);
  }, [isSuccess]);

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
    <>
      <Button
        className="icon-button create-task__button"
        onClick={() => {
          setIsVisible(true);
        }}
      >
        <EditOutlined />
      </Button>
      <Modal
        width={800}
        title={"Edit profile"}
        visible={isVisible}
        onOk={() => {
          setIsVisible(false);
        }}
        onCancel={() => {
          setIsVisible(false);
        }}
        footer={false}
      >
        <Row justify="center" align="middle">
          <Card className={"edit-profile"}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
              form={form}
            >
              <Form.Item label="Name" name="name" initialValue={user.name}>
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email" initialValue={user.email}>
                <Input />
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
          </Card>
        </Row>
      </Modal>
    </>
  );
};

export default EditProfileContainer;
