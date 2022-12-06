import { Breadcrumb, Col, Pagination, Popconfirm, Space } from "antd";
import { Link } from "react-router-dom";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import CommonLayout from "../../layout/CommonLayout";
import { Row } from "antd";
import ARMButton from "../../common/buttons/ARMButton";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import { EditOutlined, LockOutlined, UnlockOutlined } from "@ant-design/icons";
import ARMTable from "../../common/ARMTable";
import ActiveInactive from "../../common/ActiveInactive";
import { useMel } from "../../../lib/hooks/planning/useMel";

export default function MEL() {
  const { isActive, setIsActive, defectRect, handleStatus, currentPage, setCurrentPage, totalPages } = useMel();
const allMel = [{
    id: 1,
    intermidiateAml: 2,
    correcttiveAml: 2,
    dueDate: '20-02-2023',
    clearedDate: '20-05-2023',
    status: 'Open'
}]
  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/planning">
              <i className="fas fa-chart-line" /> &nbsp;Planning
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>MEL</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle("MEL", "/planning/mel/add", true)}>
        <ActiveInactive isActive={isActive} setIsActive={setIsActive} />

        <Row className="table-responsive">
          <ARMTable>
            <thead>
              <tr>
                <th>Intermediate AML</th>
                <th>Corrective AML</th>
                <th>Due Date</th>
                <th>Cleared Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allMel?.map((data, index) => (
                <tr key={data.id}>
                  <td>{data.intermidiateAml}</td>
                  <td> {data.correcttiveAml}</td>
                  <td> {data.dueDate}</td>
                  <td> {data.clearedDate}</td>
                  <td> {data.status}</td>
                  <td>
                    <Space size="small">
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

                      <Popconfirm title={isActive ? "Are you sure to change status to inactive" : "Are you sure to change status to active"} okText="Yes" cancelText="No" onConfirm={() => handleStatus(data.id, !data.isActive)} placement="topRight">
                        {isActive ? (
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
                        ) : (
                          <ARMButton type="primary" size="small" danger>
                            <LockOutlined />
                          </ARMButton>
                        )}
                      </Popconfirm>
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
