import React, {useState, useEffect} from 'react';
import CommonLayout from "../../../layout/CommonLayout";
import ARMBreadCrumbs from "../../../common/ARMBreadCrumbs";
import {Breadcrumb, Col, Empty, Form, Input, notification, Pagination, Row, Select, Space} from "antd";
import {Link} from "react-router-dom";
import ARMCard from "../../../common/ARMCard";
import {getLinkAndTitle} from "../../../../lib/common/TitleOrLink";
import {Option} from "antd/es/mentions";
import ARMButton from "../../../common/buttons/ARMButton";
import {
    EditOutlined,
    EyeOutlined,
    FilterOutlined,
    RollbackOutlined,
} from "@ant-design/icons";
import ActiveInactive from "../../../common/ActiveInactive";
import ARMTable from "../../../common/ARMTable";

import {getErrorMessage} from "../../../../lib/common/helpers";
import ARMForm from "../../../../lib/common/ARMForm";
import {usePaginate} from "../../../../lib/hooks/paginations";
import ActiveInactiveButton from "../../../common/buttons/ActiveInactiveButton";
import TaskRecordServices from "../../../../service/TaskRecordServices";



const TaskRecords = () => {




    const {
        form,
        collection,
        page,
        totalPages,
        totalElements,
        paginate,
        isActive,
        setIsActive,
        fetchData,
        refreshPagination,
        resetFilter,
        size
    } = usePaginate('taskRecords', 'task/search')

    console.log('collection', collection)


    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item> <Link to='/planning'> <i className="fas fa-chart-line"/> &nbsp;Planning
                    </Link></Breadcrumb.Item>

                    <Breadcrumb.Item>
                        TaskRecord
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={
                    getLinkAndTitle('TaskRecords', '/planning/task-records/add', true)
                }
            >
                <ARMForm
                    onFinish={fetchData} form={form}
                >        <Row gutter={20}>
                    <Col xs={24} md={12} lg={6}>
                        <Form.Item label="" name="taskNo">
                            <Input placeholder="Enter Task No"/>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12} lg={6}>
                        <Form.Item name="size"
                                   label="Page Size"
                                   initialValue="10">
                            <Select id="antSelect">
                                <Option value="10">10</Option>
                                <Option value="20">20</Option>
                                <Option value="30">30</Option>
                                <Option value="40">40</Option>
                                <Option value="50">50</Option>
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12} lg={6}>
                        <Form.Item>
                            <Space>
                                <ARMButton size="middle" type="primary" htmlType="submit">
                                    <FilterOutlined/> Filter
                                </ARMButton>
                                <ARMButton
                                    size="middle"
                                    type="primary"
                                    htmlType="submit"
                                    onClick={resetFilter}
                                >
                                    <RollbackOutlined/> Reset
                                </ARMButton>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
                </ARMForm>
                <ActiveInactive isActive={isActive} setIsActive={setIsActive}/>

                <Row className='table-responsive'>
                    <ARMTable>
                        <thead>
                        <tr>
                            <th>TaskNo</th>
                            <th>Description</th>
                            <th>ThresholdValue</th>
                            <th>ThresholdType</th>
                            <th>IntervalValue</th>
                            <th>IntervalValue</th>
                            <th>JobProcedure</th>
                            <th>Effectivity</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            collection?.map((task, index) => (

                                <tr key={index}>
                                    <td>{task.taskNo}</td>
                                    <td>{task.description}</td>
                                    <td>{task.thresholdValue}</td>
                                    <td>{task.thresholdType}</td>
                                    <td>{task.intervalValue}</td>
                                    <td>{task.intervalType}</td>
                                    <td>{task.jobProcedure}</td>
                                    <td>{task.effectivity}</td>
                                    <td>
                                        <Space size='small'>

                                            <Link to={`view/${task.id}`}>
                                                <ARMButton type="primary" size="small" style={{
                                                    backgroundColor: '#4aa0b5',
                                                    borderColor: '#4aa0b5',

                                                }}>
                                                    <EyeOutlined/>
                                                </ARMButton>
                                            </Link>
                                            <Link to={`edit/${task.id}`}>
                                                <ARMButton type="primary" size="small" style={{
                                                    backgroundColor: '#6e757c',
                                                    borderColor: '#6e757c',

                                                }}>
                                                    <EditOutlined/>

                                                </ARMButton>
                                            </Link>

                                            <ActiveInactiveButton
                                                isActive={isActive}
                                                handleOk={async () => {
                                                    try {
                                                        await TaskRecordServices.toggleStatus(task.id, !task.isActive);
                                                        notification['success']({message: "Status Changed Successfully!"});
                                                        refreshPagination();
                                                    } catch (e) {
                                                        notification['error']({message: getErrorMessage(e)});
                                                    }
                                                }}
                                            />
                                        </Space>


                                    </td>
                                </tr>
                            ))


                        }
                        </tbody>
                    </ARMTable>
                </Row>
                <Row justify="center">
                    <Col style={{marginTop: 10}}>
                        <Pagination showSizeChanger={false} onShowSizeChange={console.log} pageSize={size} current={page} onChange={paginate}
                                    total={totalElements}/>
                    </Col>
                </Row>

                <Row>
                    <Col style={{margin: '0 auto'}}>
                        {collection.length === 0 ? (
                            <Row justify="end">
                                <tbody>
                                <Empty style={{marginTop: "10px"}}/>
                                </tbody>
                            </Row>
                        ) : null}
                    </Col>
                </Row>

            </ARMCard>
        </CommonLayout>
    );
};

export default TaskRecords;
