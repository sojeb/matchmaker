import React, {useEffect, useState} from 'react';
import CommonLayout from "../../../layout/CommonLayout";
import ARMBreadCrumbs from "../../../common/ARMBreadCrumbs";
import {Breadcrumb, Col, Form, Input, notification, Row, Select, Space} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import ARMCard from "../../../common/ARMCard";
import {getLinkAndTitle} from "../../../../lib/common/TitleOrLink";
import ARMButton from "../../../common/buttons/ARMButton";
import {getErrorMessage} from "../../../../lib/common/helpers";
import PartsServices from "../../../../service/PartsServices";
import ARMForm from "../../../../lib/common/ARMForm";
import OilRecordsServices from "../../../../service/OilRecordsServices";
import {refreshPagination} from "../../../../lib/hooks/paginations";
import {useDispatch} from "react-redux";


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const {Option} = Select;


const AddParts = () => {
    const [form] = Form.useForm();
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // needed states

    const [partsData, setPartsData] = useState({});
    const [models, setModels] = useState([]);
    let clsfic;



    // get all models data


    useEffect(() => {
        getAllOilRecords().catch(console.error)
    }, [])

    const getAllOilRecords = async () => {
        try {
            let {data} = await PartsServices.getAllModels()
            setModels(data.model)
        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }

    // handle reset input fields
    const onReset = () => {
        if (id) {
            form.setFieldsValue({...partsData})
        } else {
            form.resetFields()
        }
    };


    // get Parts data by id
    useEffect(() => {
        if (!id) {
            return
        }
        getPartById().catch(console.error)

    }, [id])

    const getPartById = async () => {
        try {
            const {data} = await PartsServices.getPartById(id)
            form.setFieldsValue({...data})
            setPartsData({...data})

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }


    // post api call using async await
    const onFinish = async (values) => {

        try {
            if (id) {
                await PartsServices.updatePart(id, values)
            } else {
                let {data} = await PartsServices.savePart(values)

            }

            form.resetFields()
            dispatch(refreshPagination("part", "part/search"));
            navigate('/planning/parts')
            notification["success"]({
                message: id ? "Successfully updated!" : "Successfully added!",
            });

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }

    };

    //Title separating
    const TITLE = id ? 'Parts Edit' : 'Parts Add';


    let classsifications = [
        {
            id: 0,
            name: 'ROTABLE'
        },
        {
            id: 1,
            name: 'CONSUMABLE'
        },
        {
            id: 2,
            name: 'EXPENDABLE'
        }
    ]

    const unitOfMeasures = [
        {
            id: 0,
            name: 'EACH'
        }
    ]






    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item> <Link to='/planning'> <i className="fas fa-chart-line"/>&nbsp; Planning
                    </Link></Breadcrumb.Item>

                    <Breadcrumb.Item><Link to='/planning/parts'>
                        Parts
                    </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        {TITLE}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={
                    getLinkAndTitle('Parts', '/planning/parts')
                }

            >
                <ARMForm
                    {...layout}
                    form={form}
                    name="parts"
                    onFinish={onFinish}
                    scrollToFirstError
                    initialValues={{
                        isActive: true
                    }
                    }
                >
                    <Row>
                        <Col sm={20} md={10}>
                            <Form.Item
                                label="Model"
                                name="modelId"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an option',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select a Model"
                                    allowClear
                                >
                                    {models?.map(model => (
                                        <Option key={model.id} value={model.modelId}>
                                            {model.modelName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="partNo"
                                label="Part No"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an option',
                                    },
                                ]}

                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="description"
                                label="Description"

                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Classification"
                                name="classification"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please select an option',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select a Classification"
                                    allowClear
                                >
                                    {
                                        classsifications?.map(cls  => (
                                        <Option key={cls.id} value={cls.id}>
                                            {cls.name}
                                        </Option>
                                    ))}

                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Unit of Measure"
                                name="unitOfMeasure"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Please select an unitOfMeasure',
                                    },
                                ]}
                            >
                                <Select

                                    placeholder="Select a Unit of Measure"
                                    allowClear
                                >
                                    {unitOfMeasures?.map(unit => (
                                        <Option key={unit.id} value={unit.id}>
                                            {unit.name}
                                        </Option>
                                    ))}

                                </Select>
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

export default AddParts;
