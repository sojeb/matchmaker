import React, {useState, useEffect} from 'react';
import CommonLayout from "../../../layout/CommonLayout";
import ARMBreadCrumbs from "../../../common/ARMBreadCrumbs";
import {Breadcrumb, Col, Empty, Form, Input, notification, Pagination, Popconfirm, Row, Select, Space} from "antd";
import {Link, useParams} from "react-router-dom";
import ARMCard from "../../../common/ARMCard";
import {getLinkAndTitle} from "../../../../lib/common/TitleOrLink";
import {Option} from "antd/es/mentions";
import ARMButton from "../../../common/buttons/ARMButton";
import {
    EditOutlined,
    EyeOutlined,
    FilterOutlined,
    LockOutlined,
    RollbackOutlined,
    UnlockOutlined
} from "@ant-design/icons";
import ActiveInactive from "../../../common/ActiveInactive";
import ARMTable from "../../../common/ARMTable";

import MajorComponentServices from "../../../../service/MajorComponentServices";
import {getErrorMessage} from "../../../../lib/common/helpers";
import ARMForm from "../../../../lib/common/ARMForm";
import {setPagination} from "../../../../reducers/paginate.reducers";
import {useDispatch} from "react-redux";


const MajorComponents = () => {
    const [form] = Form.useForm();

    const id = useParams()
    const dispatch = useDispatch()

    const [majorComponents, setMajorComponents] = useState([])
    const [isActive, setIsActive] = useState(true)



    useEffect(() => {
        onFinish().catch(console.error)
    }, []);


    useEffect(() => {
        onFinish().catch(console.error)
    }, [isActive])


    const onReset = () => {
        form.resetFields();
    };

    // handle status

    const handleStatus = async (id, status) => {
        try {
            const {data} = await MajorComponentServices.toggleStatus(id, status);
            await onFinish(isActive);
            notification["success"]({
                message: "Status changed successfully!",
            });
        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }
    // search
    const onFinish = async (values) => {
        const value = {
            isActive: isActive,
            title: values ? values.title : "",
            type: values ? values.type : "",
            serialNo: values ? values.serialNo : "",
            aircraftIds: values ? values.aircraftIds : [],

        }
        try {
            const {data} = await MajorComponentServices.searchMajorComponents(value);
            setMajorComponents(data.model);
            dispatch(setPagination(data));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item> <Link to='/planning'> <i className="fas fa-chart-line"/> &nbsp;Planning
                    </Link></Breadcrumb.Item>

                    <Breadcrumb.Item>
                        Major Components
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={
                    getLinkAndTitle('Major Components', '/planning/major-components/add', true)
                }
            >
                <ARMForm
                    initialValues={{pageSize: 10}}
                    onFinish={onFinish} form={form}
                >        <Row gutter={20}>
                    <Col xs={24} md={12} lg={6}>
                        <Form.Item label="" name="title">
                            <Input placeholder="Enter Title"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={6}>
                        <Form.Item label="" name="type">
                            <Input placeholder="Enter Type"/>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12} lg={6}>
                        <Form.Item name="pageSize" label="Page Size">
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
                                    onClick={onReset}
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
                            <th>Description</th>
                            <th>Title</th>
                            <th>Position</th>
                            <th>Type</th>
                            <th>Part No</th>
                            <th>Serial No</th>
                            <th>Component Type</th>
                            <th>TSN</th>
                            <th>CSN</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            majorComponents?.map((major, index) => (

                                <tr key={index}>
                                    <td>
                                      <span style={{color: "rgba(44, 110, 208, 0.91)", fontSize: '12px', fontWeight: '500'}}>Airframe :</span> <span> Airframe for {major.aircraftName}</span>
                                        <br/>
                                        <span style={{color: "rgba(44, 110, 208, 0.91)", fontSize: '12px', fontWeight: '500'}}>Manufacturer :</span> <span>{major.manufacturer}</span>
                                        <br/>
                                        <span style={{color: "rgba(44, 110, 208, 0.91)", fontSize: '12px', fontWeight: '500'}}>Status :</span> <span>{major.status}</span>
                                    </td>
                                    <td>  {major.title}</td>
                                    <td> {major.position}</td>
                                    <td> {major.type}</td>
                                    <td> {major.partNo}</td>
                                    <td> {major.serialNo}</td>
                                    <td> {major.componentType}</td>
                                    <td> {major.tsn}</td>
                                    <td> {major.csn}</td>
                                    <td> {major.date}</td>
                                    <td>
                                        <Space size='small'>

                                            <Link to={`view/${major.id}`}>
                                                <ARMButton type="primary" size="small" style={{
                                                    backgroundColor: '#4aa0b5',
                                                    borderColor: '#4aa0b5',

                                                }}>
                                                    <EyeOutlined/>
                                                </ARMButton>
                                            </Link>
                                            <Link to={`edit/${major.id}`}>
                                                <ARMButton type="primary" size="small" style={{
                                                    backgroundColor: '#6e757c',
                                                    borderColor: '#6e757c',

                                                }}>
                                                    <EditOutlined/>

                                                </ARMButton>
                                            </Link>

                                            <Popconfirm title="Are you Sure?" okText="Yes" cancelText="No"
                                                        onConfirm={() => handleStatus(major.id, !major.isActive)}
                                                        placement="topRight"
                                            >
                                                {
                                                    major.isActive ?

                                                        <ARMButton type="primary" size="small" style={{
                                                            backgroundColor: '#53a351',
                                                            borderColor: '#53a351',
                                                        }}>
                                                            <UnlockOutlined/>
                                                        </ARMButton>

                                                        :
                                                        <ARMButton type="primary" size="small" danger>
                                                            <LockOutlined/>

                                                        </ARMButton>

                                                }
                                            </Popconfirm>
                                        </Space>


                                    </td>
                                </tr>
                            ))


                        }
                        </tbody>
                    </ARMTable>
                </Row>

                <Row>
                    <Col style={{margin: '0 auto'}}>
                        {majorComponents?.length === 0 ? (
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

export default MajorComponents;
