import React, {useEffect} from "react";
import {
    Col,
    Form,
    Input,
    Row,
    Select,
    Space,
    Breadcrumb,
    notification, Empty, Pagination,
} from "antd";
import ARMTable from "../../common/ARMTable";
import CommonLayout from "../../layout/CommonLayout";
import ARMCard from "../../common/ARMCard";
import ARMButton from "../../common/buttons/ARMButton";
import {Link} from "react-router-dom";
import {getLinkAndTitle} from "../../../lib/common/TitleOrLink";
import {Option} from "antd/es/mentions";

import {
    FilterOutlined,
    RollbackOutlined,

} from "@ant-design/icons";

import ActiveInactive from "../../common/ActiveInactive";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import AirportService from "../../../service/AirportService";
import {getErrorMessage} from "../../../lib/common/helpers";
import ResponsiveTable from "../../common/ResposnsiveTable";
import ViewButton from "../../common/buttons/ViewButton";
import EditButton from "../../common/buttons/EditButton";
import ARMForm from "../../../lib/common/ARMForm";
import {usePaginate} from "../../../lib/hooks/paginations";
import ActiveInactiveButton from "../../common/buttons/ActiveInactiveButton";

const Airports = () => {

    const {
        form,
        collection,
        page,
        totalPages,
        totalElements,
        paginate,
        isActive,
        setIsActive,
        fetchData,
        refreshPagination,
        resetFilter,
        size
    } = usePaginate('airports', 'airport/search/')

    console.log('collection', collection)

    useEffect(() => {
        fetchData()

    }, []);

    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        {' '}
                        <Link to="/planning">
                            {' '}
                            <i className="fas fa-chart-line"/> &nbsp;Planning
                        </Link>
                    </Breadcrumb.Item>

                    <Breadcrumb.Item>Airports</Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={getLinkAndTitle("AIRPORT", "/planning/airports/add", true)}
            >
                <ARMForm initialValues={{pageSize: 10}}

                         onFinish={fetchData} form={form}>
                    <Row gutter={20}>
                        <Col xs={24} md={12} lg={6}>
                            <Form.Item label="" name="name">
                                <Input placeholder="Enter Airport Name"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12} lg={6}>
                            <Form.Item label="" name="iataCode">
                                <Input placeholder="Enter IATA Code"/>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12} lg={6}>
                            <Form.Item name="size"
                                       label="Page Size"
                                       initialValue="10">
                                <Select id="antSelect">
                                    <Option value="10">10</Option>
                                    <Option value="20">20</Option>
                                    <Option value="30">30</Option>
                                    <Option value="40">40</Option>
                                    <Option value="50">50</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12} lg={6}>
                            <Form.Item>
                                <Space>
                                    <ARMButton size="middle" type="primary" htmlType="submit">
                                        <FilterOutlined/> Filter
                                    </ARMButton>
                                    <ARMButton
                                        size="middle"
                                        type="primary"
                                        htmlType="submit"
                                        onClick={resetFilter}
                                    >
                                        <RollbackOutlined/> Reset
                                    </ARMButton>
                                </Space>
                            </Form.Item>
                        </Col>
                    </Row>
                </ARMForm>
                <ActiveInactive isActive={isActive} setIsActive={setIsActive}/>

                <Row className="table-responsive">
                    <ResponsiveTable>
                        <ARMTable>
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>IATA Code</th>
                                <th>Country Code</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {collection?.map((airport, index) => (
                                <tr key={index}>
                                    <td>{airport.name}</td>
                                    <td> {airport.iataCode}</td>
                                    <td> {airport.countryCode}</td>
                                    <td>
                                        <Space size="small">
                                            <Link to={`view/${airport.id}`}>
                                                <ViewButton/>
                                            </Link>
                                            <Link to={`edit/${airport.id}`}>
                                                <EditButton/>
                                            </Link>

                                            <ActiveInactiveButton
                                                isActive={isActive}
                                                handleOk={async () => {
                                                    try {
                                                        await AirportService.toggleStatus(airport.id);
                                                        notification['success']({message: "Status Changed Successfully!"});
                                                        refreshPagination();
                                                    } catch (e) {
                                                        notification['error']({message: getErrorMessage(e)});
                                                    }
                                                }}
                                            />
                                        </Space>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </ARMTable>
                    </ResponsiveTable>
                </Row>

                <Row>
                    <Col style={{margin: '0 auto'}}>
                        {collection.length === 0 ? (
                            <Row justify="end">
                                <tbody>
                                <Empty style={{marginTop: "10px"}}/>
                                </tbody>
                            </Row>
                        ) : null}
                    </Col>
                </Row>
                <Row justify="center">
                    <Col style={{marginTop: 10}}>
                        <Pagination showSizeChanger={false} onShowSizeChange={console.log} pageSize={size}
                                    current={page} onChange={paginate}
                                    total={totalElements}/>
                    </Col>
                </Row>

            </ARMCard>
        </CommonLayout>
    );
};

export default Airports;
