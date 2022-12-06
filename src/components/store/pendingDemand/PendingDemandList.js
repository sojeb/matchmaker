import { EditOutlined, EyeOutlined, FilterOutlined, LockOutlined, RollbackOutlined, UnlockOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Form, Input, notification, Popconfirm, Row, Select, Space } from "antd";
import React, {useCallback, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { getErrorMessage } from "../../../lib/common/helpers";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import ItemDemandService from "../../../service/ItemDemandService";
import ActiveInactive from "../../common/ActiveInactive";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMTable from "../../common/ARMTable";
import ARMButton from "../../common/buttons/ARMButton";
import ResponsiveTable from "../../common/ResposnsiveTable";
import CommonLayout from "../../layout/CommonLayout";
const {Option} = Select;

const PendingDemandList = () => {

    const [isActive, setIsActive] = useState(true);
    const [demandPending, setDemandPending] = useState([]);


    const getItemDemand=async(isActive)=>{
      try {

        let { data } = await ItemDemandService.getAllItemDemand(isActive)
        console.log("demanddd",data.model)
        setDemandPending(data.model)
        Form.resetFields()
        notification["success"]({
          message: "Successfully added!",
        });
  
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    }
    useEffect(() => {
      getItemDemand(isActive).catch(console.error)
    }, [isActive])

    const handleStatus = async (id, status) => {
        try {
            const {data} = await ItemDemandService.toggleStatus(id, status);
           
            notification["success"]({
                message: "Status changed successfully!",
            });
        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }

    return (
        <CommonLayout>

            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        <i className="fas fa-archive" />
                        <Link to='/store'>
                            &nbsp; Store
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                           Pending Demands
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>

                <ARMCard title={
                    getLinkAndTitle('Pending Demand LIST', '/store/item-demand','addBtn')
                  }
                >
                    <Form initialValues={{pageSize: 10}}
                        /*onFinish={onFinish} form={form}*/>
                        <Row gutter={20}>
                            <Col xs={24} md={12} lg={6}>
                                <Form.Item label="" name="name">
                                    <Input placeholder="Enter search text..."/>
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={12} lg={6}>
                                <Form.Item name="pageSize" label="Page Size" >
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
                                            /*onClick={onReset}*/
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
                                <th rowSpan={2}>Demand No</th>
                                <th rowSpan={2}>Priority</th>
                                <th colSpan={6}>Status</th>
                                <th rowSpan={4}>Actions</th>
                            </tr>
                            <tr>
                            <th>preparedBy</th>
                            <th>submittedBy</th>
                            <th>status</th>
                            <th>reviewedBy</th>
                            <th>acceptedBy</th>
                            <th>approvedBy</th>

                        </tr>
                            </thead>
                            <tbody>
                            {
                                demandPending?.map((data, index) => (
                                    <tr key={data.id}>
                                        <td>{data.demandNo}</td>
                                        <td>{data.priority}</td>
                                        <td>{data.priority}</td>
                                        <td>{data.priority}</td>
                                        <td>{data.priority}</td>
                                        <td>{data.priority}</td>
                                        <td>{data.priority}</td>
                                        <td>{data.priority}</td>
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
                                                    to={`/store/item-demand/${data.id}`}
                                                >
                                                <ARMButton type="primary" size="small" style={{
                                                    backgroundColor: '#6e757c',
                                                    borderColor: '#6e757c',

                                                }}>
                                                <EditOutlined />
                                                </ARMButton>
                                            </Link>
                                                <Popconfirm
                                                    title="Are you Sure?" okText="Yes" cancelText="No"
                                                    onConfirm={() => handleStatus(data.id,!isActive)}
                                                >
                                                    {
                                                        isActive ?
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
                    </ResponsiveTable>
                </ARMCard>
        </CommonLayout>
    )
}
export default PendingDemandList