import React, {useState,useEffect,useCallback} from 'react';
import CommonLayout from "../../layout/CommonLayout";
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
import {useActiveInactive} from "../../../lib/hooks/active-inactive";

import RackRowBinService from "../../../service/RackRowBinService";
import {getErrorMessage} from "../../../lib/common/helpers";
import {useDispatch, useSelector} from "react-redux";
import {getRackRowBinList} from "../../../store/actions/RackRowBin.action";

const RackRowBinList = () => {
    const racksrowbin = useSelector((state) => state.rackrowBin.model);
    const { Option } = Select;
    const dispatch = useDispatch();
    const { isActive, setIsActive} = useActiveInactive(getRackRowBinList)



    const handleStatus = useCallback(async (id, status) => {
        try {
            const {data} = await RackRowBinService.toggleStatus(id, status);
            dispatch(getRackRowBinList(isActive))
            notification["success"]({
                message: "Status changed successfully!",
            });
        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }, [isActive])



    useEffect(() => {
        dispatch(getRackRowBinList(isActive))
    }, []);
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
                    <Breadcrumb.Item> &nbsp;Rack Row Bins</Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={getLinkAndTitle("RACK ROW BIN LIST", "/store/rack-row-bin/add", "addBtn")}
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
                            <th>Rack Row Bin</th>

                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {racksrowbin.map((rackrowbin, index) => (
                            <tr key={index}>
                                <td>{rackrowbin.code}</td>
                                <td>{rackrowbin.rackRowBinId}</td>

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
                                            <Link to={`/store/rack-row-bin/add/${rackrowbin.id}`}>
                                                <EditOutlined />
                                            </Link>
                                        </ARMButton>

                                        <Popconfirm
                                            title="Are you Sure?" okText="Yes" cancelText="No"
                                            onConfirm={() => handleStatus(rackrowbin.id, !isActive)}
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

export default RackRowBinList;