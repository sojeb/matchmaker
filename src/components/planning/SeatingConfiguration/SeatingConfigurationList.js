import {
  DeleteOutlined,
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
  Popconfirm,
  Row,
  Select,
  Space,
  notification,
  Pagination,
} from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import SeatingConfigurationService from "../../../service/SeatingConfigurationService";
import ActiveInactive from "../../common/ActiveInactive";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMTable from "../../common/ARMTable";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";
import { useDispatch } from "react-redux";
import { setPagination } from "../../../reducers/paginate.reducers";
import { fetchPagination, usePaginate } from "../../../lib/hooks/paginations";
import { getErrorMessage } from "../../../lib/common/helpers";

const SeatingConfigurationList = () => {
  let dispatch = useDispatch();
  //const [form] = Form.useForm();
  // const [isActive, setIsActive] = useState(true);
  const [seatingConfiguration, setSeatingConfiguration] = useState([]);
  const [aircraft, setAircraft] = useState([]);
  const [cabin, setCabin] = useState([]);
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
  } = usePaginate("aircraftCabin", "aircraft/cabin/search");
  console.log("collection", collection);

  const getAllCabin = async () => {
    try {
      const { data } = await SeatingConfigurationService.getAllCAbin();
      setCabin(data);
    } catch (er) {
      notification["error"]({ message: getErrorMessage(er) });
    }
  };
  const getAllAircraft = async () => {
    try {
      const { data } = await SeatingConfigurationService.getAllAircraft();
      setAircraft(data.model);
    } catch (er) {
      notification["error"]({ message: getErrorMessage(er) });
    }
  };

  const onFinish = async (values) => {
    // const d = {
    //   activeStatus: isActive,
    //   cabinId: values ? values.cabinId : "",
    //   aircraftId: values ? values.aircraftId : "",
    // };
    // const { data } =
    //   await SeatingConfigurationService.searchSeatingConfiguration(d);
    // setSeatingConfiguration(data.model);
    // dispatch(setPagination(data));
  };
  const onReset = () => {
    form.resetFields();
  };
  useEffect(() => {
    getAllCabin();
    getAllAircraft();
  }, []);
  useEffect(() => {
    onFinish();
  }, []);
  useEffect(() => {
    onFinish();
  }, [isActive]);
  const handleStatus = async (id, value) => {
    const { data } = await SeatingConfigurationService.changeStatus(id, value);
    refreshPagination();
    notification["success"]({
      message: "Seating configuration status changed successfully",
    });
  };
  console.log("cabin", cabin);
  console.log("aircraft", aircraft);
  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <i className="fas fa-chart-line" />
            <Link to="/planning">&nbsp; Planning</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Seating configurations</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard
        title={getLinkAndTitle(
          "Seating Configurations",
          "/planning/add/seating/configuration",
          true
        )}
      >
        <Form form={form} onFinish={fetchData} initialValues={{ size: 10 }}>
          <Row gutter={20}>
            <Col xs={24} md={6}>
              <Form.Item name="aircraftId">
                <Select placeholder="--Select Aircraft--">
                  {aircraft?.map((item, index) => {
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
              <Form.Item name="cabinId">
                <Select placeholder="--Select Cabin--">
                  {cabin?.map((item, index) => {
                    return (
                      <Option key={item.cabinId} value={item.cabinId}>
                        {item.codeTitle}
                      </Option>
                    );
                  })}
                </Select>
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
                <th>Cabin</th>
                <th>Number of seat</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {collection?.map((item, index) => (
                <tr key={index}>
                  <td>{item.aircraftName}</td>
                  <td>{item.cabinInfo}</td>
                  <td>{item.numOfSeats}</td>
                  <td>
                    <Space size="small">
                      <Link
                        to={`/planning/view/seating/configuration/${item.aircraftCabinId}`}
                      >
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
                      <Link
                        to={`/planning/edit/seating/configuration/${item.aircraftCabinId}`}
                      >
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
                      {item.activeStatus == true ? (
                        <Popconfirm
                          title="Are you sure want to inactive seating configuration?"
                          onConfirm={() =>
                            handleStatus(
                              item.aircraftCabinId,
                              !item.activeStatus
                            )
                          }
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
                          title="Are you sure want to inactive seating configuration?"
                          onConfirm={() =>
                            handleStatus(
                              item.aircraftCabinId,
                              !item.activeStatus
                            )
                          }
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

export default SeatingConfigurationList;
