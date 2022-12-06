import { Breadcrumb, Col, Form, Input, Row, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ARMForm from '../../../lib/common/ARMForm';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMCard from '../../common/ARMCard';
import ARMButton from '../../common/buttons/ARMButton';
import CommonLayout from '../../layout/CommonLayout';

const UnserviceableItem = () => {
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log(values)

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

                    &nbsp;Unserviceable Item

                </Breadcrumb.Item>
            </Breadcrumb>
        </ARMBreadCrumbs>
        <ARMCard
            title="Unserviceable Item"
        >
            <ARMForm
                {...layout}
                form={form}
                name="basic"
                initialValues={{}}
                onFinish={onFinish}
                autoComplete="off"
                style={{
                    backgroundColor: "#ffffff",
                }}
            >
                <Row>
                    <Col sm={20} md={10} >
                        <Form.Item
                            name="slNo"
                            label="Serial No"

                        >

                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="issueNo"
                            label="Issue No"
                            rules={[
                                {
                                    required: false,
                                    message: "This field is required!"
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="installedPartdNo"
                            label="Installed Part No"
                            rules={[
                                {
                                    required: false,
                                    message: "This field is required!"
                                },
                            ]}

                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="installedSerialNo"
                            label="Installed Serial No"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="aircraft"
                            label="Aircraft"
                        >
                            <Input />
                        </Form.Item>
                       

                    </Col>
                    <Col sm={20} md={10}>
                    <Form.Item
                            name="position"
                            label="Position"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="removedPartNo"
                            label="Removed Part No"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="removedSerialNo"
                            label="Removed Serial No"

                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            name="removedDate"
                            label="Removed Date"

                        >

                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="removalReasone"
                            label="Removal Reason"

                        >

                            <Input />
                        </Form.Item>
                    </Col>
               
                    <Col sm={20} md={10}>
                        <Form.Item style={{ marginTop: '10px' }} wrapperCol={{ ...layout.wrapperCol,offset:8 }}>
                            <Space size="small">
                                <ARMButton type="primary" htmlType="submit">
                                    {/* {id ? 'Update' : 'Submit'} */}Submit
                                </ARMButton>
                                <ARMButton
                                    onClick={onReset}
                                    type="primary"
                                    danger
                                >
                                    Reset
                                </ARMButton>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </ARMForm>
        </ARMCard>
    </CommonLayout>
    );
};

export default UnserviceableItem;