import { Col, Form, Input, Row, Empty, Space, Breadcrumb, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import ARMTable from "../../common/ARMTable";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";
import ARMCard from "../../common/ARMCard";
import { useUsersSearch } from "../../../lib/hooks/users/useUsersSearch";
import ResponsiveTable from "../../common/ResposnsiveTable";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import ActiveInactive from "../../common/ActiveInactive";
import { EditOutlined, FilterOutlined, LockOutlined, RollbackOutlined, UnlockOutlined } from "@ant-design/icons";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";

export default function Users() {
  const { allUsers, onFinish, form, isActive, setIsActive, handleStatus } = useUsersSearch();

  const onReset = () => {
    form.resetFields();
  };



  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/configurations">
              <i className="fas fa-cog" /> &nbsp;Configurations
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Users</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle("Users List", "/configurations/users/add", true)}>
        <Form
          name="basic"
          form={form}
          wrapperCol={{
            span: 24,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[20, 0]}>
            <Col xs={24} lg={8} md={8}>
              <Form.Item label="" name="firstName">
                <Input placeholder="Enter First Name" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8} md={8}>
              <Form.Item label="" name="roleId">
                <Input placeholder="Enter Role Id" />
              </Form.Item>
            </Col>
            <Col xs={24} lg={8} md={8}>
              <Form.Item
                wrapperCol={{
                  span: 12,
                }}
              >
                <Space>
                  <ARMButton type="primary" htmlType="submit">
                    <FilterOutlined />
                    Filter
                  </ARMButton>
                  <ARMButton type="primary" htmlType="button" onClick={onReset}>
                    <RollbackOutlined />
                    Reset
                  </ARMButton>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <ActiveInactive isActive={isActive} setIsActive={setIsActive} />
        <ResponsiveTable>
          <ARMTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Login</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.length === 0 ? (
                <Row justify="end">
                  <tbody>
                    <Empty style={{ marginTop: "10px" }} />
                  </tbody>
                </Row>
              ) : null}
              {allUsers?.map((user, index) => (
                <tr key={user.id}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.login}</td>
                  <td>{user.roleName}</td>
                  <td>
                    <Space size="small">
                      <Link to={`edit/${user.id}`}>
                        <ARMButton
                          type="primary"
                          size="small"
                          style={{
                            backgroundColor: "#6e757c",
                            borderColor: "#6e757c",
                          }}
                        >
                          <EditOutlined />
                        </ARMButton>
                      </Link>

                      <Popconfirm title={isActive ? "Are you sure to change status to inactive" : "Are you sure to change status to active"} okText="Yes" cancelText="No" onConfirm={() => handleStatus(user.id, !user.isActive)} placement="topRight">
                        {user.isActive ? (
                          <ARMButton
                            type="primary"
                            size="small"
                            style={{
                              backgroundColor: "#53a351",
                              borderColor: "#53a351",
                            }}
                          >
                            <UnlockOutlined />
                          </ARMButton>
                        ) : (
                          <ARMButton type="primary" size="small" danger>
                            <LockOutlined />
                          </ARMButton>
                        )}
                      </Popconfirm>
                    </Space>
                  </td>
                </tr>
              ))}
            </tbody>
          </ARMTable>
        </ResponsiveTable>
      </ARMCard>
    </CommonLayout>
  );
}
