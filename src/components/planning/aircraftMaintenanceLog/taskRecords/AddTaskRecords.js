import React, {useEffect, useState} from 'react';
import CommonLayout from "../../../layout/CommonLayout";
import ARMBreadCrumbs from "../../../common/ARMBreadCrumbs";
import {Breadcrumb, Checkbox, Col, Form, Input, InputNumber, notification, Row, Select, Space} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import ARMCard from "../../../common/ARMCard";
import {getLinkAndTitle} from "../../../../lib/common/TitleOrLink";
import ARMButton from "../../../common/buttons/ARMButton";
import {getErrorMessage} from "../../../../lib/common/helpers";
import PartsServices from "../../../../service/PartsServices";
import ARMForm from "../../../../lib/common/ARMForm";
import {refreshPagination} from "../../../../lib/hooks/paginations";
import {useDispatch} from "react-redux";
import TaskRecordServices from "../../../../service/TaskRecordServices";
import TextArea from "antd/es/input/TextArea";


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const {Option} = Select;


const AddTaskRecords = () => {
    const [form] = Form.useForm();
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // needed states

    const [tasksData, setTasksData] = useState({});
    
   

    // handle reset input fields
    const onReset = () => {
        if (id) {
            form.setFieldsValue({...tasksData})
        } else {
            form.resetFields()
        }
    };


    // get Parts data by id
    useEffect(() => {
        if (!id) {
            return
        }
        getTaskById().catch(console.error)

    }, [id])

    const getTaskById = async () => {
        try {
            const {data} = await TaskRecordServices.getTaskById(id)
            form.setFieldsValue({...data})
            setTasksData({...data})

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }


    // post api call using async await
    const onFinish = async (values) => {

        try {
            if (id) {
                await TaskRecordServices.updateTask(id, values)
            } else {
                let {data} = await TaskRecordServices.saveTask(values)

            }

            form.resetFields()
            dispatch(refreshPagination("taskRecords", "task/search"));
            navigate('/planning/task-records')
            notification["success"]({
                message: id ? "Successfully updated!" : "Successfully added!",
            });

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }

    };

    //Title separating
    const TITLE = id ? 'Task Record Edit' : 'Task Record Add';


    let types = [
        {
            id: 1,
            name: 'FH'
        },
        {
            id: 2,
            name: ' FC'
        },
        {
            id: 3,
            name: ' YEAR'
        },
        {
            id: 4,
            name: ' MONTH'
        }
    ]


    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item> <Link to='/planning'> <i className="fas fa-chart-line"/>&nbsp; Planning
                    </Link></Breadcrumb.Item>

                    <Breadcrumb.Item><Link to='/planning/task-records'>
                        Task Records
                    </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>
                        {TITLE}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={
                    getLinkAndTitle('Task Record', '/planning/task-records')
                }

            >
                <ARMForm
                    {...layout}
                    form={form}
                    name="taskRecords"
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
                                name="taskNo"
                                label="Task no"

                            >
                                <Input/>
                            </Form.Item>


                            <Form.Item
                                name="thresholdValue"
                                label="Threshold Value"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an option',
                                    },
                                ]}

                            >
                                <InputNumber
                                    type='number'
                                    style={{width: '100%'}}/>
                            </Form.Item>

                            <Form.Item
                                label="Threshold Type"
                                name="thresholdType"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an option',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select Threshold Type"
                                    allowClear
                                >
                                    {types?.map(type => (
                                        <Option key={type.id} value={type.id}>
                                            {type.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="intervalValue"
                                label="Interval Value"

                            >
                                <InputNumber
                                    type='number'
                                    style={{width: '100%'}}/>
                            </Form.Item>

                            <Form.Item
                                label="Interval Type"
                                name="intervalType"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select an option',
                                    },
                                ]}
                            >
                                <Select
                                    placeholder="Select Interval Type"
                                    allowClear
                                >
                                    {types?.map(type => (
                                        <Option key={type.id} value={type.id}>
                                            {type.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="jobProcedure"
                                label="Job Procedure"

                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name="effectivity"
                                label="Effectivity"

                            >
                                <InputNumber
                                    type='number'
                                    style={{width: '100%'}}/>
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Description"

                            >
                                <TextArea />
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

export default AddTaskRecords;
