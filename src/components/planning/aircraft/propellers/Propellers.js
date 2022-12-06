import React, {useEffect, useState} from 'react';
import CommonLayout from "../../../layout/CommonLayout";
import ARMBreadCrumbs from "../../../common/ARMBreadCrumbs";
import {Breadcrumb, Col, DatePicker, Empty, Form, Input, notification, Popconfirm, Row, Select, Space} from "antd";
import {Link, useParams} from "react-router-dom";
import ARMCard from "../../../common/ARMCard";
import {getLinkAndTitle} from "../../../../lib/common/TitleOrLink";
import ARMForm from "../../../../lib/common/ARMForm";
import {Option} from "antd/es/mentions";
import ARMButton from "../../../common/buttons/ARMButton";
import {
    EditOutlined,
    EyeOutlined,
    FilterOutlined,
    LockOutlined,
    RollbackOutlined,
    UnlockOutlined
} from "@ant-design/icons";
import ActiveInactive from "../../../common/ActiveInactive";
import ARMTable from "../../../common/ARMTable";
import {useDispatch} from "react-redux";
import {getErrorMessage} from "../../../../lib/common/helpers";
import {setPagination} from "../../../../reducers/paginate.reducers";
import PropellerServices from "../../../../service/PropellerServices";
import fileDownload from "js-file-download";

const pdfColumn = [
    {title: 'partNo', field: 'partNo'},
    {title: 'serialNo', field: 'serialNo'},

];

