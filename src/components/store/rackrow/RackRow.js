import {React, useState, useEffect} from 'react';
import {Breadcrumb, Col, Form, Input, InputNumber, notification, Row, Select, Space} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import {getLinkAndTitle} from "../../../lib/common/TitleOrLink";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";
import {getRackList} from "../../../store/actions/rack.action";
import {useActiveInactive} from "../../../lib/hooks/active-inactive";
import {getRoomList} from "../../../store/actions/room.action";
import ARMForm from "../../../lib/common/ARMForm";
import RackService from "../../../service/RackService";
import RackRowService from "../../../service/RackRowService";

const RackRow = () => {
    const rooms = useSelector((state) => state.rooms.model);
    const racks = useSelector((state) => state.racks.model);
    const stores = useSelector((state) => state.stores.model);
    const [form] = Form.useForm();
    const {Option} = Select;
    const navigate=useNavigate()
    const [singleRackRow, setSingleRackRow] = useState();
    const [storeVal, setStoreVal] = useState('');
    let {id} = useParams();
    const layout = {
        labelCol: {
            span: 8,
        }, wrapperCol: {
            span: 16,
        },
    };
    const onFinish = async (values) => {
        if (id) {
            try {
                await RackRowService.updateRackRow(id, values);
                notification["success"]({
                    message: "Rack Row successfully updated",
                });
                navigate(-1)
            } catch (er) {
                notification["error"]({
                    message: er.response.data.apiErrors[0].message,
                });
            }
        } else {
            await RackRowService.SaveRackRow(values)
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
    }
    const loadSingleRackRow = async () => {
        try {
            const {data} = await RackRowService.singleRackRow(id);
            form.setFieldsValue({...data});
            setSingleRackRow({...data});
        } catch (er) {
            console.log(er);
        }
    };
    useEffect(() => {
        if (!id) return form.resetFields();
        loadSingleRackRow();
    }, [id]);

    const onReset = () => {

        if (id)
        {
            form.setFieldsValue({...singleRackRow});
        } else {
            form.resetFields()
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    useEffect(() => {
        if (!id) return form.resetFields();
    }, [id]);




    return (<CommonLayout>
        <ARMBreadCrumbs>
            <Breadcrumb separator="/">
                <Breadcrumb.Item>
                    {" "}
                    <Link to="/store/">
                        {" "}
                        <i className="fas fa-archive"/> &nbsp;Store
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {" "}
                    <Link to="/store/rack-row">
                        {" "}
                        Rack Row
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {" "}
                    {id ? 'Update' : "Add"}
                </Breadcrumb.Item>
            </Breadcrumb>
        </ARMBreadCrumbs>
        <ARMCard title={getLinkAndTitle(id ? "Update Rack Row" : "Add Rack Row", "/store/rack-row")}>
            <Row>
                <Col sm={20} md={10}>
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
                        <Form.Item
                            label="Code"
                            name="code"

                            rules={[{
                                required: true, message: "Please input the code!",
                            },]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            name="storeId"
                            label="Store"

                            rules={[{
                                required: true, message: "Please select store!",
                            },]}
                        >
                            <Select allowClear placeholder="Select a store" onChange={(e)=>setStoreVal(e)}>
                                {stores.map((store, key) => (<Option key={key} value={store.id}>
                                    {store.code}
                                </Option>))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="roomId"
                            label="Room"

                            rules={[{
                                required: true, message: "Please select room !",
                            },]}
                        >
                            <Select allowClear placeholder="Select a room">
                                {rooms.map((room, key) => (


                                        (storeVal===room.storeId)?
                                    <Option key={room.id}  value={room.id}>{room.code} </Option>:null




                               ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="rackId"
                            label="Rack"

                            rules={[{
                                required: true, message: "Please select Rack !",
                            },]}
                        >
                            <Select allowClear placeholder="Select a rack">
                                {racks.map((room, key) => (<Option key={key} value={room.id}>
                                    {room.code}
                                </Option>))}
                            </Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
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
                    </ARMForm>
                </Col>
            </Row>
        </ARMCard>
    </CommonLayout>);
};

export default RackRow;