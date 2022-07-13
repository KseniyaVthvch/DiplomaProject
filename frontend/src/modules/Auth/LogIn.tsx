import React from "react";
import { Form, Input, Button, Row } from "antd";
import Card from "../../components/Card/Card";
import { useAppDispatch } from "../../store/hooks";
import { setAuth } from "./authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginMutation } from "./authSlice/endpoints";
import Loader from "../../components/Loader/Loader";

interface ILocation {
  state: {
    from: {
      pathname: string;
    };
  };
}

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const { state } = location as ILocation;
  const from = state?.from.pathname || "/";

  const onFinish = async (values: any) => {
    try {
      const result = await login(values).unwrap();
      dispatch(setAuth(result));

      navigate(from, { replace: true });
    } catch (error) {
      console.log({ error });
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <Row justify="center" align="middle">
      <Card>
        <h3>Sign In</h3>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
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

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div>
          No account?
          <Link to="/signup" state={{ from: location }}>
            Create one
          </Link>
        </div>
        <div className='login_user-profiles'>
          <div>
            <h4>Student:</h4>
            <div>email: student@gmail.com <br /> password: student098</div>
          </div>
          <div>
            <h4>Teacher:</h4>
            <div>email: teacher1@gmail.com <br /> password: teacher1098</div>
          </div>
        </div>
      </Card>
    </Row>
  );
};

export default LogIn;