const Propellers = () => {
    const [form] = Form.useForm();

    const id = useParams()
    const dispatch = useDispatch()

    const [propellers, setPropellers] = useState([])
    const [isActive, setIsActive] = useState(true)

    console.log('propellerComponents', propellers)


    useEffect(() => {
        getAllPropellers().catch(console.error)
    }, [])

    useEffect(() => {
        getAllPropellers().catch(console.error)
    }, [isActive])

    const getAllPropellers = async () => {
        try {
            let {data} = await PropellerServices.getPropellers(isActive)
            setPropellers(data.model)
        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }

    const onReset = () => {
        form.resetFields();
    };

    // handle status

    const handleStatus = async (id, status) => {
        try {
            const {data} = await PropellerServices.toggleStatus(id, status);
            await getAllPropellers();
            notification["success"]({
                message: "Status changed successfully!",
            });
        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }
    // search
    const onFinish = async (values) => {

        console.log(values.serialNo)
        const modifiedValues = {
            ...values,
            estimatedStartDate: values['estimatedStartDate'].format('YYYY-MM-DD'),
            estimatedEndDate: values['estimatedEndDate'].format('YYYY-MM-DD'),
        };
        const value = {
            isActive: isActive,
            nomenClature: modifiedValues ? modifiedValues.nomenClature : "",
            partNo: modifiedValues ? modifiedValues.partNo : "",
            serialNo: modifiedValues ? modifiedValues.serialNo : "",
            aircraftIds: modifiedValues ? modifiedValues.aircraftIds : [],
            estimatedStartDate: modifiedValues ? modifiedValues.estimatedStartDate : "",
            estimatedEndDate: modifiedValues ? modifiedValues.estimatedEndDate : "",

        }

        try {
            const {data} = await PropellerServices.searchPropeller(value);
            setPropellers(data.model);
            dispatch(setPagination(data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        downloadPDF().catch(console.error)
    }, [id])


    // download report functionality
    const downloadPDF = async (id) => {
        try {
            const {data} = await PropellerServices.propellerReportPDFDownload(id)
            ;
            fileDownload(data, 'propellerReportDownload.pdf');
            notification["success"]({
                message: "Pdf downloading!",
            });
        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    };


    //
    // const handlePdf = () => {
    //     const doc = new jsPDF('landscape');
    //     doc.text('Availability Tracking', 15, 10);
    //     doc.autoTable({
    //         columns: pdfColumn.map((item) => ({
    //             ...item,
    //             dataKey: item.field,
    //         })),
    //         body: propellers,
    //         theme: 'grid',
    //     });
    //     doc.getFontSize(9);
    //     doc.save('AvailabilityTracking.pdf');
    // };
    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item> <Link to='/planning'> <i className="fas fa-chart-line"/> &nbsp;Planning
                    </Link></Breadcrumb.Item>

                    <Breadcrumb.Item>
                        Propellers
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard
                title={
                    getLinkAndTitle(' Propellers', '/planning/propellers/add', true)
                }
            >
                <ARMForm
                    initialValues={{pageSize: 10}}
                    onFinish={onFinish} form={form}
                > <Row gutter={20}>
                    <Col xs={24} md={12} lg={5}>
                        <Form.Item label="" name="nomenClature">
                            <Input placeholder="Enter NomenClature"/>
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={5}>
                        <Form.Item
                            name="estimatedStartDate"
                            rules={[
                                {
                                    required: false,
                                    message: "Please input a Date",
                                },
                            ]}

                        >
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>

                    </Col>
                    <Col xs={24} md={12} lg={5}>
                        <Form.Item
                            name="estimatedEndDate"
                            rules={[
                                {
                                    required: false,
                                    message: "Please input a Date",
                                },
                            ]}

                        >
                            <DatePicker style={{width: '100%'}}/>
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12} lg={4}>
                        <Form.Item name="pageSize" label="Page Size">
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
                                    onClick={onReset}
                                >
                                    <RollbackOutlined/> Reset
                                </ARMButton>
                            </Space>
                        </Form.Item>

                        {/*<td>*/}
                        {/*    <Form.Item>*/}

                        {/*        <ARMButton*/}
                        {/*            size="middle"*/}
                        {/*            type="primary"*/}
                        {/*            onClick={downloadPDF(1)}*/}
                        {/*        >Report*/}
                        {/*        </ARMButton>*/}
                        {/*    </Form.Item>*/}
                        {/*</td>*/}

                    </Col>
                </Row>
                </ARMForm>
                <ActiveInactive isActive={isActive} setIsActive={setIsActive}/>

                <Row className='table-responsive'>
                    <ARMTable>
                        <thead>

                        </thead>
                        <tbody>
                        <tr>
                            <th rowSpan={2}>Nomenclature</th>
                            <th rowSpan={2}>Part No</th>
                            <th rowSpan={2}>Serial No</th>
                            <th colSpan={3}>Installation</th>
                            <th colSpan={2}>Current</th>
                            <th colSpan={2}>Life Limit</th>
                            <th rowSpan={2}>Estimated Date</th>
                            <th rowSpan={2}>Action</th>
                        </tr>
                        <tr>
                            <th>Date</th>
                            <th>TSN</th>
                            <th>TSO</th>
                            <th>TSN</th>
                            <th>TSO</th>
                            <th>Moth</th>
                            <th>FH</th>

                        </tr>
                        {
                            propellers?.map((propeller, index) => (

                                <tr key={index}>
                                    <td>  {propeller.nomenClature}</td>
                                    <td> {propeller.partNo}</td>
                                    <td> {propeller.serialNo}</td>
                                    <td> {propeller.installationDate}</td>
                                    <td> {propeller.installationTsn}</td>
                                    <td> {propeller.installationTso}</td>
                                    <td> {propeller.currentTsn}</td>
                                    <td> {propeller.currentTso}</td>
                                    <td> {propeller.limitMonth}</td>
                                    <td> {propeller.limitFh}</td>
                                    <td> {propeller.estimatedDate}</td>

                                    <td>
                                        <Space size='small'>

                                            <Link to={`view/${propeller.id}`}>
                                                <ARMButton type="primary" size="small" style={{
                                                    backgroundColor: '#4aa0b5',
                                                    borderColor: '#4aa0b5',

                                                }}>
                                                    <EyeOutlined/>
                                                </ARMButton>
                                            </Link>
                                            <Link to={`edit/${propeller.id}`}>
                                                <ARMButton type="primary" size="small" style={{
                                                    backgroundColor: '#6e757c',
                                                    borderColor: '#6e757c',

                                                }}>
                                                    <EditOutlined/>

                                                </ARMButton>
                                            </Link>


                                            <Popconfirm title="Are you Sure?" okText="Yes" cancelText="No"
                                                        onConfirm={() => handleStatus(propeller.id, !propeller.isActive)}
                                                        placement="topRight"
                                            >
                                                {
                                                    propeller.isActive ?

                                                        <ARMButton type="primary" size="small" style={{
                                                            backgroundColor: '#53a351',
                                                            borderColor: '#53a351',
                                                        }}>
                                                            <UnlockOutlined/>
                                                        </ARMButton>

                                                        :
                                                        <ARMButton type="primary" size="small" danger>
                                                            <LockOutlined/>

                                                        </ARMButton>

                                                }
                                            </Popconfirm>
                                        </Space>


                                    </td>
                                </tr>
                            ))


                        }
                        </tbody>
                    </ARMTable>
                </Row>

                <Row>
                    <Col style={{margin: '0 auto'}}>
                        {propellers?.length === 0 ? (
                            <Row justify="end">
                                <tbody>
                                <Empty style={{marginTop: "10px"}}/>
                                </tbody>
                            </Row>
                        ) : null}
                    </Col>
                </Row>

            </ARMCard>
        </CommonLayout>
    );
};

export default Propellers;
