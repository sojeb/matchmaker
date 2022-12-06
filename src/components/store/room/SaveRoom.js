import {Breadcrumb, Col, Form, Input, notification, Row, Select, Space} from "antd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getLinkAndTitle} from "../../../lib/common/TitleOrLink";
import RoomService from "../../../service/RoomService";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMButton from "../../common/buttons/ARMButton";
import {scrollToTop} from "../../configaration/company/Company";
import CommonLayout from "../../layout/CommonLayout";
import ARMForm from "../../../lib/common/ARMForm";

const SaveRoom = () => {
    const [form] = Form.useForm();
    const navigate  =useNavigate()
    const {Option} = Select;
    let {id} = useParams();
    const stores = useSelector((state) => state.stores.model);
    const cities = useSelector((state) => state.cities.model);
    console.log("Cities",cities)
    const [singleRoom, setSingleRoom] = useState();
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
                await RoomService.updateRoom(id, values);
                // getAllCompanies();
                navigate(-1)
                notification["success"]({
                    message: "Room successfully updated",
                });
            } catch (er) {
                notification["error"]({
                    message: er.response.data.apiErrors[0].message,
                });
            }
        } else {
            await RoomService.SaveRoom(values)
                .then((response) => {
                    console.log("response.status", response);
                    if (response.status === 200) {
                        notification["success"]({
                            message: "Successfully Created",
                        });
                        // getAllCompanies();
                        form.resetFields();
                        navigate(-1)
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

    const loadSingleRoom = async () => {
        try {
            const {data} = await RoomService.singleRoom(id);
            form.setFieldsValue({...data});
            setSingleRoom({...data});
        } catch (er) {
            console.log(er);
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const onReset = () => {

        if (id)
        {
            form.setFieldsValue({...singleRoom});
        } else {
            form.resetFields()
        }
    };



    useEffect(() => {
        if (!id) return form.resetFields();
        loadSingleRoom();
    }, [id]);

    return (
        <div>
            <CommonLayout>
                <ARMBreadCrumbs>
                    <Breadcrumb separator="/">
                        <Breadcrumb.Item>
                            {" "}
                            <Link to="/store">
                                {" "}
                                <i className="fas fa-archive"/> &nbsp;Store
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/store/room">
                                {" "}
                                &nbsp;Room
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {" "}
                            {id ? 'Update' : "Add"}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </ARMBreadCrumbs>
                <ARMCard title={getLinkAndTitle(id ? "Update Room" : "Add Room", "/store/room")}>
                    <Row>
                        <Col
                            sm={20} md={10}
                        >
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
                                    name="roomCode"

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
                                    label="Name"
                                    name="roomName"

                                >
                                    <Input/>
                                </Form.Item>
                                <Form.Item
                                    name="storeId"
                                    label="Store"

                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select any store !",
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


                                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                                    <Space>
                                        <ARMButton type="primary" htmlType="submit">
                                            {id ? 'Update' : 'Submit'}
                                        </ARMButton>
                                        <ARMButton onClick={onReset} type="primary" danger>
                                            Reset
                                        </ARMButton>
                                    </Space>
                                </Form.Item>

                            </ARMForm>
                        </Col>
                    </Row>
                </ARMCard>

            </CommonLayout>
        </div>
    );
};

export default SaveRoom;
