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
import { Link, useParams } from "react-router-dom";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import { usePaginate } from "../../../lib/hooks/paginations";
import AircraftBuildsService from "../../../service/AircraftBuildsService";
import ActiveInactive from "../../common/ActiveInactive";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMTable from "../../common/ARMTable";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";

const AircraftBuildsList = () => {
  let { id } = useParams();
  //const [form] = Form.useForm();
  const [model, setModel] = useState([]);
  //const [isActive, setIsActive] = useState(true);

  const [aircraft, setAircraft] = useState([]);
  const [higherModel, setHigherModel] = useState([]);
  const [higherPart, setHigherPart] = useState([]);
  const [part, setPart] = useState([]);
  const [aircraftId, setAircraftId] = useState();
  const [higherModelId, setHigherModelId] = useState();
  const [modelId, setModelId] = useState();

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
  } = usePaginate("aircraftBuilds", "aircraft-build/search");
  console.log("collection", collection);

  console.log("h", higherModel);
  const getAircraftId = (e) => {
    setAircraftId(e);
  };
  const getHigherModelId = (e) => {
    setHigherModelId(e);
  };
  const getModelId = (e) => {
    setModelId(e);
  };

  const getAllAircraft = async () => {
    try {
      const { data } = await AircraftBuildsService.getAllAircraft();
      setAircraft(data.model);
    } catch (er) {}
  };
  useEffect(() => {
    getAllAircraft();
  }, []);
  const getAllHigherModelByAircraftId = async (aircraftId) => {
    try {
      const { data } =
        await AircraftBuildsService.getAllHigherModelByAircraftId(aircraftId);
      setHigherModel(data);
    } catch (er) {}
  };
  useEffect(() => {
    if (aircraftId) {
      getAllHigherModelByAircraftId(aircraftId);
    }
  }, [aircraftId]);
  const getAllModelByHigherModelId = async (higherModelId) => {
    try {
      const { data } = await AircraftBuildsService.getAllModelByHigherModelId(
        higherModelId
      );
      setModel(data);
    } catch (er) {}
  };
  const getAllHigherPartByHigherModelId = async () => {
    try {
      const { data } = await AircraftBuildsService.getAllHigherPartByModelId(
        higherModelId
      );
      setHigherPart(data);
    } catch (er) {}
  };
  useEffect(() => {
    if (higherModelId) {
      getAllModelByHigherModelId(higherModelId);
      getAllHigherPartByHigherModelId(higherModelId);
    }
  }, [higherModelId]);

  const getAllPartByModelId = async (modelId) => {
    try {
      const { data } = await AircraftBuildsService.getAllPartByModelId(modelId);
      setPart(data);
    } catch (er) {}
  };
  useEffect(() => {
    if (modelId) {
      getAllPartByModelId(modelId);
    }
  }, [modelId]);
  const onFinish = async (values) => {
    console.log("values", values);
  };
  const handleStatus = async (id) => {
    try {
      const { data } = await AircraftBuildsService.changeStatus(id, !isActive);
      refreshPagination();
      notification["success"]({
        message: "Status chnaged successfully",
      });
    } catch (er) {}
  };
  const onReset = async () => {};
  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <i className="fas fa-chart-line" />
            <Link to="/planning">&nbsp; Planning</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Aircraft Builds</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard
        title={getLinkAndTitle(
          "Aircraft Builds",
          "/planning/add/aircraft/builds",
          true
        )}
      >
        <Form form={form} onFinish={fetchData} initialValues={{partNo:"",modelName:"", size: 10 }}>
          <Row gutter={20}>
            <Col xs={24} md={6}>
              <Form.Item name="aircraftId">
                <Select
                  placeholder="-- Select Aircraft--"
                  onChange={(e) => getAircraftId(e)}
                >
                  {aircraft?.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.aircraftName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={6}>
              <Form.Item name="partNo">
                <Input placeholder="Enter Part No" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item name="modelName">
                <Input placeholder="Enter model Name" />
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
                <th>Aircraft</th>
                <th>Higher Model</th>
                <th> Model</th>
                <th> Higher Part No</th>
                <th> Part No</th>
                
                <th>Serial No</th>
                <th>Position Name</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {collection?.map((model, index) => (
                <tr key={index}>
                  <td>{model.aircraftName}</td>
                  <td>{model.higherModelName}</td>
                  <td>{model.modelName}</td>
                  <td>{model.higherPartNo}</td>
                  <td>{model.partNo}</td>
                 
                  <td>{model.higherSerialNo}</td>
                  <td>{model.positionName}</td>

                  <td>
                    <Space size="small">
                      <Link to={`/planning/view/aircraft/builds/${model.id}`}>
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
                      <Link to={`/planning/edit/aircraft/builds/${model.id}`}>
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
                          title="Are you sure want to change status?"
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

export default AircraftBuildsList;
