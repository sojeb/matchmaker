import {
  Breadcrumb,
  Col,
  Form,
  Input,
  notification,
  Row,
  Select,
  Space,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getErrorMessage } from "../../../lib/common/helpers";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import ModelsService from "../../../service/ModelsService";
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
const Models = () => {
  let { id } = useParams();
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [aircraft, setAircraft] = useState([]);
  const [modelType, setModelType] = useState([]);
  const [lifeCode, setLifeCode] = useState([]);
  const getLifeCode = () => {
    let data = [
      { id: 1, name: "FLY_HOUR" },
      { id: 2, name: "CYCLE" },
      { id: 3, name: "CALENDER" },
    ];
    setLifeCode(data);
  };
  const getAllModelType = async () => {
    let data = [
      { id: 1, name: "AF TCI" },
      { id: 2, name: "COMPONENT" },
      { id: 3, name: "ENGINE" },
      { id: 4, name: "ENGINE LLP" },
      { id: 5, name: "ENGINE LRU" },
      { id: 6, name: "ENGINE TCI" },
      { id: 7, name: "MLG LLP" },
      { id: 8, name: "NLG" },
      { id: 9, name: "NLG LLP" },
      { id: 10, name: "PROPELLER" },
      { id: 11, name: "PROPELLER TCI" },
    ];
    setModelType(data);
  };
  useEffect(() => {
    getAllModelType();
    getLifeCode();
  }, []);
  useEffect(() => {
    if (id) {
      getLifeCode();
    }
  }, [id]);
  const loadSingleData = async () => {
    try {
      const { data } = await ModelsService.singleData(id);
      console.log("data", data);
      form.setFieldsValue({
        ...data,
      });
    } catch (er) {
      notification["error"]({ message: getErrorMessage(er) });
    }
  };

  const getAllAircraft = async () => {
    try {
      const { data } = await ModelsService.getAllAircraftModel();
      setAircraft(data.model);
    } catch (er) {
      notification["error"]({ message: getErrorMessage(er) });
    }
  };

  const onFinish = async (values) => {
    console.log("values", values);
    if (id) {
      try {
        const { data } = await ModelsService.updateModels(id, values);
        navigate("/planning/models");
        notification["success"]({
          message: "Models successfully updated",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    } else {
      try {
        const { data } = await ModelsService.saveModels(values);

        console.log("values", values);
        navigate("/planning/models");
        notification["success"]({
          message: "Models successfully created",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    }
  };
  const onReset = async () => {
    if (id) {
      const { data } = await ModelsService.singleData(id);
      form.resetFields();
      form.setFieldsValue({ ...data });
    } else {
      form.resetFields();
    }
  };
  useEffect(() => {
    if (id) {
      loadSingleData();
    }
  }, [id]);
  useEffect(() => {
    getAllAircraft();
  }, []);
  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            {" "}
            <Link to="/planning">
              {" "}
              <i className="fas fa-chart-line" />
              &nbsp; Planning
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to="/planning/models">Models</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Model</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle("Model", "/planning/models")}>
        <Form
          {...layout}
          form={form}
          name="Models"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Row>
            <Col sm={20} md={10}>
              <Form.Item
                name="aircraftModelId"
                label="Aircraft Model"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="--Select Aircraft Model--">
                  {aircraft?.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.aircraftModelName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name="modelTypeId"
                label="Model Type"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="--Select Model Type--">
                  {modelType?.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="modelName"
                label="Model name"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="version"
                label="Version"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lifeCodes"
                label="Life code"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="--Please select--"
                  value={lifeCode}
                >
                  {lifeCode?.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: false,
                  },
                ]}
                style={{ marginBottom: "12px" }}
              >
                <TextArea />
              </Form.Item>
            </Col>
            <Col sm={22} md={12}></Col>
          </Row>
          <Row>
            <Col sm={20} md={10}>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Space size="small">
                  <ARMButton size="medium" type="primary" htmlType="submit">
                    {id ? "Update" : "Submit"}
                  </ARMButton>
                  <ARMButton
                    onClick={onReset}
                    size="medium"
                    type="primary"
                    danger
                  >
                    Reset
                  </ARMButton>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ARMCard>
    </CommonLayout>
  );
};

export default Models;
