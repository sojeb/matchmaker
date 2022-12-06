import React, {useState, useEffect} from 'react';
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
import WorkshopService from "../../../service/WorkshopService";
import {getErrorMessage} from "../../../lib/common/helpers";
import workflowActionService from "../../../service/WorkflowActionService";
import ActiveInactiveButton from "../../common/buttons/ActiveInactiveButton";
import {useDispatch, useSelector} from "react-redux";
import {getWorkflowList} from "../../../store/actions/workflow.action";


const WorkflowActionList = () => {
    const workflows = []
    const [isActive, setIsActive] = useState(true);

    const dispatch= useDispatch()
    const workflowList = useSelector((state) => state.workflow.model);
    const handleStatus = async (id, status) => {
        try {
            const {data} = await workflowActionService.toggleStatus(id, status);
            dispatch( getWorkflowList(status))
            notification["success"]({
                message: "Status changed successfully!",
            });
        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }

    useEffect(() => {
       dispatch(getWorkflowList(true))
    }, [])
    useEffect(() => {
      dispatch( getWorkflowList(true))
    }, [isActive])

    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item> <Link to='/configurations'> <i
                        className="fas fa-cog ant-menu-item-icon"/> &nbsp;Configarations
                    </Link></Breadcrumb.Item>

                    <Breadcrumb.Item>
                        Workflow Actions
                    </Breadcrumb.Item>


                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard title={
                getLinkAndTitle('Workflow Actions LIST', '/configurations/workflow-actions/add', 'addBtn')
            }>
                <ActiveInactive isActive={isActive} setIsActive={setIsActive}/>
                <Row className="table-responsive">
                    <ARMTable
                        scroll={{
                            x: 500,
                            y: 300,
                        }}
                    >
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Ordering</th>
                            <th>Action</th>

                        </tr>
                        </thead>
                        <tbody>
                        {workflowList.map((workflow, index) => (
                            <tr key={index}>
                                <td>{workflow.name}</td>
                                <td>{workflow.orderNumber}</td>


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
                                            <EyeOutlined/>
                                        </ARMButton>
                                        <ARMButton
                                            type="primary"
                                            size="small"
                                            style={{
                                                backgroundColor: "#6e757c",
                                                borderColor: "#6e757c",
                                            }}
                                        >
                                            <Link to={`/configurations/workflow-actions/add/${workflow.id}`}>
                                                <EditOutlined/>
                                            </Link>
                                        </ARMButton>

                                        <ActiveInactiveButton
                                            title="Are you Sure?" okText="Yes" cancelText="No"
                                            handleOk={() => handleStatus(workflow.id, !isActive)}
                                        >
                                            {
                                                isActive ?
                                                    <ARMButton type="primary" size="small" style={{
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

                                        </ActiveInactiveButton>
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

export default WorkflowActionList;