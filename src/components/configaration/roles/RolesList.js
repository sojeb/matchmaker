import CommonLayout from "../../layout/CommonLayout";
import ARMCard from "../../common/ARMCard";
import ARMTable from "../../common/ARMTable";
import { Button, Space, Row, Col, notification, Popconfirm } from "antd";
import ARMButton from "../../common/buttons/ARMButton";
import { Link } from "react-router-dom";
import RoleService from "../../../service/RoleService";
import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../lib/common/helpers";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
/* eslint-disable no-template-curly-in-string */

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

export default function RolesList() {
  const [roleData, setRoleData] = useState([]);

  const getAllRole = () => {
    RoleService.getAllRole(true)
      .then((response) => {
        setRoleData(response.data);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  };

  // const handleDelete = async (id) => {
  //   try {
  //     const { data } = await RoleService.deleteRole(id);
  //     getAllRole();
  //     notification["success"]({
  //       message: "Role successfully deleted",
  //     });
  //   } catch (er) {
  //     notification["error"]({ message: getErrorMessage(er) });
  //   }
  // };

  useEffect(() => {
    getAllRole();
  }, []);

  return (
    <CommonLayout>
      <Space
        direction="vertical"
        size="middle"
        style={{
          display: "flex",
        }}
      >
        <ARMCard
          title={
            <Row justify="space-between">
              <Col>Role List</Col>
              <Col>
                <Button type="primary">
                  <Link title="add" to="/configurations/add/role">
                    <PlusOutlined />
                    Add
                  </Link>
                </Button>
              </Col>
            </Row>
          }
        >
          <ARMTable>
            <thead>
              <tr>
                <th>Role</th>
                <th>Edit</th>
                <th>Duplicate</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {roleData?.map((role, index) => (
                <tr key={role.id}>
                  <td>{role.name}</td>
                  <td>
                    <Link to={`/configurations/add/role/${role.id}`}>
                      <ARMButton size="small" type="primary">
                        Edit
                      </ARMButton>
                    </Link>
                  </td>
                  <td>
                    <Link
                      to={`/configurations/duplicate/role/${role.id}/${role.name}`}
                    >
                      <ARMButton size="small" type="primary">
                        Duplicate
                      </ARMButton>
                    </Link>
                  </td>
                  <td>
                    <Popconfirm
                      title="Do you really want to delete this role?"
                      // onConfirm={() => handleDelete(role.id)}
                    >
                      <ARMButton size="small" type="primary" danger>
                        Delete
                      </ARMButton>
                    </Popconfirm>
                  </td>
                </tr>
              ))}
            </tbody>
          </ARMTable>
        </ARMCard>
      </Space>
    </CommonLayout>
  );
}
