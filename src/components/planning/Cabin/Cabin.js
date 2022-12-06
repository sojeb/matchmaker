import {
  Breadcrumb,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getErrorMessage } from "../../../lib/common/helpers";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import CabinService from "../../../service/CabinService";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";

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

const Cabin = () => {
  let { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  console.log("iddd", id);
  const loadSingleData = async (id) => {
    try {
      const { data } = await CabinService.singleData(id);
      form.setFieldsValue({
        id: id,
        code: data.code,
        title: data.title,
      });
    } catch (er) {}
  };
  const onFinish = async (values) => {
    if (id) {
      try {
        const single = {
          cabinId: id.toString(),
          code: values.code,
          title: values.title,
        };
        const { data } = await CabinService.updateCabin(id, single);
        navigate("/planning/cabins");
        notification["success"]({
          message: "Cabin successfully updated",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    } else {
      try {
        const { data } = await CabinService.saveCabin(values);
        navigate("/planning/cabins");
        notification["success"]({
          message: "Cabin successfully created",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  useEffect(() => {
    if (!id) return;
    loadSingleData(id);
  }, [id]);

  return (
    <div>
      <CommonLayout>
        <ARMBreadCrumbs>
          <Breadcrumb separator="/">
            <Breadcrumb.Item>
              <i className="fas fa-chart-line" />
              <Link to="/planning">&nbsp; Planning</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
              <Link to="/planning/cabins">Cabins </Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item> {id ? "edit" : "add"}</Breadcrumb.Item>
          </Breadcrumb>
        </ARMBreadCrumbs>
        <ARMCard title={getLinkAndTitle(`Cabin`, `/planning/cabins`)}>
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
                  name={["code"]}
                  label="Cabin code"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  style={{ marginBottom: "0px" }}
                >
                  <Input size="small" />
                </Form.Item>
                <Form.Item
                  name={["title"]}
                  label="Title"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  style={{ marginBottom: "0px" }}
                >
                  <Input size="small" />
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <ARMButton size="small" type="primary" htmlType="submit">
                    {id ? "Update" : "Add"}
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

export default Cabin;
