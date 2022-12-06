import React from 'react';
import {Breadcrumb, Col, Row} from "antd";
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import MajorComponentServices from "../../../../service/MajorComponentServices";
import CommonLayout from "../../../layout/CommonLayout";
import {getLinkAndTitle} from "../../../../lib/common/TitleOrLink";
import ARMCard from "../../../common/ARMCard";
import ARMBreadCrumbs from "../../../common/ARMBreadCrumbs";

const MajorComponentDetails = () => {
    let { id } = useParams();
    const [singleData, setSingleData] = useState();
    const loadSingleData = async () => {
        const { data } = await MajorComponentServices.getMajorComponentById(id);
        setSingleData(data);
    };
    useEffect(() => {
        loadSingleData();
    }, [id]);


    console.log('singleData', singleData)
    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        <i className="fas fa-chart-line" />
                        <Link to="/planning">&nbsp; Planning</Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        <Link to="/planning/major-components">
                            Major Components

                        </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>View</Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={getLinkAndTitle(
                    `Major Components details`,
                    `/planning/major-components`
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
                                Title:
                            </Col>

                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.title}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                Component Type :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.componentType}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                CSN :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.csn}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                date :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.date}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                description :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.description}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                manufacturer :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.manufacturer}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                partNo :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.partNo}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                position :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.position}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                serialNo :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.serialNo}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                status :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.status}
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

export default MajorComponentDetails;
