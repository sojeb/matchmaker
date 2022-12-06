import {
    Breadcrumb,
    Col,
    Form,
    Input,
    InputNumber,
    notification,
    Row,
    Select,
    Space,
} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getLinkAndTitle} from "../../../lib/common/TitleOrLink";
import RackService from "../../../service/RackService";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";
import ARMForm from "../../../lib/common/ARMForm";
import {getRackList} from "../../../store/actions/rack.action";

const Rack = () => {
    const [form] = Form.useForm();
    const navigate=useNavigate()
    const {Option} = Select;
    const [singleRack, setSingleRack] = useState();
    let {id} = useParams();
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.pagination.room.model);
    const stores = useSelector((state) => state.pagination.store.model);
    console.log("Stores",stores)
    console.log("rooms", rooms);
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };


    const onFinish = async (values) => {
        if (id) {
            try {
                await RackService.updateRack(id, values);
                // getAllCompanies();

                notification["success"]({
                    message: "Rack successfully updated",
                });
                navigate(-1)
                // dispatch(getRackList(true))
            } catch (er) {
                notification["error"]({
                    message: er.response.data.apiErrors[0].message,
                });
            }
        } else {
            await RackService.SaveRack(values)
                .then((response) => {
                    if (response.status === 200) {

                        notification["success"]({
                            message: "Successfully Created",
                        });

                        form.resetFields();
                        navigate(-1)
                        // dispatch(getRackList(true))
                    }
                })
                .catch((error) => {
                    notification["error"]({
                        message: error.response.data.apiErrors[0].message,
                    });
                    console.log("something went wrong", error);
                });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const loadSingleRack = async () => {
        try {
            const {data} = await RackService.singleRack(id);
            form.setFieldsValue({...data});
            setSingleRack({...data});
        } catch (er) {
            console.log(er);
        }
    };
    useEffect(() => {
        if (!id) return form.resetFields();
        loadSingleRack();
    }, [id]);

    const onReset = () => {

        if (id)
        {
            form.setFieldsValue({...singleRack});
        } else {
            form.resetFields()
        }
    };
    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        {" "}
                        <Link to="/store/">
                            {" "}
                            <i className="fas fa-archive"/> &nbsp;Store
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {" "}
                        <Link to="/store/rack">
                            {" "}
                            Rack
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {" "}
                        {id ? 'Update' : "Add"}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard title={getLinkAndTitle(id ? "Update Rack" : "Add Rack", "/store/rack")}>
                <Row>
                    <Col sm={20} md={10}>
                        <ARMForm
                            form={form}
                            name="store"
                            {...layout}
                            initialValues={{}}
                            autoComplete="off"
                            style={{
                                backgroundColor: "#ffffff",
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Code"
                                name="rackCode"

                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the code!",
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="storeId"
                                label="Store"

                                rules={[
                                    {
                                        required: true,
                                        message: "Please select store !",
                                    },
                                ]}
                            >
                                <Select allowClear placeholder="Select a store">
                                    {stores.map((store, key) => (
                                        <Option key={key} value={store.id}>
                                            {store.code}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="roomId"
                                label="Room"

                                rules={[
                                    {
                                        required: true,
                                        message: "Please select room !",
                                    },
                                ]}
                            >
                                <Select allowClear placeholder="Select a room">
                                    {rooms.map((room, key) => (
                                        <Option key={key} value={room.roomId}>
                                            {room.roomName}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Height"
                                name="rackHeight"

                            >
                                <InputNumber style={{width: "100%"}}/>
                            </Form.Item>
                            <Form.Item
                                label="Width"
                                name="rackWidth"

                            >
                                <InputNumber style={{width: "100%"}}/>
                            </Form.Item>

                            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                                <Space>
                                    <ARMButton type="primary" htmlType="submit">
                                        {id ? "Update" : "Submit"}
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
                        </ARMForm>
                    </Col>
                </Row>
            </ARMCard>
        </CommonLayout>
    );
};

export default Rack;
