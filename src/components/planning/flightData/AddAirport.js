import React, {useEffect, useState} from 'react';
import CommonLayout from "../../layout/CommonLayout";
import {Breadcrumb, Col, Form, Input, notification, Row, Select, Space} from "antd";
import ARMButton from "../../common/buttons/ARMButton";
import ARMCard from "../../common/ARMCard";
import AirportService from "../../../service/AirportService";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getLinkAndTitle} from "../../../lib/common/TitleOrLink";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import {getErrorMessage} from "../../../lib/common/helpers";
import ARMForm from "../../../lib/common/ARMForm";


const {Option} = Select;

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const AddAirport = () => {

    // needed states
    const [form] = Form.useForm();
    const {id} = useParams()
    const navigate  =useNavigate()

    const [airportData, setAirportData] = useState({});


    // handle reset input fields
    const onReset = () => {
        if(id){
            form.setFieldsValue({...airportData})
        }
        else{
            form.resetFields()
        }
    };


    useEffect(() => {
        if (!id) {
            return
        }
        getAirportById().catch(console.error)

    }, [id])


    // single airport data

    const getAirportById = async () => {
        try {
            const {data} = await AirportService.getAirportById(id)
            form.setFieldsValue({...data})
            setAirportData({...data})

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }




    // post api call using async await
    const onFinish = async (values) => {
        console.log("values", values)
        try {
            if (id) {
                await AirportService.updateAirport(id, values)
            } else{
                let {data} = await AirportService.saveAirport(values)
            }

            form.resetFields()
            navigate('/planning/airports')
            notification["success"]({
                message: id ? "Successfully updated!" : "Successfully added!",
            });

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }

    };


    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item> <Link to='/planning'> <i className="fas fa-chart-line"/>&nbsp; Planning
                    </Link></Breadcrumb.Item>

                    <Breadcrumb.Item><Link to='/planning/airports'>
                        Airports
                    </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        Airport
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={
                    getLinkAndTitle('AIRPORT', '/planning/airports/')
                }

            >
                    <Row>
                        <Col sm={20} md={10}>
                            <ARMForm
                                {...layout}
                                form={form}
                                name="airports"
                                onFinish={onFinish}
                                initialValues={{
                                    name: '',
                                    iataCode: '',
                                    countryCode: '',
                                    isActive: false
                                }}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="name"
                                    label="Airport"
                                    rules={[
                                        {
                                            required: true,
                                            message: "This field is required!"
                                        },
                                    ]}
                                     
                                >
                                    <Input    />
                                </Form.Item>

                                <Form.Item
                                    name="iataCode"
                                    label="IATA Code"rules={[
                                    {
                                        required: true,
                                        message: "This field is required!"
                                    },
                                ]}
                                     
                                >
                                    <Input    />
                                </Form.Item>

                                <Form.Item
                                    name="countryCode"
                                    label="Country Code"
                                     
                                    rules={[
                                        {
                                            type: 'string',
                                            min: 2,
                                            message: 'country Code cannot be less than 2'
                                        },
                                    ]}
                                >
                                    <Input     />
                                </Form.Item>

                                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                                    <Space    >
                                        <ARMButton size="medium" type="primary" htmlType="submit">
                                            {id ? 'Update' : 'Submit'}
                                        </ARMButton>
                                        <ARMButton onClick={onReset} size="medium" type="primary" danger>
                                            Reset
                                        </ARMButton>
                                    </Space>
                                </Form.Item>
                            </ARMForm>
                        </Col>
                    </Row>
            </ARMCard>
        </CommonLayout>
    )
        ;
};

export default AddAirport;
