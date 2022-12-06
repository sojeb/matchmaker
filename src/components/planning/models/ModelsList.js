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
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
} from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getErrorMessage } from "../../../lib/common/helpers";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import { usePaginate } from "../../../lib/hooks/paginations";
import ModelsService from "../../../service/ModelsService";
import ActiveInactive from "../../common/ActiveInactive";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMTable from "../../common/ARMTable";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";

const ModelsList = () => {
  const [models, setModels] = useState([]);
  const [aircraft, setAircraft] = useState([]);
  const {
    form,
    collection,
    page,
    totalPages,
    totalElements,
    paginate,
    isActive,
    setIsActive,
    fetchData,
    refreshPagination,
    resetFilter,
    size,
  } = usePaginate("Models", "model/search");

  const getAllAircraft = async () => {
    try {
      const { data } = await ModelsService.getAllAircraftModel();
      setAircraft(data.model);
    } catch (er) {
      notification["error"]({ message: getErrorMessage(er) });
    }
  };

  const handleStatus = async (id) => {
    const { data } = await ModelsService.singleData(id);
    if (data.isActive == true) {
      try {
        const { data } = await ModelsService.changeStatus(id, !isActive);
        refreshPagination();
        notification["success"]({
          message: "Models inactivated successfully",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    } else {
      try {
        const { data } = await ModelsService.changeStatus(id, !isActive);
        refreshPagination();
        notification["success"]({
          message: "Models activated successfully",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    }
  };
  const onFinish = async (values) => {
    // console.log("dd", values?.modelName);
    // const searchData = {
    //   isActive: isActive,
    //   aircraftModelId: values ? values.aircraftModelId : undefined,
    //   modelName: values ? values.modelName : undefined,
    // };
    // const { data } = await ModelsService.searchModels(searchData);
    // setModels(data.model);
  };

  const onReset = () => {
    form.resetFields();
  };
  useEffect(() => {
    onFinish();
  }, []);
  useEffect(() => {
    onFinish();
  }, [isActive]);

  useEffect(() => {
    getAllAircraft();
  }, []);
  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <i className="fas fa-chart-line" />
            <Link to="/planning">&nbsp; Planning</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Models</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle("Models", "/planning/add/model", true)}>
        <Form form={form} onFinish={onFinish} initialValues={{ size: 10 }}>
          <Row gutter={20}>
            <Col xs={24} md={6}>
              <Form.Item name="aircraftModelId">
                <Select placeholder="-- Select Aircraft Model--">
                  {aircraft?.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.aircraftModelName}{" "}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item name="modelName">
                <Input placeholder="Enter model name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={5} lg={4}>
              <Form.Item name="size" label="Page Size">
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
                    <FilterOutlined name="filter" /> Filter
                  </ARMButton>
                  <ARMButton size="middle" type="primary" htmlType="reset">
                    <RollbackOutlined onClick={resetFilter} /> Reset
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
                <th>Model Name</th>
                <th>Model Type</th>
                <th>Description</th>
                <th>Aircraft Model</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {collection?.map((model, index) => (
                <tr key={index}>
                  <td>{model.modelName}</td>
                  <td>{model.modelType}</td>
                  <td>{model.description}</td>
                  <td>{model.aircraftModelName}</td>
                  <td>
                    <Space size="small">
                      <Link to={`/planning/view/models/${model.modelId}`}>
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
                      <Link to={`/planning/edit/model/${model.modelId}`}>
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
                          onConfirm={() => handleStatus(model.modelId)}
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
                          onConfirm={() => handleStatus(model.modelId)}
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
        <Row justify="center">
          <Col style={{ marginTop: 10 }}>
            <Pagination
              showSizeChanger={false}
              onShowSizeChange={console.log}
              pageSize={size}
              current={page}
              onChange={paginate}
              total={totalElements}
            />
          </Col>
        </Row>
      </ARMCard>
    </CommonLayout>
  );
};

export default ModelsList;
