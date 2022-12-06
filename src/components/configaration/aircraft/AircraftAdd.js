import CommonLayout from '../../layout/CommonLayout';
import {
    Breadcrumb,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    notification,
    Row,
    Select,
    Space,
} from 'antd';
import { Option } from 'antd/es/mentions';
import ARMButton from '../../common/buttons/ARMButton';
import ARMCard from '../../common/ARMCard';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getLinkAndTitle } from '../../../lib/common/TitleOrLink';
import AircraftService from '../../../service/AircraftService';
import { getErrorMessage } from '../../../lib/common/helpers';
import { useEffect, useState } from 'react';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMForm from '../../../lib/common/ARMForm';
import { useSelector } from 'react-redux';
import moment from 'moment';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const AircraftAdd = () => {
    const params = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const cardTitle = params.id ? 'Aircraft Edit' : 'Aircraft Add';

    const aircraftModelFamilies = useSelector(
        (state) => state.aircraftModelFamilies.model
    );

    const getAircraftById = async (id) => {
        try {
            const { data } = await AircraftService.getAircraftById(id);
            form.setFieldsValue({
                ...data,
                manufactureDateTime: moment(data.manufactureDateTime),
            });
            console.log('edit: ', data);
        } catch (error) {
            console.log('edit error: ', error);
            notification['error']({ message: getErrorMessage(error) });
        }
    };

    const saveAircraft = async (values) => {
        try {
            const { data } = await AircraftService.saveAircraft(values);
            console.log('aircraft: ', data);
            notification['success']({
                message: 'Aircraft saved successfully',
            });
            form.resetFields();
            navigate(-1);
        } catch (error) {
            console.log('aircarft save error: ', error);
            notification['error']({ message: getErrorMessage(error) });
        }
    };

    const updateAircraft = async (id, data) => {
        try {
            await AircraftService.updateAircraft(id, data);
            notification['success']({
                message: 'Aircraft updated successfully',
            });
            form.resetFields();
            navigate(-1);
        } catch (error) {
            console.log('aircarft update error: ', error);
            notification['error']({ message: getErrorMessage(error) });
        }
    };

    const onReset = () => {
        getAircraftById(params.id);
    };

    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            manufactureDateTime: fieldsValue['manufactureDateTime']?.format(
                'YYYY-MM-DD HH:mm:ss'
            ),
        };
        console.log('values: ', values);
        params.id ? updateAircraft(params.id, values) : saveAircraft(values);
    };

    useEffect(() => {
        params.id && getAircraftById(params.id);
    }, [params.id]);

    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        {' '}
                        <Link to="/planning">
                            {' '}
                            <i className="fas fa-chart-line"/>&nbsp; Planning
                        </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                    <Link to='/planning/aircraft'>Aircraft</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {params.id ? 'Edit' : 'Add'}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>

            <Space
                direction="vertical"
                size="medium"
                style={{
                    display: 'flex',
                }}
            >
                <ARMForm
                    form={form}
                    name="basic"
                    labelCol={{
                        span: 12,
                    }}
                    wrapperCol={{
                        span: 12,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <ARMCard
                        title={getLinkAndTitle(
                            cardTitle,
                            '/planning/aircraft/'
                        )}
                    >
                        <Row>
                            <Col sm={20} md={10}>
                                <Form.Item
                                    label="Aircraft Model Family"
                                    name="aircraftModelId"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select an option',
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder="Select a Aircraft Model Family"
                                        allowClear
                                    >
                                        {aircraftModelFamilies.map(
                                            (aircraftModel) => (
                                                <Option
                                                    key={aircraftModel.id}
                                                    value={aircraftModel.id}
                                                >
                                                    {
                                                        aircraftModel.aircraftModelName
                                                    }
                                                </Option>
                                            )
                                        )}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    label="Name"
                                    name="aircraftName"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input Name',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Type"
                                    name="type"
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Please input Type',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Date Of Manufacture"
                                    name="manufactureDateTime"
                                    rules={[
                                        {
                                            type: 'object',
                                            required: false,
                                            message:
                                                'Please input Date Of Manufacture',
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        style={{ width: '100%' }}
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Registration"
                                    name="registration"
                                    rules={[
                                        {
                                            required: false,
                                            message:
                                                'Please input Registration',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Airframe Serial No."
                                    name="airframeSerial"
                                    rules={[
                                        {
                                            required: false,
                                            message:
                                                'Please input Airframe Serial No.',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col sm={20} md={10}>
                                <Form.Item
                                    name="civilAviationRegistration"
                                    label="Civil Aviation Registration No:"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="shortName"
                                    label="Short name of aircraft:"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="airFrameTotalTime"
                                    label="Airframe Total Time:"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="airframeTotalCycle"
                                    label="Airframe Total Cycle:"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="cabinSeatConfig"
                                    label="Cabin Seat Configuration:"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="inspectionLocation"
                                    label="Inspection Location:"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="active"
                                    label=" Is Active?"
                                    valuePropName="checked"
                                >
                                    <Checkbox value="A"></Checkbox>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={20} md={10}>
                                <Form.Item
                                    wrapperCol={{
                                        ...layout.wrapperCol,
                                        offset: 12,
                                    }}
                                >
                                    <Space size="small">
                                        <ARMButton
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            {params.id ? 'Update' : 'Submit'}
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
                    </ARMCard>
                </ARMForm>
            </Space>
        </CommonLayout>
    );
};

export default AircraftAdd;
