import { Breadcrumb, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import ModelTreeService from "../../../service/ModelTreeService";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import CommonLayout from "../../layout/CommonLayout";

const ModelTreeView = () => {
  let { id } = useParams();
  const [singleData, setSingleData] = useState();
  const loadSingleData = async () => {
    const { data } = await ModelTreeService.singleData(id);
    setSingleData(data);
  };
  useEffect(() => {
    loadSingleData();
  }, [id]);
  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <i className="fas fa-chart-line" />
            <Link to="/planning">&nbsp; Planning</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to="/planning/model/trees">Model trees</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>View</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard
        title={getLinkAndTitle(`Model Tree details`, `/planning/model/trees`)}
      >
        <Row>
          <Col span={24} md={12}>
            <Row>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Model :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.modelName}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Higher Model:
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.higherModelName}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Position :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.positionName}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Location :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.locationName}
              </Col>
            </Row>
          </Col>

          <Col span={24} md={12}>
            <Row></Row>
          </Col>
        </Row>
      </ARMCard>
    </CommonLayout>
  );
};

export default ModelTreeView;
