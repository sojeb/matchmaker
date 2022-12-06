import React, {useEffect, useState} from 'react';
import CommonLayout from "../../../layout/CommonLayout";
import ARMBreadCrumbs from "../../../common/ARMBreadCrumbs";
import {Breadcrumb, Col, DatePicker, Form, Input, InputNumber, notification, Row, Select, Space} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import ARMCard from "../../../common/ARMCard";
import {getLinkAndTitle} from "../../../../lib/common/TitleOrLink";
import ARMButton from "../../../common/buttons/ARMButton";
import {getErrorMessage} from "../../../../lib/common/helpers";
import TextArea from "antd/es/input/TextArea";
import MajorComponentServices from "../../../../service/MajorComponentServices";
import {useDispatch, useSelector} from "react-redux";
import {scrollToTop} from "../../../configaration/company/Company";
import AircraftService from "../../../../service/AircraftService";
import {getAircrafts} from "../../../../reducers/aircraft.reducers";
import ARMForm from "../../../../lib/common/ARMForm";
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


const AddMajorComponents = () => {
    // needed states
    const [form] = Form.useForm();
    const {id} = useParams()
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [majorComponentData, setMajorComponentData] = useState({});


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
            form.setFieldsValue({...majorComponentData})
        } else {
            form.resetFields()
        }
    };



    // get major component data by id
    useEffect(() => {
        if (!id) {
            return
        }
        getMajorComponentById().catch(console.error)

    }, [id])

    const getMajorComponentById = async () => {
        try {
            const {data} = await MajorComponentServices.getMajorComponentById(id)
            form.setFieldsValue({...data,date: moment(data.date)})
            setMajorComponentData({...data})

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }


    // post api call using async await
    const onFinish = async (fieldsValue) => {

        const values = {
            ...fieldsValue,
            date: fieldsValue['date'].format('YYYY-MM-DD'),
        };
        console.log('value', values)

        try {
            if (id) {
                await MajorComponentServices.updateMajorComponent(id, values)
            } else {
                let {data} = await MajorComponentServices.saveMajorComponent(values)

            }

            form.resetFields()
            navigate('/planning/major-components')
            notification["success"]({
                message: id ? "Successfully updated!" : "Successfully added!",
            });

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }

    };

    //Title separating
    const TITLE = id ? 'Major Component Edit' : 'Major Component Add';

    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item> <Link to='/planning'> <i className="fas fa-chart-line"/>&nbsp; Planning
                    </Link></Breadcrumb.Item>

                    <Breadcrumb.Item><Link to='/planning/major-components'>
                        Major Components
                    </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        {TITLE}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={
                    getLinkAndTitle('Major Component', '/planning/major-components')
                }

            >
                <ARMForm
                    {...layout}
                    form={form}
                    name="majorComponents"
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
                                name="title"
                                label="Title"

                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="status"
                                label="Status"

                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="position"
                                label="Position"

                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="type"
                                label="Type"

                                rules={[
                                    {
                                        type: 'string',
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        message: "This field is required!"
                                    },
                                ]}

                            >
                                <TextArea/>
                            </Form.Item>


                        </Col>
                        <Col sm={20} md={10}>
                            <Form.Item
                                name="partNo"
                                label="Part No"
                                rules={[
                                    {

                                        message: "This field is required!"
                                    },
                                ]}

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
                                name="manufacturer"
                                label="Manufacturer"

                            >
                                <Input/>
                            </Form.Item>


                            <Form.Item
                                name="componentType"
                                label="Component Type"

                            >
                                <Input/>

                            </Form.Item>


                            <Form.Item
                                name="tsn"
                                label="TSN"
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
                                name="csn"
                                label="CSN"
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
                                label="Date"
                                name="date"
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

export default AddMajorComponents;
