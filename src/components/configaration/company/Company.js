import { UploadOutlined } from "@ant-design/icons";
import {
    Col,
    Row,
    Form,
    Input,
    Select,
    Upload,
    notification,
    Space,
    Breadcrumb,
} from "antd";

import CommonLayout from "../../layout/CommonLayout";
import CompanyService from "../../../service/CompanyService";
import ARMCard from "../../common/ARMCard";
import ARMButton from "../../common/buttons/ARMButton";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMForm from "../../../lib/common/ARMForm";
import CountryService from "../../../service/CountryService";
import { getErrorMessage } from "../../../lib/common/helpers";
import CityService from "../../../service/CityService";

export const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

const Company = () => {
    const [form] = Form.useForm();
    const { Option } = Select;
    const [singleCompany, setSingleCompany] = useState();
    const [country, setCountry] = useState([])
    const [city, setCity] = useState([])
    let { id } = useParams();
    const normFile = (e) => {
        console.log("Upload event:", e);

        if (Array.isArray(e)) {
            return e;
        }

        return e?.fileList;
    };

    const currencies = [
        {
            name: "BDT",
            value: "BDT",
        },
        {
            name: "EUR",
            value: "EUR",
        },
        {
            name: "USD",
            value: "USD",
        },
        {
            name: "RUPEE",
            value: "RUPEE",
        },
        {
            name: "GBP",
            value: "GBP",
        },
        {
            name: "SGD",
            value: "SGD",
        },
    ];
    const onFinish = async (values) => {
        if (id) {
            try {

                await CompanyService.updateCompany(id, values);

                notification["success"]({
                    message: "Company successfully updated",
                });
            } catch (er) {
                notification["error"]({
                    message: er.response.data.apiErrors[0].message,
                });
            }
        } else {
            await CompanyService.SaveCompany(values)
                .then((response) => {
                    console.log("response.status", response);
                    if (response.status === 200) {
                        notification["success"]({
                            message: "Successfully Created",
                        });

                        form.resetFields();
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
    const onReset = () => {


        if (id) {
            form.setFieldsValue({ ...singleCompany });
        } else {
            form.resetFields()
        }
    };
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const loadSingleCompany = async () => {
        try {
            const { data } = await CompanyService.singleCompany(id);
            console.log("data", data);
            form.setFieldsValue({
                ...data
            });
            setSingleCompany({ ...data });
        } catch (er) {
            console.log(er);
        }
    };
    const getCountry = async () => {
        try {

            let { data } = await CountryService.getAllCountry(30, {
                query: '',
                isActive: true,
            })
            setCountry(data.model)
        } catch (er) {
            notification["error"]({ message: getErrorMessage(er) });
        }
    }
    const getCity = async () => {
        try {

            let { data } = await CityService.getAllCity(30, {
                query: '',
                isActive: true,
            })
            setCity(data.model)
        } catch (er) {
            notification["error"]({ message: getErrorMessage(er) });
        }
    }
    useEffect(() => {
        getCountry().catch(console.error)
        getCity().catch(console.error)
    }, []);

    useEffect(() => {
        if (!id) return form.resetFields();
        loadSingleCompany();
    }, [id]);

    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        {" "}
                        <Link to="/configurations">
                            {" "}
                            <i className="fas fa-cog ant-menu-item-icon" />{" "}
                            &nbsp;Configurations
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {" "}
                        <Link to="/configurations/companies"> Companies</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {" "}
                        <Link to={id ? `/configurations/companies/add/${id}` : "/configurations/companies/add"}>
                            {id ? "Update" : "Add"}
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: "flex",
                }}
            >
                <ARMCard
                    title={getLinkAndTitle(id ? "Update Company" : "Add Company", "/configurations/companies")}
                >
                    <ARMForm
                        form={form}
                        name="basic"
                        {...layout}
                        initialValues={{}}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        style={{
                            backgroundColor: "#ffffff",
                        }}
                    >
                        <Row justify="center" gutter={10}>
                            <Col className="gutter-row" lg={12} md={24} sm={24} xs={24}>
                                <Form.Item

                                    label="Name"
                                    name="companyName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your name!",
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Address Line 1"
                                    name="addressLineOne"
                                    rules={[
                                        {
                                            required: false,
                                            message: "Please input Address Line 1",
                                        },
                                    ]}

                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Address Line 2"
                                    name="addressLineTwo"
                                    rules={[
                                        {
                                            required: false,
                                            message: "Please input Address Line 2",
                                        },
                                    ]}

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Address Line 3"
                                    name="addressLineThree"
                                    rules={[
                                        {
                                            required: false,
                                            message: "Please input Address Line 3",
                                        },
                                    ]}

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Country"
                                    name="country"
                                    rules={[
                                        {
                                            required: false,
                                            message: "Please input Address Line 3",
                                        },
                                    ]}

                                >
                                    <Select
                                        placeholder="--Select Country--"
                                    >
                                        {
                                            country?.map((data) => (
                                                <Option key={data.id} value={data.id}>{data.name}</Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="City"
                                    name="city"
                                    rules={[
                                        {
                                            required: false,
                                            message: "Please input Address Line 3",
                                        },
                                    ]}

                                >
                                    <Select

                                        placeholder="--Select City--"
                                    >
                                        {
                                            city?.map((data) => (
                                                <Option key={data.id} value={data.id}>{data.name}</Option>
                                            ))
                                        }

                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    name="phone"
                                    label="Phone Number"

                                >
                                    <Input style={{ width: "100%" }} />
                                </Form.Item>

                                <Form.Item
                                    name="fax"
                                    label="Fax"

                                >
                                    <Input />
                                </Form.Item>


                            </Col>
                            <Col className="gutter-row" lg={12} md={24} sm={24} xs={24}>
                                <Form.Item
                                    name="email"
                                    label="Email"
                                    rules={[{ type: "email" }]}

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="contactPerson"
                                    label="Contact Person"

                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    name="baseCurrency"
                                    label="Base Currency"

                                >
                                    <Select
                                        allowClear

                                        placeholder="Please select a value"
                                    >
                                        {currencies.map((currency, key) => (
                                            <Option key={key} value={currency.name}>
                                                {currency.value}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="localCurrency"
                                    label="Local Currency"

                                >
                                    <Select

                                        allowClear
                                        placeholder="Please select a value"
                                    >
                                        {currencies.map((currency, key) => (
                                            <Option key={key} value={currency.name}>
                                                {currency.value}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="shipmentAddressOne"
                                    label="Shipment Address 1"

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="shipmentAddressTwo"
                                    label="Shipment Address 2"

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="shipmentAddressThree"
                                    label="Shipment Address 3"

                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="companyUrl"
                                    label="Company URL"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                        {
                                            type: "url",
                                            warningOnly: true,
                                        },
                                        {
                                            type: "string",
                                            min: 6,
                                        },
                                    ]}

                                >
                                    <Input />
                                </Form.Item>

                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col className="gutter-row" lg={16} md={16} sm={24} xs={24}>
                                <Form.Item>
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
                </ARMCard>
            </Space>
        </CommonLayout>
    );
};

export default Company;
