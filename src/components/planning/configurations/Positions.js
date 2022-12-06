import { Breadcrumb, Col, Pagination, Popconfirm, Space } from "antd";
import { Link } from "react-router-dom";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import CommonLayout from "../../layout/CommonLayout";
import { Row } from "antd";
import ARMButton from "../../common/buttons/ARMButton";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import { EditOutlined, EyeOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import ActiveInactive from "../../common/ActiveInactive";
import { useState } from "react";
import ARMTable from "../../common/ARMTable";
import { usePostions } from "../../../lib/hooks/planning/usePositions";
import ActiveInactiveButton from "../../common/buttons/ActiveInactiveButton";

export default function Positions() {
  const { allPositions, isActive, setIsActive, handleStatus, totalPages, currentPage, setCurrentPage } = usePostions();
  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/planning">
              <i className="fas fa-chart-line" /> &nbsp;Planning
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Positions</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle("positions", "/planning/positions/add", true)}>
        <ActiveInactive isActive={isActive} setIsActive={setIsActive} />

        <Row className="table-responsive">
          <ARMTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allPositions?.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td> {data.description}</td>
                  <td>
                    <Space size="small">
                      <Link to={`edit/${data.positionId}`}>
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

                      <ActiveInactiveButton isActive={isActive} handleOk={() => handleStatus(data.positionId, !isActive)} />
                    </Space>
                  </td>
                </tr>
              ))}
            </tbody>
          </ARMTable>
        </Row>
        <Row justify="center">
          <Col style={{ marginTop: 10 }}>
            <Pagination defaultCurrent={currentPage} onChange={setCurrentPage} total={totalPages * 10} />
          </Col>
        </Row>
      </ARMCard>
    </CommonLayout>
  );
}
