import {
    EditOutlined,
    EyeOutlined,
    FilterOutlined, LockOutlined,
    RollbackOutlined,
    UnlockOutlined,
} from "@ant-design/icons";
import {
    Breadcrumb,
    Col,
    Form,
    Input,
    notification,
    Popconfirm,
    Row,
    Select,
    Space,
} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import { getRacks } from "../../../reducers/rack.reducers";
import RackService from "../../../service/RackService";
import ActiveInactive from "../../common/ActiveInactive";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMTable from "../../common/ARMTable";
import ARMButton from "../../common/buttons/ARMButton";
import { scrollToTop } from "../../configaration/company/Company";
import CommonLayout from "../../layout/CommonLayout";
import RoomService from "../../../service/RoomService";
import {getErrorMessage} from "../../../lib/common/helpers";
import {getRackList} from "../../../store/actions/rack.action";
import {useActiveInactive} from "../../../lib/hooks/active-inactive";
import RackRowService from "../../../service/RackRowService";
import {getRackRow} from "../../../reducers/rackRow.reducers";
import {getRackRowList} from "../../../store/actions/RackRow.action";

const RackRowList = () => {
    const rackrows = useSelector((state) => state.rackrow.model);
    console.log(rackrows)
    const { Option } = Select;
    const dispatch = useDispatch();
    const { isActive, setIsActive} = useActiveInactive(getRackRowList)
    const handleStatus = useCallback(async (id, status) => {
        try {
            const {data} = await RackRowService.toggleStatus(id, status);
            dispatch(getRackRowList(isActive))
            notification["success"]({
                message: "Status changed successfully!",
            });
        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }, [isActive])


    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        {" "}
                        <Link to="/store">
                            {" "}
                            <i className="fas fa-archive" /> &nbsp;Store
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item> &nbsp;Rack Rows</Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={getLinkAndTitle("RACK ROW LIST", "/store/rack-row/add", "addBtn")}
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
                            <th>Code</th>
                            <th>Rack</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rackrows.map((rackrow, index) => (
                            <tr key={index}>
                                <td>{rackrow.code}</td>
                                <td>{rackrow.rackId}</td>

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
                                            <Link to={`/store/rack-row/add/${rackrow.id}`}>
                                                <EditOutlined />
                                            </Link>
                                        </ARMButton>

                                        <Popconfirm
                                            title="Are you Sure?" okText="Yes" cancelText="No"
                                            onConfirm={() => handleStatus(rackrow.id, !isActive)}
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

export default RackRowList;
