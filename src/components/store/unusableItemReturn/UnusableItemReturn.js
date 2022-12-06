import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, Form, Input, Row, Select, Space } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import ARMForm from '../../../lib/common/ARMForm';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMCard from '../../common/ARMCard';
import ARMButton from '../../common/buttons/ARMButton';
import CommonLayout from '../../layout/CommonLayout';
import ShortUniqueId from 'short-unique-id';

const UnusableItemReturn = () => {
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const { Option } = Select;
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        console.log(values)

    }
    let ui = new ShortUniqueId({
        dictionary: [
          '0', '1', '2', '3',
          '4', '5', '6', '7',
          '8', '9', 'U', 'V',
          'W', 'X', 'Y', 'Z',
        ],
      });
      let randomReturndedVoucherNo = (ui() + "/" + new Date().getFullYear())
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

                        &nbsp;Unusable Item Return

                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title="UNUSEABLE ITEM RETURN"
            >
                <ARMForm
                    {...layout}
                    form={form}
                    name="basic"
                    initialValues={{
                        returnVoucherNo: randomReturndedVoucherNo
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                    style={{
                        backgroundColor: "#ffffff",
                    }}
                >
                    <Row>
                        <Col sm={20} md={10} >
                            <Form.Item
                                name="returnSlNo"
                                label="Return SL No"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="issueNo"
                                label="Issue No"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="shopCode"
                                label="Shop Code"

                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="department"
                                label="Department"
                            >
                                <Select
                                    allowClear
                                    placeholder="--Select Department--"
                                >
                                    <Option value="A">A</Option>
                                    <Option value="B">B</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="location"
                                label="Locartion"
                            >
                                <Select
                                    allowClear
                                    placeholder="--Select Location--"
                                >
                                    <Option value="Dhaka">Dhaka</Option>
                                    <Option value="Loc2">Loc2</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="airCraftRegNo"
                                label="Aircraft Reg. No"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col sm={20} md={10}>
                            <Form.Item
                                name="returnVoucherNo"
                                label="Return Voucher No"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="acceptanceDate"
                                label="Acceptance Date"

                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="issuingDate"
                                label="Issuing Date"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="returningOfficer"
                                label="Returning Officer"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="returnedOn"
                                label="Returned On"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="row"
                                label="Row"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <ARMCard
                        title={"Unusable Item Return Details"}
                        style={{ marginTop: "10px" }}
                    >
                        <Form.List name="unusalbeItemReturnDetails"
                        >

                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space
                                            key={key}
                                            style={{
                                                display: 'flex',
                                                marginBottom: 4,
                                            }}

                                            align="baseline"
                                            wrap
                                        >
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'partNo']}
                                            >
                                                <Input placeholder="Part No" />

                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'qtyReturned']}

                                            >
                                                <Input placeholder="Qty. Returned" />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'onServiceableQty']}

                                            >
                                                <Input placeholder="On Serviceable QTY" />
                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'serviceableQTY']}

                                            >
                                                <Input placeholder="Serviceable QTY" />

                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'uom']}

                                            >
                                                <Input placeholder="UOM" />

                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'releaseOn']}

                                            >
                                                <Input placeholder="Release On" />

                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'rackRowBin']}

                                            >
                                                <Input placeholder="Rack Row Bin" />

                                            </Form.Item>

                                            <Form.Item
                                                {...restField}
                                                name={[name, 'cardLineNo']}

                                            >
                                                <Input placeholder="Card Line No" />

                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))}
                                    <Form.Item wrapperCol={{ ...layout.labelCol }}>
                                        <ARMButton type="primary" onClick={() => add()} block icon={<PlusOutlined />}>Add</ARMButton>


                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    </ARMCard>
                    <Row>
                        <Col sm={20} md={10}>
                            <Form.Item style={{ marginTop: '10px' }} wrapperCol={{ ...layout.wrapperCol }}>
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

export default UnusableItemReturn;