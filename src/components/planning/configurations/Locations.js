import { Breadcrumb, Col, Pagination, Popconfirm, Space } from "antd";
import { Link } from "react-router-dom";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import CommonLayout from "../../layout/CommonLayout";
import { Row } from "antd";
import ARMButton from "../../common/buttons/ARMButton";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import { EditOutlined } from "@ant-design/icons";
import ActiveInactive from "../../common/ActiveInactive";
import ARMTable from "../../common/ARMTable";
import { useLocations } from "../../../lib/hooks/planning/useLocations";
import ActiveInactiveButton from "../../common/buttons/ActiveInactiveButton";

export default function Locations() {
  const { isActive, setIsActive, allLocations, handleStatus, totalPages, currentPage, setCurrentPage } = useLocations();

  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/planning">
              <i className="fas fa-chart-line" /> &nbsp;Planning
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Locations</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle("locations", "/planning/locations/add", true)}>
        <ActiveInactive isActive={isActive} setIsActive={setIsActive} />
        <Row className="table-responsive">
          <ARMTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Remarks</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allLocations?.map((data, index) => (
                <tr key={data.id}>
                  <td>{data.name}</td>
                  <td> {data.description}</td>
                  <td> {data.remarks}</td>
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
                      <ActiveInactiveButton isActive={isActive} handleOk={() => handleStatus(data.id, !data.isActive)} />
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
