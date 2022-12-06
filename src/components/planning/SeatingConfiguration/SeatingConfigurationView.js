import { Breadcrumb, Button, Col, Descriptions, Form, Row, Space } from "antd";
import DescriptionsItem from "antd/lib/descriptions/Item";
import Item from "antd/lib/list/Item";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import SeatingConfigurationService from "../../../service/SeatingConfigurationService";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import CommonLayout from "../../layout/CommonLayout";

const SeatingConfigurationView = () => {
  let { id } = useParams();
  const [singleData, setSingleData] = useState();
  const loadSingleData = async () => {
    const { data } = await SeatingConfigurationService.singleData(id);
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
            <Link to="/planning/seating/configurations">
              Seating configurations
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>View</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard
        title={getLinkAndTitle(
          `Seating configuration details`,
          `/planning/seating/configurations`
        )}
      >
        <Row>
          <Col span={24} md={12}>
            <Row>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Aircraft Name :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.aircraftName}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Cabin Code :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.cabinInfo}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Number Of Seat :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.numOfSeats}
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

export default SeatingConfigurationView;
