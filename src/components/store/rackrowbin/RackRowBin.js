import {React, useState,useEffect} from 'react';
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import {Breadcrumb, Col, Form, Input, notification, Row, Select, Space} from "antd";
import {Link, useNavigate, useParams} from "react-router-dom";
import ARMCard from "../../common/ARMCard";
import {getLinkAndTitle} from "../../../lib/common/TitleOrLink";
import ARMForm from "../../../lib/common/ARMForm";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";
import {useSelector} from "react-redux";
import RackRowBinService from "../../../service/RackRowBinService";



const RackRowBin = () => {
    const rooms = useSelector((state) => state.rooms.model);
    const racks = useSelector((state) => state.racks.model);
    const stores = useSelector((state) => state.stores.model);
    const rackrows = useSelector((state) => state.rackrow.model);
    console.log('Rack Rows',rackrows)
    const [form] = Form.useForm();
    const {Option} = Select;
    const [singleRackRowBin, setSingleRackRowBin] = useState();
    const [storeVal, setStoreVal] = useState('');
    let {id} = useParams();
    const navigate=useNavigate()
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
                await RackRowBinService.updateRackRowBin(id, values);
                // getAllCompanies();

                notification["success"]({
                    message: "Rack Row Bin successfully updated",
                });
                navigate(-1)
                // dispatch(getRackList(true))
            } catch (er) {
                notification["error"]({
                    message: er.response.data.apiErrors[0].message,
                });
            }
        } else {
            await RackRowBinService.SaveRackRowBin(values)
                .then((response) => {
                    if (response.status === 200) {

                        notification["success"]({
                            message: "Successfully Created",
                        });

                        form.resetFields();
                        navigate(-1)
                        // dispatch(getRackList(true))
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
    const loadSingleRackRowBin = async () => {
        try {
            const {data} = await RackRowBinService.singleRackRowBin(id);
            form.setFieldsValue({...data});
            setSingleRackRowBin({...data});
        } catch (er) {
            console.log(er);
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };
    useEffect(() => {
        if (!id) return form.resetFields();
        loadSingleRackRowBin();
    }, [id]);
    const onReset = () => {

        if (id)
        {
            form.setFieldsValue({...singleRackRowBin});
        } else {
            form.resetFields()
        }
    };
    return (
        <CommonLayout>
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
                        <Link to="/store/rack-row-bin">
                            {" "}
                            Rack Row Bins
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {" "}
                        {id ? 'Update' : "Add"}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>
            <ARMCard title={getLinkAndTitle(id ? "Update Rack Row bin" : "Add Rack Row bin", "/store/rack-row-bin")}>
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
                                <Select allowClear placeholder="Select a store" onChange={(e) => setStoreVal(e)}>
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


                                        (storeVal === room.storeId) ?
                                            <Option key={room.id} value={room.id}>{room.code} </Option> : null


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

                            <Form.Item
                                name="rackRowId"
                                label="Rack row"

                                rules={[{
                                    required: true, message: "Please select Rack Row !",
                                },]}
                            >
                                <Select allowClear placeholder="Select a rack row">
                                    {rackrows.map((room, key) => (<Option key={key} value={room.id}>
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
        </CommonLayout>
    );
};

export default RackRowBin;