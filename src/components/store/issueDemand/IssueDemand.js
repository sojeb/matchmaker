
import { EditOutlined, EyeOutlined, UnlockOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ARMForm from '../../../lib/common/ARMForm';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMCard from '../../common/ARMCard';
import ARMTable from '../../common/ARMTable';
import ARMButton from '../../common/buttons/ARMButton';
import CommonLayout from '../../layout/CommonLayout';
import ResponsiveTable from "../../common/ResposnsiveTable";
import ShortUniqueId from 'short-unique-id';
const IssueDemand = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [visiable, setVisiable] = useState([false]);
    const [itemIssue, setItemIssue] = useState([]);
    const { Option } = Select;
    const layout = {
        labelCol: {
            span: 10,
        },
        wrapperCol: {
            span: 14,
        },
    };

    //     let initialValue = {
    //         item: null,
    //         name: '',
    //         title: ''
    //     }

    //   initialValue = {...initialValue,name:'Nasir'}
    // console.log("naaa",initialValue)
    let ui = new ShortUniqueId({
        dictionary: [
            '0', '1', '2', '3',
            '4', '5', '6', '7',
            '8', '9', 'G', 'H',
            'I', 'J', 'K', 'L',
        ],
    });
    let randomIssueVoucherNo = (ui() + "/" + new Date().getFullYear())


    const onFinish = (values) => {
        console.log("submit", values
        )
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
                        &nbsp;Issue Demand
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard title="Issue Demand"
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
                                name="issueVoucherNO"
                                label="Issue Voucher No"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required!"
                                    },
                                ]}
                                initialValue={randomIssueVoucherNo}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="demandNo"
                                label="Demand No"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required!"
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="priority"
                                label="Priority"
                            >
                                <Input />
                            </Form.Item>


                        </Col>
                        <Col sm={20} md={10}>
                            <Form.Item
                                name="registration"
                                label="Registration"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="demandDate"
                                label="Demand On"
                                initialValue={moment()}
                            >
                                <DatePicker style={{ width: '100%' }} size='medium'

                                    format="YYYY-MM-DD"

                                ></DatePicker>
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
            <ARMCard title="Issue Demand List">
                <ResponsiveTable>
                    <ARMTable >
                        <thead>
                            <tr>
                                <th>Component</th>
                                <th>Part No.</th>
                                <th>Serial/Lot No.</th>
                                <th>UOM</th>
                                <th>Qty Required</th>
                                <th>Stock Balance</th>
                                <th>Qty Issued</th>
                            </tr>
                        </thead>
                        <tbody>

                            {itemIssue?.map((data, index) => (
                                <tr key={data.id}>
                                    <td style={{ border: '1px solid black' }}>{data.demandno}</td>
                                    <td>{data.priority}</td>
                                    <td>{data.status}</td>
                                    <td>{data.demandno}</td>
                                    <td>{data.priority}</td>
                                    <td>{data.status}</td>
                                    <td>{data.status}</td>
                                </tr>
                            ))}

                        </tbody>
                    </ARMTable>
                </ResponsiveTable>
            </ARMCard>

        </CommonLayout >
    );
};

export default IssueDemand;