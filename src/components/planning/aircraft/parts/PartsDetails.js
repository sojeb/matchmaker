import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import CommonLayout from "../../../layout/CommonLayout";
import ARMBreadCrumbs from "../../../common/ARMBreadCrumbs";
import {Breadcrumb, Col, Row} from "antd";
import ARMCard from "../../../common/ARMCard";
import {getLinkAndTitle} from "../../../../lib/common/TitleOrLink";
import PartsServices from "../../../../service/PartsServices";

const PartsDetails = () => {
    let { id } = useParams();
    const [singleData, setSingleData] = useState();
    const loadSingleData = async () => {
        const { data } = await PartsServices.getPartById(id);
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
                        <Link to="/planning/parts">
                            Parts

                        </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>View</Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={getLinkAndTitle(
                    `Parts`,
                    `/planning/parts`
                )}
            >
                <Row>
                    <Col span={24} md={12}>
                        <Row>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                Description :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.description}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                Part No:
                            </Col>

                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.partNo}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                               Model Name :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.modelName}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                Classification :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.classification}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                Unit of Measure :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.unitOfMeasure}
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

export default PartsDetails;
