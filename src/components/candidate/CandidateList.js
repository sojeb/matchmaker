import CommonLayout from "../layout/CommonLayout";
import {Breadcrumb, Col, Empty, Form, Input, notification, Pagination, Row, Select, Space} from "antd";
import ARMCard from "../common/ARMCard";
import ARMButton from "../common/buttons/ARMButton";
import ARMTable from "../common/ARMTable";
import {Link} from "react-router-dom";
import ModuleService from "../../service/ModuleService";
import {getErrorMessage} from "../../lib/common/helpers";
import React, {useEffect} from "react";
import {getLinkAndTitle} from "../../lib/common/TitleOrLink";
import ResponsiveTable from "../common/ResposnsiveTable";
import ActiveInactive from "../common/ActiveInactive";
import {
    EditOutlined,
    EyeOutlined,
    FilterOutlined,
    RollbackOutlined,
} from "@ant-design/icons";
import ARMBreadCrumbs from "../common/ARMBreadCrumbs";
import {usePaginate} from "../../lib/hooks/paginations";
import ActiveInactiveButton from "../common/buttons/ActiveInactiveButton";

const {Option} = Select;

const CandidateList = () => {

    useEffect(() => {
        fetchData()
    }, []);

    const {
        form,
        collection,
        page,
        totalElements,
        paginate,
        isActive,
        setIsActive,
        fetchData,
        refreshPagination,
        resetFilter,
        size,
    } = usePaginate('candidate', '/candidate/search');

    console.log("candidate list",collection)

    const handleStatus =  async (id) => {
        try {
            await ModuleService.toggleStatus(
                id,
                !isActive
            );
            notification['success']({
                message: 'Status Changed Successfully!',
            });
            refreshPagination();
        } catch (e) {
            notification['error']({
                message: getErrorMessage(e),
            });
        }
    }

    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        <i className="fas fa-user" />
                        <Link to='/candidate'>
                            &nbsp; Candidates
                        </Link>
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>

            <ARMCard title={
                getLinkAndTitle('Candidate list', '/candidate',true)
            }
            >
                <Form form={form} onFinish={fetchData}>
                    <Row gutter={20}>
                        <Col xs={24} md={12} lg={8}>
                            <Form.Item label="Serial No" name="query">
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12} lg={6}>
                            <Form.Item name="size" label="Page Size" initialValue="10">
                                <Select id="antSelect">
                                    <Option value="10">10</Option>
                                    <Option value="20">20</Option>
                                    <Option value="30">30</Option>
                                    <Option value="40">40</Option>
                                    <Option value="50">50</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12} lg={4}>
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
                </Form>

                <ActiveInactive isActive={isActive} setIsActive={setIsActive} />

                <ResponsiveTable>
                    <ARMTable>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Age</th>
                            <th>height</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            collection?.map((candidate, index) => (
                                <tr key={candidate.id}>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.age}</td>
                                    <td>{candidate.height}</td>
                                    <td>
                                        <Space size='small'>
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
                                            <Link
                                                to={`/configurations/module/${module.id}`}
                                            >
                                                <ARMButton type="primary" size="small" style={{
                                                    backgroundColor: '#6e757c',
                                                    borderColor: '#6e757c',

                                                }}>
                                                    <EditOutlined />
                                                </ARMButton>
                                            </Link>
                                            <ActiveInactiveButton
                                                isActive={isActive}
                                                handleOk={() => handleStatus(module.id)}
                                            />
                                        </Space>
                                    </td>
                                </tr>
                            ))
                        }

                        </tbody>
                    </ARMTable>
                </ResponsiveTable>
                {/*** for pagination ***/}
                <Row>
                    <Col style={{margin: '0 auto'}}>
                        {collection.length === 0 ? (
                            <Row justify="end">
                                <Empty style={{marginTop: "10px"}}/>
                            </Row>
                        ) : <Row justify="center">
                            <Col style={{marginTop: 10}}>
                                <Pagination
                                    showSizeChanger={false}
                                    onShowSizeChange={console.log}
                                    pageSize={size}
                                    current={page}
                                    onChange={paginate}
                                    total={totalElements}
                                />
                            </Col>
                        </Row>}
                    </Col>
                </Row>
            </ARMCard>
        </CommonLayout>
    )
}
export default CandidateList