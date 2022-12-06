import { Breadcrumb, Col, Form, Input, Row, Select } from "antd";
import { Link } from "react-router-dom";
import ARMCard from "../../common/ARMCard";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMForm from "../../../lib/common/ARMForm";
import useUsers from "../../../lib/hooks/users/useUsers";

const { Option } = Select;

export default function AddUsers() {


  const { onFinish,form, id ,handleChange, roleData } = useUsers();

  // console.log(singleUser?.login);
  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/configurations">
              <i className="fas fa-cog" /> &nbsp;Configurations
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to="/configurations/users">Users</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>User</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard
        title={getLinkAndTitle("ADD USER", "/configurations/users", false)}
      >
        <ARMForm
          form={form}
          name="basic"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 12,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          style={{
            backgroundColor: "#ffffff",
          }}
          onFinish={onFinish}
        >
          <Row gutter={[6, 6]} justify="center">
            <Col className="gutter-row" lg={12} xl={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={
                  !id
                    ? [
                        {
                          required: true,
                          message: "Please input first name",
                        },
                      ]
                    : null
                }
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={
                  !id
                    ? [
                        {
                          required: true,
                          message: "Please input last name",
                        },
                      ]
                    : null
                }
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phoneNumber"
                rules={[
                  {
                    required: false,
                    message: "Please input phone number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mobile"
                name="mobile"
                rules={[
                  {
                    required: false,
                    message: "Please input mobile number",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Position"
                name="position"
                rules={
                  !id
                    ? [
                        {
                          required: true,
                          message: "Please input position",
                        },
                      ]
                    : null
                }
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" lg={12} xl={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Role ID"
                name="roleId"
                rules={[
                  {
                    required: true,
                    message: "Please select a role id",
                  },
                ]}
              >
                <Select
                  onChange={handleChange}
                  placeholder="Select a Role Id"
                  allowClear
                >
                  {roleData.map((role) => (
                    <Option key={role.id} value={role.id}>
                      {role.id}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Login"
                name="login"
                rules={[
                  {
                    required: true,
                    message: "Please input login info",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={
                  !id
                    ? [{ required: true, message: "Please input password" }]
                    : null
                }
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Confirm Password"
                name="confirmPassword"
                rules={
                  !id
                    ? [
                        {
                          required: true,
                          message: "Please input confirm password",
                        },
                      ]
                    : null
                }
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Department"
                name="department"
                rules={
                  !id
                    ? [
                        {
                          required: true,
                          message: "Please input department",
                        },
                      ]
                    : null
                }
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Manager Name"
                name="managerName"
                rules={
                  !id
                    ? [
                        {
                          required: true,
                          message: "Please input manger name",
                        },
                      ]
                    : null
                }
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" lg={12} xl={12} md={12} sm={24} xs={24}>
              <Form.Item>
                <ARMButton type="primary" htmlType="submit">
                  {id ? "Update" : "Add"}
                </ARMButton>{" "}
                <ARMButton
                  onClick={() => form.resetFields()}
                  type="primary"
                  danger
                >
                  Reset
                </ARMButton>
              </Form.Item>
            </Col>
          </Row>
        </ARMForm>
      </ARMCard>
    </CommonLayout>
  );
}
