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
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getErrorMessage } from "../../../lib/common/helpers";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import ModelTreeService from "../../../service/ModelTreeService";
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

const ModelTree = () => {
  let { id } = useParams();
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const [position, setPosition] = useState([]);
  const [location, setLocation] = useState([]);
  const [models, setModels] = useState([]);

  const getAllPosition = async () => {
    try {
      const { data } = await ModelTreeService.getAllPosition();
      setPosition(data.model);
    } catch (er) {
      notification["error"]({ message: getErrorMessage(er) });
    }
  };
  const getAllLocation = async () => {
    try {
      const { data } = await ModelTreeService.getAllLocation();
      setLocation(data.model);
    } catch (er) {
      notification["error"]({ message: getErrorMessage(er) });
    }
  };
  const getAllModels = async () => {
    try {
      const { data } = await ModelTreeService.getAllModels();
      setModels(data.model);
    } catch (er) {
      notification["error"]({ message: getErrorMessage(er) });
    }
  };
  const loadtSingleData = async () => {
    try {
      const { data } = await ModelTreeService.singleData(id);
      form.setFieldsValue({
        ...data,
      });
    } catch (er) {}
  };

  const onFinish = async (values) => {
    console.log("values", values);
    if (id) {
      try {
        const { data } = await ModelTreeService.updateModelTree(id, values);
        navigate("/planning/model/trees");
        notification["success"]({
          message: "Model tree successfully updated",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    } else {
      try {
        const { data } = await ModelTreeService.saveModelTree(values);
        navigate("/planning/model/trees");
        notification["success"]({
          message: "Model tree successfully created",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    }
  };

  const onReset = async () => {
    if (id) {
      const { data } = await ModelTreeService.singleData(id);
      form.resetFields();
      form.setFieldsValue({
        ...data,
      });
    }
  };
  useEffect(() => {
    loadtSingleData();
  }, [id]);
  useEffect(() => {
    getAllPosition();
    getAllLocation();
    getAllModels();
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
            <Link to="/planning/model/trees">Model Trees</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Model</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle("Model Tree", "/planning/model/trees")}>
        <Form
          {...layout}
          form={form}
          name="majorComponents"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Row>
            <Col sm={20} md={10}>
              <Form.Item
                name="modelId"
                label="Model "
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="--Select Model--">
                  {models?.map((item) => {
                    return (
                      <Select.Option key={item.modelId} value={item.modelId}>
                        {item.modelName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="higherModelId"
                label="Higher Model "
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="--Select Higher Model--">
                  {models?.map((item) => {
                    return (
                      <Select.Option key={item.modelId} value={item.modelId}>
                        {item.modelName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="locationId"
                label="Location"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="--Select Location--">
                  {location?.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="positionId"
                label="Position"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Select placeholder="--Select Position--">
                  {position?.map((item) => {
                    return (
                      <Select.Option
                        key={item.positionId}
                        value={item.positionId}
                      >
                        {item.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col sm={20} md={10}></Col>
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

export default ModelTree;
