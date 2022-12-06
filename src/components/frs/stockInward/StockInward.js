import React, {useEffect, useState} from 'react';
import CommonLayout from "../../layout/CommonLayout";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import {Breadcrumb, Col, DatePicker, Form, Input, InputNumber, notification, Row, Select, Space} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import ARMCard from "../../common/ARMCard";
import {getLinkAndTitle} from "../../../lib/common/TitleOrLink";
import ARMButton from "../../common/buttons/ARMButton";
import TextArea from "antd/es/input/TextArea";
import ARMForm from "../../../lib/common/ARMForm";
import ShortUniqueId from "short-unique-id";
import ModuleService from "../../../service/ModuleService";
import {getErrorMessage} from "../../../lib/common/helpers";
import StockInwardService from "../../../service/StockInwardService";
import moment from "moment";

const { Option } = Select;


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};


const StockInward = () => {

    const [form] = Form.useForm();
    const {id} = useParams()
    const[stockInwardItem,setStockInwardItem] = useState({})
    const [slNo,setSlNo] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (!id) {
            //form.resetFields()
            return
        }
        getStockInwardById().catch(console.error)

    }, [id])

    const getStockInwardById = async () => {
        try {
            const {data} = await StockInwardService.getStockInwardById(id)
            console.log("edit stock inward data",data)
            setSlNo(data.serialNo)
            let modifiedValue = {
                 ...data,
                receiveDate: data?.receiveDate ? moment(data.receiveDate) : null,
                arrivalDate: data.arrivalDate ? moment(data.arrivalDate) : null,
                importDate: data.importDate ? moment(data.importDate) : null
            }
            form.setFieldsValue(modifiedValue)

            setStockInwardItem(modifiedValue)
            //console.log("single module",data)

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }


    // post api call using async await
    const onFinish = async (values) => {
        console.log("stock inward values", values)

        const modifiedValues = {
            ...values,
            receiveDate: values['receiveDate']?.format('YYYY-MM-DD HH:mm:ss'),
            arrivalDate: values['arrivalDate']?.format('YYYY-MM-DD HH:mm:ss'),
            importDate: values['importDate']?.format('YYYY-MM-DD HH:mm:ss')

        };

        try {
            if (id) {
                await StockInwardService.updateStockInward(id, modifiedValues)
            } else {
                await StockInwardService.saveStockInward(modifiedValues)
            }
            form.resetFields()
            navigate('/frs/stock-inwards')
            notification["success"]({
                message: id ? "Successfully updated!" : "Successfully added!",
            })

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    };

    // handle reset input fields
    const onReset = () => {
        if (id) {
            form.setFieldsValue(stockInwardItem)
        } else {
            form.resetFields();
        }
    }

    const serialNumberGenerator = () => {
        let ui = new ShortUniqueId({
            dictionary: [
                '0', '1', '2', '3',
                '4', '5', '6', '7',
                '8', '9', 'M', 'N',
                'O', 'P', 'Q', 'R',
            ],
        });
        let serialNo = (ui() + "/" + new Date().getFullYear())
        return serialNo
    }

    return (
        <CommonLayout>

            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        <Link to='/frs'>
                            <i className="fa fa-file-certificate" />&nbsp; FRS
                        </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item><Link to='/frs/stock-inwards'>
                        Stock Inward
                    </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                       add
                    </Breadcrumb.Item>

                </Breadcrumb>
            </ARMBreadCrumbs>

            <ARMCard
                title={
                    getLinkAndTitle('stock inward', '/frs/stock-inwards')
                }
              >
                <ARMForm
                    {...layout}
                    form={form}
                    name="stockInward"
                    onFinish={onFinish}
                    initialValues={{
                        serialNo: serialNumberGenerator(),
                        orderNo: 12435
                    }}
                    scrollToFirstError
                >
                    <Row>
                        <Col sm={20} md={12}>

                            <Form.Item
                                name="serialNo"
                                label="Sl No"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required!"
                                    },
                                ]}
                            >
                             {/*<Input disabled style={{backgroundColor: 'white', color: 'black',opacity: '0.8'}}/>*/}
                                <div style={{
                                    width:'100%',
                                    border:'1px solid #ddd',
                                    padding:'4px 10px',
                                    borderRadius: '5px'
                                }}>
                                 { slNo ? slNo : serialNumberGenerator() }
                                </div>
                            </Form.Item>

                            <Form.Item
                                name="requisitionNumber"
                                label="Requisition Number"
                               /* rules={[
                                    {
                                        required: true,
                                        message: "This field is required!"
                                    },
                                ]}*/
                            >
                            <Input />
                            </Form.Item>

                            <Form.Item
                                name="receiveDate"
                                label="Received Date"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required!"
                                    },
                                ]}
                            >
                            <DatePicker style={{width: '100%'}} showTime/>
                            </Form.Item>

                            <Form.Item
                                name="tptMode"
                                label="TPT Mode"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="flightNo"
                                label="Flight No"
                            >
                             <Input />
                            </Form.Item>

                            <Form.Item
                                name="arrivalDate"
                                label="Arrival Date"
                            >
                                <DatePicker style={{width: '100%'}} showTime/>
                            </Form.Item>

                            <Form.Item
                                name="airwaysBill"
                                label="Airway Bill"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="invoiceNo"
                                label="Invoice No"
                            >
                             <Input />
                            </Form.Item>

                            <Form.Item
                                name="packingMode"
                                label="Packing Mode"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="packingNo"
                                label="Packing No"
                            >
                                <Input />
                            </Form.Item>

                        </Col>

                        <Col sm={20} md={12}>

                            <Form.Item
                                name="orderNo"
                                label="Order No"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required!"
                                    },
                                ]}
                            >
                            <Input placeholder="Type for auto complete..."/>
                            </Form.Item>

                            <Form.Item
                                name="weight"
                                label="Weight"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="noOfItems"
                                label="No Of Item"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required!",
                                        type: "number"
                                    },
                                ]}
                            >
                                <InputNumber type="number" style={{width: '100%'}}/>
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="General Description"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="importNo"
                                label="Import No"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="importDate"
                                label="Import Date"
                            >
                             <DatePicker style={{width: '100%'}} showTime/>
                            </Form.Item>

                            <Form.Item
                                name="discrepancyReportNo"
                                label="Discrepancy Report No"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="remarks"
                                label="Remarks"
                            >
                             <TextArea />
                            </Form.Item>

                        </Col>
                    </Row>
                    <Row>
                        <Col sm={20} md={10}>
                            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 10}}>
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
            </ARMCard>
        </CommonLayout>
    );
};

export default StockInward;
