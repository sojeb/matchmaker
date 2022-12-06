import React from 'react';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

import CommonLayout from "../../../layout/CommonLayout";
import ARMBreadCrumbs from "../../../common/ARMBreadCrumbs";
import {Breadcrumb, Col, Row} from "antd";
import ARMCard from "../../../common/ARMCard";
import {getLinkAndTitle} from "../../../../lib/common/TitleOrLink";
import TaskRecordServices from "../../../../service/TaskRecordServices";

const TaskRecordDetails = () => {
    let { id } = useParams();
    const [singleData, setSingleData] = useState();
    const loadSingleData = async () => {
        const { data } = await TaskRecordServices.getTaskById(id);
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
                        <Link to="/planning/task-records">
                            TaskRecord

                        </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>View</Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={getLinkAndTitle(
                    `TaskRecords`,
                    `/planning/task-records`
                )}
            >
                <Row>
                    <Col span={24} md={12}>
                        <Row>

                            <Col span={12} style={{ marginBottom: "10px" }}>
                                Task No:
                            </Col>

                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.taskNo}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                Description :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.description}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                Threshold Value:
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.thresholdValue}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                Threshold Type :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.thresholdType}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                Interval Value :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.intervalValue}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                Interval Type :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.intervalType}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                Job Procedure :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.jobProcedure}
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                Effectivity :
                            </Col>
                            <Col span={12} style={{ marginBottom: "10px" }}>
                                {singleData?.effectivity}
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

export default TaskRecordDetails;
