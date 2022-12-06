import { Breadcrumb, Col, Row } from "antd";
import { bool } from "prop-types";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { boolean } from "yup";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import AircraftBuildsService from "../../../service/AircraftBuildsService";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import CommonLayout from "../../layout/CommonLayout";

const AircraftBuildsView = () => {
  let { id } = useParams();
  const [singleData, setSingleData] = useState();

  const loadSingleData = async (id) => {
    const { data } = await AircraftBuildsService.singleData(id);

    console.log("t", data.isOverhauled);

    setSingleData(data);
  };
  useEffect(() => {
    if (id) {
      loadSingleData(id);
    }
  }, [id]);
  console.log("d", singleData);
  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <i className="fas fa-chart-line" />
            <Link to="/planning">&nbsp; Planning</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to="/planning/aircraft/builds">Aircraft Builds</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>View</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard
        title={getLinkAndTitle(
          `Aircraft Builds details`,
          `/planning/aircraft/builds`
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
                Higher Model Name :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.higherModelName}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Model Name :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.modelName}
              </Col>

              <Col span={12} style={{ marginBottom: "10px" }}>
                Higher Part :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.higherPartNo}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Part :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.partNo}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Higher Serial No :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.higherSerialNo}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Serial No :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.serialNo}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Position Name :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.positionName}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Location Name :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.locationName}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Attach Date :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.attachDate}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                comManufactureDate:
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.comManufactureDate}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                comCertificateDate:
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.comCertificateDate}
              </Col>
            </Row>
          </Col>

          <Col span={24} md={12}>
            <Row>
              <Col span={12} style={{ marginBottom: "10px" }}>
                tsnHour :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.tsnHour}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                tsnCycle :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.tsnCycle}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                tsoHour :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.tsoHour}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                tsoCycle :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.tsoCycle}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                tslsvHour :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.tslsvHour}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                tslsvCycle :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.tslsvCycle}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                fitLifeHour :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.fitLifeHour}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                fitLifeCycle :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.fitLifeCycle}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                isOverhauled :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.isOverhauled ? "true" : "false"}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                isShopVisited :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.isShopVisited ? "true" : "false"}
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                Active Status :
              </Col>
              <Col span={12} style={{ marginBottom: "10px" }}>
                {singleData?.isActive ? "true" : "false"}
              </Col>
            </Row>
          </Col>
        </Row>
      </ARMCard>
    </CommonLayout>
  );
};

export default AircraftBuildsView;
