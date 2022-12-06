import React, { useEffect, useState } from "react";
import CommonLayout from "../../layout/CommonLayout";
import { useNavigate, useParams } from "react-router-dom";
import ARMCard from "../../common/ARMCard";
import { Space, Row, Col, Form, Input, notification } from "antd";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import { getErrorMessage } from "../../../lib/common/helpers";
import RoleService from "../../../service/RoleService";
import ARMButton from "../../common/buttons/ARMButton";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
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

const AddRole = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  let { name } = useParams();
  console.log("name,id", name, id);
  const [form] = Form.useForm();
  const [roleData, setRoleData] = useState([]);
  const [singleData, setSingleData] = useState();

  const getAllRole = () => {
    RoleService.getAllRole()
      .then((response) => {
        setRoleData(response.data);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  };
  const onFinish = async (values) => {
    if (!name && id) {
      try {
        const single = {
          id: id.toString(),
          name: values.name,
        };
        const { data } = await RoleService.updateRole(id, single);
        navigate("/configurations/roles");
        getAllRole();
        notification["success"]({
          message: "Role successfully updated",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
      form.setFieldsValue({ name: "" });
    } else if (id && name) {
      try {
        const { data } = await RoleService.duplicateRole(id, values.name);
        getAllRole();
        navigate("/configurations/roles");
        notification["success"]({
          message: "Role successfully duplicated",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
      form.setFieldsValue({ name: "" });
    } else {
      try {
        const { data } = await RoleService.SaveRole(values);
        navigate("/configurations/roles");
        getAllRole();
        notification["success"]({
          message: "Role successfully inserted",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
      form.setFieldsValue({ name: "" });
    }
  };
  const loadSingleData = async (id) => {
    try {
      const { data } = await RoleService.singleData(id);
      if (id && name) {
        form.setFieldsValue({
          id: id,
          name: data.name + "-copy",
        });
      } else {
        form.setFieldsValue({
          id: id,
          name: data.name,
        });
        setSingleData(data);
      }
    } catch (er) {
      console.log(er);
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  useEffect(() => {
    getAllRole();
  }, []);

  useEffect(() => {
    if (!id) {
      form.setFieldsValue({ name: "" });
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    loadSingleData(id);
  }, [id]);
  return (
    <div>
      <CommonLayout>
        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
          }}
        ></Space>
        <ARMCard title={getLinkAndTitle(`Role`, `/configurations/roles`)}>
          <Row>
            <Col span={10}>
              <Form
                {...layout}
                form={form}
                name="nest-messages"
                onFinish={onFinish}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name={["name"]}
                  label="Name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <ARMButton size="small" type="primary" htmlType="submit">
                    {name && id ? "Duplicate" : id ? "Update" : "Add"}
                  </ARMButton>{" "}
                  <ARMButton
                    onClick={onReset}
                    size="small"
                    type="primary"
                    danger
                  >
                    Reset
                  </ARMButton>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </ARMCard>
      </CommonLayout>
    </div>
  );
};

export default AddRole;
