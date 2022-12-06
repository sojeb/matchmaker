import { Button, Card, Form, Input, message, Row, notification } from "antd";
import EmptyLayout from "../layout/EmptyLayout";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import User from "../../service/UserService";
import { useDispatch } from "react-redux";
import { setUser } from "../../reducers/user.reducers";
import ARMForm from "../../lib/common/ARMForm";

export default function Login() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const onFinish = (values) => {
    User.signin(values)
      .then((response) => {
        localStorage.setItem("userId", `${response.data.id}`);
        localStorage.setItem("token", `${response.data.token}`);
        localStorage.setItem("refreshToken", `${response.data.refreshToken}`);
        dispatch(setUser(response.data));
        notification["success"]({
          message: "Successfully login",
        });
        navigate("/");
      })
      .catch((error) => {
        notification["error"]({
          message: "Username or password invalid",
        });
        console.log("something went wrong", error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <EmptyLayout>
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh",
          backgroundImage:
            "url(https://www.zooinfotech.com/wp-content/uploads/2018/05/us-bangla-air.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <Card>
          <ARMForm
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="login"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </ARMForm>
        </Card>
      </Row>
    </EmptyLayout>
  );
}
