import React,{useEffect,useCallback} from 'react';
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import {Breadcrumb, Col, Form, Input, notification, Popconfirm, Row, Select, Space} from "antd";
import {Link} from "react-router-dom";
import ARMCard from "../../common/ARMCard";
import {getLinkAndTitle} from "../../../lib/common/TitleOrLink";
import ARMButton from "../../common/buttons/ARMButton";
import {
    EditOutlined,
    EyeOutlined,
    FilterOutlined,
    LockOutlined,
    RollbackOutlined,
    UnlockOutlined
} from "@ant-design/icons";
import ActiveInactive from "../../common/ActiveInactive";
import ARMTable from "../../common/ARMTable";
import CommonLayout from "../../layout/CommonLayout";
import {useDispatch, useSelector} from "react-redux";
import {useActiveInactive} from "../../../lib/hooks/active-inactive";
import {getErrorMessage} from "../../../lib/common/helpers";
import {getExternalList} from "../../../store/actions/ExternalService.action";
import ExternalDepartmentService from "../../../service/ExternalDepartmentService";

const ExternalDepartmentList = () => {
    const externaldepartments = useSelector((state) => state.externaldept.model);
    const { Option } = Select;
    const dispatch = useDispatch();
    const { isActive, setIsActive} = useActiveInactive(getExternalList)

    const handleStatus = useCallback(async (id, status) => {
        try {
            const {data} = await ExternalDepartmentService.toggleStatus(id, status);
            dispatch(getExternalList(isActive))
            notification["success"]({
                message: "Status changed successfully!",
            });
        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }, [isActive])

    useEffect(() => {
        dispatch(getExternalList(isActive))
    }, []);

    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        {" "}
                        <Link to="/configurations">
                            {" "}
                            <i className="fas fa-cog" /> &nbsp; Configurations
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item> &nbsp;External Department</Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={getLinkAndTitle("External Department LIST", "/configurations/external-department/add", "addBtn")}
            >
                <Form initialValues={{ pageSize: 10 }}>
                    <Row gutter={20}>
                        <Col xs={24} md={6}>
                            <Form.Item>
                                <Input placeholder="Enter Search Text" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={4}>
                            <Form.Item
                                name="pageSize"
                                label="Page Size"
                                rules={[
                                    {
                                        message: "Field should not be empty",
                                    },
                                ]}
                            >
                                <Select id="antSelect">
                                    <Option value="10">10</Option>
                                    <Option value="20">20</Option>
                                    <Option value="30">30</Option>
                                    <Option value="40">40</Option>
                                    <Option value="50">50</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={8}>
                            <Form.Item>
                                <Space>
                                    <ARMButton size="middle" type="primary" htmlType="submit">
                                        <FilterOutlined /> Filter
                                    </ARMButton>
                                    <ARMButton size="middle" type="primary" htmlType="submit">
                                        <RollbackOutlined /> Reset
                                    </ARMButton>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>

                <ActiveInactive isActive={isActive} setIsActive={setIsActive}/>
                <Row className="table-responsive">
                    <ARMTable>
                        <thead>
                        <tr>
                            <th>Company Name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Office Phone</th>
                            <th>Contact Person</th>
                            <th>Contact Mobile</th>
                            <th>Contact Phone</th>
                            <th>Contact Email</th>
                            <th>Contact Skype</th>
                            <th>Website</th>
                            <th>Action</th>

                        </tr>
                        </thead>
                        <tbody>
                        {externaldepartments.map((externaldepartment, index) => (
                            <tr key={index}>
                                <td>{externaldepartment.companyName}</td>
                                <td>{externaldepartment.address}</td>
                                <td>{externaldepartment.cityId}</td>
                                <td>{externaldepartment.officePhone}</td>
                                <td>{externaldepartment.contactPerson}</td>
                                <td>{externaldepartment.contactMobile}</td>
                                <td>{externaldepartment.contactPhone}</td>
                                <td>{externaldepartment.contactemail}</td>
                                <td>{externaldepartment.contactSkype}</td>
                                <td>{externaldepartment.website}</td>

                                <td>
                                    <Space size="small">
                                        <ARMButton
                                            type="primary"
                                            size="small"
                                            style={{
                                                backgroundColor: "#4aa0b5",
                                                borderColor: "#4aa0b5",
                                            }}
                                        >
                                            <EyeOutlined />
                                        </ARMButton>
                                        <ARMButton
                                            type="primary"
                                            size="small"
                                            style={{
                                                backgroundColor: "#6e757c",
                                                borderColor: "#6e757c",
                                            }}
                                        >
                                            <Link to={`/store/external-department/add/${externaldepartment.id}`}>
                                                <EditOutlined />
                                            </Link>
                                        </ARMButton>

                                        <Popconfirm
                                            title="Are you Sure?" okText="Yes" cancelText="No"
                                            onConfirm={() => handleStatus(externaldepartment.id, !isActive)}
                                        >
                                            {
                                                isActive ?
                                                    <ARMButton type="primary" size="small"  style={{
                                                        backgroundColor: "#53a351",
                                                        borderColor: "#53a351",
                                                    }}>
                                                        <LockOutlined/>
                                                    </ARMButton>
                                                    :
                                                    <ARMButton type="primary" size="small" danger>
                                                        <UnlockOutlined/>
                                                    </ARMButton>

                                            }

                                        </Popconfirm>
                                    </Space>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </ARMTable>
                </Row>
            </ARMCard>
        </CommonLayout>
    );
};

export default ExternalDepartmentList;