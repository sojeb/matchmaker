import React from 'react';
import CommonLayout from "../../layout/CommonLayout";
import ARMCard from "../../common/ARMCard";
import {getLinkAndTitle} from "../../../lib/common/TitleOrLink";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import {Breadcrumb, Col, Row} from "antd";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import AirportService from "../../../service/AirportService";

const AirportDetails = () => {
    let { id } = useParams();
    const [singleData, setSingleData] = useState();
    const loadSingleData = async () => {
        const { data } = await AirportService.getAirportById(id);
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
                        <Link to="/planning/airport/airport-details">
                            Airports

                        </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>View</Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={getLinkAndTitle(
                    `Airport Details`,
                    `/planning/airports`
                )}
            >
                <Row>
                    <Col span={24} md={12}>
                        <Row>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                Aircraft Name :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.name}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                               IATA Code :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.iataCode}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                               Country Code :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.countryCode}
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

export default AirportDetails;
