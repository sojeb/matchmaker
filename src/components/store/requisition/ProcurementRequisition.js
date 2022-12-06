import { Breadcrumb, Col, DatePicker, Form, Input, Row, Space } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ARMForm from '../../../lib/common/ARMForm';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMCard from '../../common/ARMCard';
import ARMTable from '../../common/ARMTable';
import ARMButton from '../../common/buttons/ARMButton';
import ResponsiveTable from '../../common/ResposnsiveTable';
import CommonLayout from '../../layout/CommonLayout';
import ShortUniqueId from 'short-unique-id';
const ProcurementRequisition = () => {
    const { id } = useParams()
    const [form] = Form.useForm();
    const [pRequisition, setPRequisition] = useState([]);
    const layout = {
        labelCol: {
            span: 10,
        },
        wrapperCol: {
            span: 14,
        },
    };
    let ui = new ShortUniqueId({
        dictionary: [
            '0', '1', '2', '3',
            '4', '5', '6', '7',
            '8', '9', 'G', 'H',
            'I', 'J', 'K', 'L',
        ],
    });
    let randomPRequisition = (ui() + "/" + new Date().getFullYear())


    const onFinish = (values) => {
        const modifiedValue = {
            ...values,
            date: values['date']?.format('YYYY-MM-DD'),
        };
        console.log("submit", modifiedValue)
        form.resetFields();
    }
    const onReset = () => {
        form.resetFields();
    }
    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        {" "}
                        <Link to="/store">
                            {" "}
                            <i className="fas fa-archive" /> &nbsp;Store
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        &nbsp;Procurement Requisition
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard title="Procurement Requisition"
            >

                <ARMForm
                    {...layout}
                    form={form}
                    name="issueDemand"
                    onFinish={onFinish}
                    initialValues={{

                        isActive: false
                    }}
                    scrollToFirstError

                >
                    <Row>
                        <Col sm={20} md={10} >
                            <Form.Item
                                name="requisition"
                                label="Requisition"
                                initialValue={randomPRequisition}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="date"
                                label="Date"
                                initialValue={moment()}
                            >
                                <DatePicker style={{ width: '100%' }} size='medium'

                                    format="YYYY-MM-DD"

                                ></DatePicker>
                            </Form.Item>
                            <Form.Item
                                name="demandNo"
                                label="Demand No"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={20} md={10}>
                            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 10 }}>
                                <Space size="small">
                                    <ARMButton type="primary" htmlType="submit">
                                        {id ? 'Update' : 'Submit'}
                                    </ARMButton>
                                    <ARMButton onClick={onReset} type="primary" danger>
                                        Reset
                                    </ARMButton>
                                </Space>
                            </Form.Item>

                        </Col>
                    </Row>
                </ARMForm>
            </ARMCard >
            &nbsp;
            <ARMCard title="Item List">
                <ResponsiveTable>
                    <ARMTable >
                        <thead>
                            <tr>
                                <th>Part No.</th>
                                <th>Description</th>
                                <th>Aircraft Overview</th>
                                <th>Department</th>
                                <th>Demand Qty</th>
                                <th>Order Qty</th>
                                <th>UOM OQ</th>
                                <th>Present Stock</th>
                                <th>Previous PO</th>
                                <th>Previous Date</th>
                            </tr>
                        </thead>
                        <tbody>

                            {pRequisition?.map((data, index) => (
                                <tr key={data.id}>
                                    <td style={{ border: '1px solid black' }}>{data.demandno}</td>
                                    <td>{data.partNo}</td>
                                    <td>{data.description}</td>
                                    <td>{data.aircraftOverview}</td>
                                    <td>{data.department}</td>
                                    <td>{data.demandQty}</td>
                                    <td>{data.orderQty}</td>
                                    <td>{data.uomOq}</td>
                                    <td>{data.presentStock}</td>
                                    <td>{data.previousPo}</td>
                                    <td>{data.previousDate}</td>
                                </tr>
                            ))}

                        </tbody>
                    </ARMTable>
                </ResponsiveTable>
            </ARMCard>

        </CommonLayout >
    );
};

export default ProcurementRequisition;