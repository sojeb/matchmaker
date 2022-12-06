import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Descriptions, Form, Row, Space } from "antd";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import { Link, useParams } from "react-router-dom";
import CommonLayout from "../../layout/CommonLayout";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import ModelsService from "../../../service/ModelsService";

const ModelsView = () => {
  let { id } = useParams();
  const [singleData, setSingleData] = useState();
  const loadSingleData = async () => {
    const { data } = await ModelsService.singleData(id);
    console.log("data", data);
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
            <Link to="/planning/models">Models</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>View</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle(`Models details`, `/planning/models`)}>
        <Row>
          <Col span={24} md={12}>
            <Row>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Aircraft Model :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.aircraftModelName}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Model Type :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.modelType}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Model Name :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.modelName}
              </Col>
            </Row>
          </Col>

          <Col span={24} md={12}>
            <Row>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Version :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.version}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Life Codes :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.lifeCodesValue.join(" , ")}
              </Col>
            </Row>
          </Col>
        </Row>
      </ARMCard>
    </CommonLayout>
  );
};

export default ModelsView;
