import React, {useEffect, useState} from 'react';
import CommonLayout from "../../../layout/CommonLayout";
import ARMBreadCrumbs from "../../../common/ARMBreadCrumbs";
import {Breadcrumb, Col, DatePicker, Form, Input, InputNumber, notification, Row, Select, Space} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import ARMCard from "../../../common/ARMCard";
import {getLinkAndTitle} from "../../../../lib/common/TitleOrLink";
import ARMButton from "../../../common/buttons/ARMButton";
import {getErrorMessage} from "../../../../lib/common/helpers";
import {useDispatch, useSelector} from "react-redux";
import {scrollToTop} from "../../../configaration/company/Company";
import AircraftService from "../../../../service/AircraftService";
import {getAircrafts} from "../../../../reducers/aircraft.reducers";
import ARMForm from "../../../../lib/common/ARMForm";
import PropellerServices from "../../../../service/PropellerServices";
import moment from "moment";


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const { Option } = Select;


const AddPropeller = () => {
    // needed states
    const [form] = Form.useForm();
    const {id} = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [propellers, setPropellers] = useState({});


    // aircraft data dispatching

    const aircraftData = useSelector(state => state.aircrafts.model)



    const getAllAircraft = () => {
        AircraftService.getAllAircraft(true)
            .then((response) => {
                dispatch(getAircrafts(response.data));
            })
            .catch((error) => {
                console.log("something went wrong", error);
            });
    };
    useEffect(() => {
        getAllAircraft();
        scrollToTop();
    }, []);

    // handle reset input fields
    const onReset = () => {
        if (id) {
            form.setFieldsValue({...propellers})
        } else {
            form.resetFields()
        }
    };



    // get major component data by id
    useEffect(() => {
        if (!id) {
            return
        }
        getPropellerById().catch(console.error)

    }, [id])

    const getPropellerById = async () => {
        try {
            const {data} = await PropellerServices.getPropellerById(id)
            form.setFieldsValue({...data,installationDate: moment(data.installationDate),estimatedDate: moment(data.estimatedDate)})
            setPropellers({...data})

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }


    // post api call using async await
    const onFinish = async (fieldsValue) => {

        const values = {
            ...fieldsValue,
            installationDate: fieldsValue['installationDate'].format('YYYY-MM-DD'),
            estimatedDate: fieldsValue['estimatedDate'].format('YYYY-MM-DD'),
        };
        console.log('value', values)

        try {
            if (id) {
                await PropellerServices.updatePropeller(id, values)
            } else {
                let {data} = await PropellerServices.savePropeller(values)

            }

            form.resetFields()
            navigate('/planning/propellers')
            notification["success"]({
                message: id ? "Successfully updated!" : "Successfully added!",
            });

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }

    };

    //Title separating
    const TITLE = id ? 'Propeller Edit' : 'Propeller Add';

    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item> <Link to='/planning'> <i className="fas fa-chart-line"/>&nbsp; Planning
                    </Link></Breadcrumb.Item>

                    <Breadcrumb.Item><Link to='/planning/propellers'>
                        Propellers
                    </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        {TITLE}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={
                    getLinkAndTitle('Propeller', '/planning/propellers')
                }

            >
                <ARMForm
                    {...layout}
                    form={form}
                    name="propeller"
                    onFinish={onFinish}
                    scrollToFirstError
                    initialValues={{
                        tsn: 0,
                        csn: 0,
                        isActive: true
                    }
                    }
                >
                    <Row>
                        <Col sm={20} md={10}>

                            <Form.Item
                                label="Aircraft"
                                name="aircraftId"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an option',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select an Aircraft"
                                    allowClear

                                >
                                    {aircraftData?.map((aircraft) => (
                                        <Option key={aircraft.id} value={aircraft.id}>
                                            {aircraft.aircraftName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="nomenClature"
                                label="NomenClature"

                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="partNo"
                                label="Part No"

                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="serialNo"
                                label="Serial No"

                            >
                                <Input/>
                            </Form.Item>


                            <Form.Item
                                label="Installation Date"
                                name="installationDate"
                                rules={[
                                    {
                                        required: false,
                                        message: "Please input a Date",
                                    },
                                ]}

                            >
                                <DatePicker style={{width: '100%'}}/>
                            </Form.Item>
                            <Form.Item
                                name="installationTsn"
                                label="Installation TSN"
                                rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        message: "This field can not be less than 0"
                                    },
                                ]}

                            >
                                <InputNumber type='number' style={{width: '100%'}}/>
                            </Form.Item>


                        </Col>

                        <Col sm={20} md={10}>

                            <Form.Item
                                name="installationTso"
                                label="Installation TSO"
                                rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        message: "This field can not be less than 0"
                                    },
                                ]}

                            >
                                <InputNumber type='number' style={{width: '100%'}}/>
                            </Form.Item>
                            <Form.Item
                                name="currentTsn"
                                label="Current TSN"
                                rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        message: "This field can not be less than 0"
                                    },
                                ]}

                            >
                                <InputNumber type='number' style={{width: '100%'}}/>
                            </Form.Item>


                            <Form.Item
                                name="currentTso"
                                label="Current TSO"
                                rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        message: "This field can not be less than 0"
                                    },
                                ]}

                            >
                                <InputNumber type='number' style={{width: '100%'}}/>

                            </Form.Item>


                            <Form.Item
                                name="limitMonth"
                                label="Limit Month"
                                rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        message: "This field can not be less than 0"
                                    },
                                ]}

                            >
                                <InputNumber type='number' style={{width: '100%'}}/>
                            </Form.Item>

                            <Form.Item
                                name="limitFh"
                                label="Limit FH"
                                rules={[
                                    {
                                        type: 'number',
                                        min: 0,
                                        message: "This field can not be less than 0"
                                    },
                                ]}

                            >
                                <InputNumber type="number" style={{width: '100%'}}/>
                            </Form.Item>
                            <Form.Item
                                label="Estimated Date"
                                name="estimatedDate"
                                rules={[
                                    {
                                        required: false,
                                        message: "Please input a Date",
                                    },
                                ]}

                            >
                                <DatePicker style={{width: '100%'}}/>
                            </Form.Item>


                        </Col>
                    </Row>
                    <Row>
                        <Col sm={20} md={10}>
                            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                                <Space>
                                    <ARMButton size="medium" type="primary" htmlType="submit">
                                        {id ? 'Update' : 'Submit'}
                                    </ARMButton>
                                    <ARMButton onClick={onReset} size="medium" type="primary" danger>
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

export default AddPropeller;
