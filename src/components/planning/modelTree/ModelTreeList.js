import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  LockOutlined,
  RollbackOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Col,
  Form,
  Input,
  notification,
  Popconfirm,
  Row,
  Select,
  Space,
} from "antd";
import { Link } from "react-router-dom";
import { Option } from "antd/lib/mentions";
import { getErrorMessage } from "../../../lib/common/helpers";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import ActiveInactive from "../../common/ActiveInactive";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMTable from "../../common/ARMTable";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";
import ModelsService from "../../../service/ModelsService";
import ModelTreeService from "../../../service/ModelTreeService";

const ModelTreeList = () => {
  const [form] = Form.useForm();
  const [isActive, setIsActive] = useState(true);
  const [models, setModelTree] = useState([]);
  const [model, setModel] = useState([]);
  const [aircraft, setAircraft] = useState([]);

  const onFinish = async (values) => {
    const searchData = {
      active: isActive,
      modelId: values ? values.modelId : null,
      higherModelId: values ? values.higherModelId : null,
    };
    try {
      const { data } = await ModelTreeService.searchModelTree(searchData);
      setModelTree(data.model);
    } catch (er) {
      notification["error"]({ message: getErrorMessage(er) });
    }
  };
  const handleStatus = async (id) => {
    try {
      const { data } = await ModelTreeService.changeStatus(id, !isActive);
      onFinish(isActive);
      notification["success"]({
        message: "Status chnaged successfully",
      });
    } catch (er) {}
  };
  const getAllModels = async () => {
    try {
      const { data } = await ModelTreeService.getAllModels();
      setModel(data.model);
    } catch (er) {}
  };
  const onReset = () => {
    form.resetFields();
  };
  useEffect(() => {
    getAllModels();
    onFinish();
  }, []);
  useEffect(() => {
    onFinish();
  }, [isActive]);

  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <i className="fas fa-chart-line" />
            <Link to="/planning">&nbsp; Planning</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Model Trees</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard
        title={getLinkAndTitle("Model trees", "/planning/add/model/tree", true)}
      >
        <Form form={form} onFinish={onFinish} initialValues={{ pageSize: 10 }}>
          <Row gutter={20}>
            <Col xs={24} md={6}>
              <Form.Item name="modelId">
                <Select placeholder="-- Select Model--">
                  {model?.map((item) => {
                    return (
                      <Option key={item.modelId} value={item.modelId}>
                        {item.modelName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item name="higherModelId">
                <Select placeholder="-- Select Higher Model--">
                  {model?.map((item) => {
                    return (
                      <Option key={item.modelId} value={item.modelId}>
                        {item.modelName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={5} lg={4}>
              <Form.Item name="pageSize" label="Page Size">
                <Select id="antSelect">
                  <Option value="10">10</Option>
                  <Option value="20">20</Option>
                  <Option value="30">30</Option>
                  <Option value="40">40</Option>
                  <Option value="50">50</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item>
                <Space>
                  <ARMButton size="middle" type="primary" htmlType="submit">
                    <FilterOutlined /> Filter
                  </ARMButton>
                  <ARMButton size="middle" type="primary" htmlType="reset">
                    <RollbackOutlined onClick={onReset} /> Reset
                  </ARMButton>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <ActiveInactive isActive={isActive} setIsActive={setIsActive} />

        <Row className="table-responsive">
          <ARMTable>
            <thead>
              <tr>
                <th>Model</th>
                <th>Higher Model</th>
                <th>Location</th>
                <th>Position</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {models?.map((model, index) => (
                <tr key={index}>
                  <td>{model.modelName}</td>
                  <td>{model.higherModelName}</td>
                  <td>{model.locationName}</td>
                  <td>{model.positionName}</td>

                  <td>
                    <Space size="small">
                      <Link to={`/planning/view/model/tree/${model.id}`}>
                        <ARMButton
                          type="primary"
                          size="small"
                          style={{
                            backgroundColor: "#4aa0b5",
                            borderColor: "#4aa0b5",
                          }}
                        >
                          <EyeOutlined />
                        </ARMButton>
                      </Link>
                      <Link to={`/planning/edit/model/tree/${model.id}`}>
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
                      {isActive == true ? (
                        <Popconfirm
                          title="Are you sure want to inactive this model?"
                          onConfirm={() => handleStatus(model.id)}
                        >
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
                        </Popconfirm>
                      ) : (
                        <Popconfirm
                          title="Are you sure want to inactive this model?"
                          onConfirm={() => handleStatus(model.id)}
                        >
                          <ARMButton
                            type="primary"
                            size="small"
                            style={{
                              backgroundColor: "#FF0000",
                              borderColor: "#53a351",
                            }}
                          >
                            <LockOutlined />
                          </ARMButton>
                        </Popconfirm>
                      )}
                    </Space>
                  </td>
                </tr>
              ))}
            </tbody>
          </ARMTable>
        </Row>
      </ARMCard>
    </CommonLayout>
  );
};

export default ModelTreeList;
