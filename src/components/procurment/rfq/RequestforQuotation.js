import { Breadcrumb, Col, DatePicker, Form, Input, notification, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ARMForm from '../../../lib/common/ARMForm';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMCard from '../../common/ARMCard';
import CommonLayout from '../../layout/CommonLayout';
import ShortUniqueId from 'short-unique-id';
import moment from 'moment';
import ARMButton from '../../common/buttons/ARMButton';
import ResponsiveTable from '../../common/ResposnsiveTable';
import ARMTable from '../../common/ARMTable';
import { getLinkAndTitle } from '../../../lib/common/TitleOrLink';
import CompanyService from '../../../service/CompanyService';
import RequestforQuotationService from '../../../service/procurment/RequestforQuotationService'
import { getErrorMessage } from '../../../lib/common/helpers';
const RequestforQuotation = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [form] = Form.useForm();
    const [rfq, setRfq] = useState([])
    const [company, setCompany] = useState([])
    const { Option } = Select;
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
    let randomRfqNo = ("RFQ-" + ui() + "/" + new Date().getFullYear())
const getCompany=async()=>{
    const {data}= await CompanyService.getAllCompanies(true)
    console.log("company",data)
    setCompany(data.model)
}

useEffect(() => {
    if (!id) {
        //form.resetFields()
        return
    }
    getRequestQuotationById().catch(console.error)

}, [id])
const getRequestQuotationById = async () => {
    try {
        const {data} = await RequestforQuotationService.getRequestforQuotationById(id)

        form.setFieldsValue({
            ...data,
            requestDate:    moment(data.requestDate),
            respondDate:    moment(data.respondDate)
        } )

    } catch (er) {
        notification["error"]({message: getErrorMessage(er)});
    }
}


useEffect(() => {
    getCompany().catch(console.error)
}, [])
    const onFinish =async (values) => {
        const modifiedValue = {
            ...values,
            requestDate: values['requestDate']?.format('YYYY-MM-DD'),
            respondDate: values['respondDate']?.format('YYYY-MM-DD'),
          };
        console.log("submit", modifiedValue )
        try {
            if (id) {
                let { data }= await RequestforQuotationService.updateRequestforQuotation(id,modifiedValue);
            } else {
              let { data } = await RequestforQuotationService.saveRequestforQuotation(modifiedValue);
            }
            form.resetFields();
            navigate('/procurment/request-for-quotation');
            notification['success']({
              message: id ? 'Successfully updated!' : 'Successfully added!',
            });
          } catch (er) {
            notification['error']({ message: getErrorMessage(er) });
          }




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
                        <i className="fa fa-shopping-basket" />
                        <Link to='/procurment'>
                            &nbsp; Procurment
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to='/procurment/request-for-quotation'>
                        Request for Quotation(RFQ)
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {id ? 'edit' : 'add'}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard title={getLinkAndTitle(
          'Request for Quotation(RFQ)',
          '/procurment/request-for-quotation',
        )}
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
                                name="rfqNo"
                                label="RFQ No"
                                rules={[
                                    {
                                        required: true,
                                        message: "This field is required!"
                                    },
                                ]}
                                initialValue={randomRfqNo}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="requisition"
                                label="Requisition"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="companyId"
                                label="Company"
                            >
                               <Select
                               placeholder="--Select Company--"
                               >
                                {
                                    company?.map((data)=>(
                                        <Option key={data.id} value={data.id}>{data.companyName}</Option>
                                    ))
                                }
                               </Select>
                            </Form.Item>


                        </Col>
                        <Col sm={20} md={10}>
                            <Form.Item
                                name="requestDate"
                                label="Date Request"
                            >
                                <DatePicker style={{ width: '100%' }} size='medium'

                                    format="YYYY-MM-DD"

                                ></DatePicker>
                            </Form.Item>
                            <Form.Item
                                name="respondDate"
                                label="Respond Date"
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
            <ARMCard title="Parts List">
                <ResponsiveTable>
                    <ARMTable >
                        <thead>
                            <tr>
                                <th>Part No</th>
                                <th>Alt Part No</th>
                                <th>Description</th>
                                <th>Condition</th>
                                <th>QTY</th>
                                <th>Currency</th>

                            </tr>
                        </thead>
                        <tbody>

                            {rfq?.map((data, index) => (
                                <tr key={data.id}>
                                    <td >{data.demandno}</td>
                                    <td>{data.priority}</td>
                                    <td>{data.status}</td>
                                    <td>{data.demandno}</td>
                                    <td>{data.priority}</td>
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

export default RequestforQuotation;