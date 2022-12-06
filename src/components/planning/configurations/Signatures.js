import { EditOutlined, EyeOutlined, FilterOutlined, LockOutlined, RollbackOutlined, UnlockOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Form, Input, notification, Pagination, Popconfirm, Row, Select, Space } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import ARMForm from "../../../lib/common/ARMForm";
import { getErrorMessage } from "../../../lib/common/helpers";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import { usePaginate } from "../../../lib/hooks/paginations";
import { useSignatures } from "../../../lib/hooks/planning/useSignatures";
import SignaturesService from "../../../service/planning/configurations/SignaturesService";
import ActiveInactive from "../../common/ActiveInactive";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMTable from "../../common/ARMTable";
import ActiveInactiveButton from "../../common/buttons/ActiveInactiveButton";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";

const { Option } = Select;

export default function Signatures() {
  const { form, collection, page, isActive, setIsActive, totalElements, paginate, fetchData, refreshPagination, resetFilter, size } = usePaginate("signatures", "signature/search");
  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/planning">
              <i className="fas fa-chart-line" /> &nbsp;Planning
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Signatures</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle("signatures", "/planning/signatures/add", true)}>
        <ARMForm onFinish={fetchData} form={form}>
          {" "}
          <Row gutter={20}>
            <Col xs={24} md={12} lg={6}>
              <Form.Item label="" name="employeeName">
                <Input placeholder="Enter Employee Name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={6}>
              <Form.Item name="size" label="Page Size" initialValue="10">
                <Select id="antSelect">
                  <Option value="10">10</Option>
                  <Option value="20">20</Option>
                  <Option value="30">30</Option>
                  <Option value="40">40</Option>
                  <Option value="50">50</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={12} lg={6}>
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
        </ARMForm>
        <ActiveInactive isActive={isActive} setIsActive={setIsActive} />

        <Row className="table-responsive">
          <ARMTable>
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Auth no</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {collection?.map((data, index) => (
                <tr key={index}>
                  <td>{data.employeeName}</td>
                  <td> {data.authNo}</td>
                  <td>
                    <Space size="small">
                      <Link to={`view/${data.id}`}></Link>
                      <Link to={`edit/${data.id}`}>
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

                      <ActiveInactiveButton
                        isActive={isActive}
                        handleOk={async () => {
                          try {
                            await SignaturesService.toggleStatus(data.id, !data.isActive);
                            notification["success"]({ message: "Status Changed Successfully!" });
                            refreshPagination();
                          } catch (e) {
                            notification["error"]({ message: getErrorMessage(e) });
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
            <Col style={{ marginTop: 10 }}>
              <Pagination showSizeChanger={false} onShowSizeChange={console.log} pageSize={size} current={page} onChange={paginate} total={totalElements} />
            </Col>
          </Row>
      </ARMCard>
    </CommonLayout>
  );
}
