import React, {useState, useEffect} from 'react';
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import {Breadcrumb, Col, Form, Input, InputNumber, notification, Row, Select, Space} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import ARMCard from "../../common/ARMCard";
import {getLinkAndTitle} from "../../../lib/common/TitleOrLink";
import ARMForm from "../../../lib/common/ARMForm";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";

import {useDispatch, useSelector} from "react-redux";
import ExternalDepartmentService from "../../../service/ExternalDepartmentService";

const ExternalDepartment = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const {Option} = Select;
    const [singleExternal, setSingleExternal] = useState();
    let {id} = useParams();
    const dispatch = useDispatch();
    const rooms = useSelector((state) => state.rooms.model);
    const cities = useSelector((state) => state.cities.model);
    const countries = useSelector((state) => state.countries.model);

    console.log("rooms", rooms);
    const layout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
        },
    };


    const onFinish = async (values) => {
        if (id) {
            try {
                await ExternalDepartmentService.updateExternal(id, values);

                notification["success"]({
                    message: "Rack successfully updated",
                });
                navigate(-1)
            } catch (er) {
                notification["error"]({
                    message: er.response.data.apiErrors[0].message,
                });
            }
        } else {
            await ExternalDepartmentService.SaveExternal(values)
                .then((response) => {
                    if (response.status === 200) {

                        notification["success"]({
                            message: "Successfully Created",
                        });

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

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const loadSingleExternalDept = async () => {
        try {
            const {data} = await ExternalDepartmentService.singleExternal(id);
            form.setFieldsValue({...data});
            setSingleExternal({...data});
        } catch (er) {
            console.log(er);
        }
    };
    useEffect(() => {
        if (!id) return form.resetFields();
        loadSingleExternalDept();
    }, [id]);

    const onReset = () => {

        if (id) {
            form.setFieldsValue({...singleExternal});
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
                        <Link to="/configurations/">
                            {" "}
                            <i className="fas fa-cog"/> &nbsp; Configurations
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {" "}
                        <Link to="/configurations/external-department">
                            {" "}
                            External Department
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {" "}
                        {id ? 'Update' : "Add"}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={getLinkAndTitle(id ? "Update  External Department" : "Add  External Department", "/configurations/external-department")}>
                {/*<Row>*/}
                {/*    <Col sm={20} md={10}>*/}
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
                    <Row justify="center" gutter={10}>
                        <Col className="gutter-row" lg={10} md={24} sm={24} xs={24}>
                            <Form.Item
                                label="Company Name"
                                name="companyName"

                                rules={[
                                    {
                                        required: true,
                                        message: "Please input the Company name!",
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Address"
                                name="address"
                            >
                                <Input/>
                            </Form.Item>


                            <Form.Item
                                name="Country"
                                label="countryId"

                                rules={[
                                    {
                                        required: true,
                                        message: "Please select the field !",
                                    },
                                ]}
                            >
                                <Select allowClear placeholder="Select a Country">
                                    {countries.map((country, key) => (
                                        <Option key={key} value={country.id}>
                                            {country.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name="cityId"
                                label="City"

                                rules={[
                                    {
                                        required: true,
                                        message: "Please select the field !",
                                    },
                                ]}
                            >
                                <Select allowClear placeholder="Select a city">
                                    {cities.map((city, key) => (
                                        <Option key={key} value={city.id}>
                                            {city.name}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Office Phone"
                                name="officePhone"


                                rules={[
                                    {
                                        required: false,
                                        type: "regexp",
                                        pattern: new RegExp(/\d+/g),
                                        message: "Wrong format!"
                                    },
                                ]}
                            >
                                <Input type='tel'/>
                            </Form.Item>

                            <Form.Item
                                label="Contact Person"
                                name="contactPerson"
                            >
                                <Input/>
                            </Form.Item>

                        </Col>
                        <Col className="gutter-row" lg={10} md={24} sm={24} xs={24}>

                            <Form.Item
                                label="Contact Phone"
                                name="contractMobile"
                                rules={[
                                    {
                                        required: false,
                                        type: "regexp",
                                        pattern: new RegExp(/\d+/g),
                                        message: "Wrong format!"
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="Contact Phone"
                                name="contactPhone"
                                rules={[
                                    {
                                        required: false,
                                        type: "regexp",
                                        pattern: new RegExp(/\d+/g),
                                        message: "Wrong format!"
                                    },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Contact Email"
                                name="contactemail"
                                rules={[
                                    {
                                        required: false,
                                        type: "email",
                                        message: "Wrong format!"
                                    },
                                ]}

                            >
                                <Input email/>
                            </Form.Item>

                            <Form.Item
                                label="Contact Skype"
                                name="contactSkype"
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label="WebSite"
                                name="website"
                            >
                                <Input/>
                            </Form.Item>
                        </Col>


                    </Row>
                    <Row  justify={'center'} gutter={10}>
                        <Col className="gutter-row" lg={15} md={12} sm={14} xs={24}>

                            <Form.Item >
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
                        </Col>
                    </Row>

                </ARMForm>
                {/*    </Col>*/}
                {/*</Row>*/}
            </ARMCard>
        </CommonLayout>
    );
};

export default ExternalDepartment;