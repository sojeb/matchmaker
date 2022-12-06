import { Breadcrumb, Col, Form, Input, notification, Row, Space } from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getLinkAndTitle } from '../../../lib/common/TitleOrLink';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMCard from '../../common/ARMCard';
import ARMButton from '../../common/buttons/ARMButton';
import CommonLayout from '../../layout/CommonLayout';
import ARMForm from '../../../lib/common/ARMForm'
import UnitofMeasurementService from '../../../service/UnitofMeasurementService';
import { getErrorMessage } from '../../../lib/common/helpers';
const UnitofMeasurement = () => {
    const {id} = useParams()
    const navigate  =useNavigate()
    const [form] = Form.useForm();
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    useEffect(() => {
        if (!id) {
            //form.resetFields()
            return
        }
        getAllUnitofMeasurementById().catch(console.error)

    }, [id])

    const  getAllUnitofMeasurementById = async () => {
        try {
            const {data} = await UnitofMeasurementService.getUnitofMeasurementById(id)
            form.setFieldsValue({...data})
            //console.log("single module",data)

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }



    const onFinish = async (values) => {
        console.log("submit",values)
        try {
            if (id) {
                await UnitofMeasurementService.updateUnitofMeasurement(id, values)
            } else {
                let {data} = await UnitofMeasurementService.saveUnitofMeasurement(values)
            }
            form.resetFields()
            navigate('/store/unit-of-measurement')
            notification["success"]({
                message: id ? "Successfully updated!" : "Successfully added!",
            });

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }



        form.resetFields();
    }  
    const onReset = () => {
        form.resetFields();
    }    
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
          <Breadcrumb.Item>
          <Link to="/store/unit-of-measurement">
              {" "}
            &nbsp;Unit of Measurement
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
          {id ? 'edit' : 'add'}
          </Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={
                    getLinkAndTitle('Unite of Measurement', '/store/unit-of-measurement')
                }
                >
                    <Row>
                        <Col sm={20} md={10}>
                    
                            <ARMForm
                                {...layout}
                                form={form}
                                name="unitofMeasurement"
                                onFinish={onFinish}
                                initialValues={{
                                 
                                }}
                                scrollToFirstError
                            >
                                <Form.Item
                                    name="code"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "This field is required!"
                                        },
                                    ]}
                                
                                >
                                    <Input/>
                                </Form.Item>

                             
                                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                                    <Space size="small">
                                        <ARMButton  type="primary" htmlType="submit">
                                            {id ? 'Update' : 'Submit'}
                                        </ARMButton>
                                        <ARMButton onClick={onReset} type="primary" danger>
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

export default UnitofMeasurement;