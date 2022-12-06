import {
  EditOutlined,
  EyeOutlined,
  FilterOutlined, LockOutlined,
  RollbackOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Col,
  Form,
  Input,
  notification, Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
} from "antd";
import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import ActiveInactive from "../../common/ActiveInactive";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMTable from "../../common/ARMTable";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";
import {getErrorMessage} from "../../../lib/common/helpers";
import {usePaginate} from "../../../lib/hooks/paginations";
import ActiveInactiveButton from "../../common/buttons/ActiveInactiveButton";
import rackService from "../../../service/RackService";

const RackList = () => {
  const {Option} = Select;
  const dispatch = useDispatch();
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
    size
  } = usePaginate('rackall', 'store/management/rack/search')


  console.log('Collection====>', collection)
  useEffect(() => {
    refreshPagination()
    fetchData()
  }, []);


  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            {" "}
            <Link to="/store">
              {" "}
              <i className="fas fa-archive" /> &nbsp;Store
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item> &nbsp;Racks</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard
        title={getLinkAndTitle("RACK LIST", "/store/rack/add", "addBtn")}
      >
        <Form form={form} onFinish={fetchData}>
          <Row gutter={20}>
            <Col xs={24} md={6}>
              <Form.Item  name="query">
                <Input placeholder="Enter Search Text" />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item
                name='size'
                label="Page Size"
                rules={[
                  {
                    message: "Field should not be empty",
                  },
                ]}
                initialValue="10"
              >
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
                  <ARMButton size="middle" type="primary" htmlType="submit" onClick={resetFilter}>
                    <RollbackOutlined /> Reset
                  </ARMButton>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <ActiveInactive isActive={isActive} setIsActive={setIsActive}/>
        <Row className="table-responsive">
          <ARMTable>
            <thead>
              <tr>
                <th>Code</th>
                <th>Room</th>
                <th>Height</th>
                <th>Width</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {collection.map((model, index) => (
                <tr key={index}>
                  <td>{model.rackCode}</td>
                  <td>{model.roomId}</td>
                  <td>{model.rackHeight}</td>
                  <td>{model.rackWidth}</td>
                  <td>
                    <Space size="small">
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
                      <ARMButton
                        type="primary"
                        size="small"
                        style={{
                          backgroundColor: "#6e757c",
                          borderColor: "#6e757c",
                        }}
                      >
                        <Link to={`/store/rack/add/${model.rackId}`}>
                          <EditOutlined />
                        </Link>
                      </ARMButton>

                      <ActiveInactiveButton
                          isActive={isActive}
                          handleOk={async () => {
                            try {
                              await rackService.toggleStatus(model.id, !isActive);


                              notification['success']({message: "Status Changed Successfully!"});
                              refreshPagination();
                            } catch (e) {
                              notification['error']({message: getErrorMessage(e)});
                            }
                          }}
                      />
                    </Space>
                  </td>
                </tr>
              ))}
            </tbody>
          </ARMTable>
        </Row>
        <Row justify="center">
          <Col style={{marginTop: 10}}>
            <Pagination showSizeChanger={false} onShowSizeChange={console.log} pageSize={size}
                        current={page} onChange={paginate}
                        total={totalElements}/>
          </Col>
        </Row>
      </ARMCard>
    </CommonLayout>
  );
};

export default RackList;
