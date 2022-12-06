import CommonLayout from '../../layout/CommonLayout';
import { Breadcrumb, Col, Form, Input, notification, Row, Space } from 'antd';
import ARMCard from '../../common/ARMCard';
import ARMButton from '../../common/buttons/ARMButton';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CountryService from '../../../service/CountryService';
import { getErrorMessage } from '../../../lib/common/helpers';
import React, { useEffect } from 'react';
import { getLinkAndTitle } from '../../../lib/common/TitleOrLink';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMForm from '../../../lib/common/ARMForm';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const Country = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!id) {
      return;
    }
    getCountryById().catch(console.error);
  }, [id]);

  const getCountryById = async () => {
    try {
      const { data } = await CountryService.getCountryById(id);
      form.setFieldsValue({ ...data });
    } catch (er) {
      notification['error']({ message: getErrorMessage(er) });
    }
  };

  const onFinish = async (values) => {
    try {
      if (id) {
        await CountryService.updateCountry(id, values);
      } else {
        let { data } = await CountryService.saveCountry(values);
      }
      form.resetFields();
      navigate('/configurations/countries');
      notification['success']({
        message: id ? 'Successfully updated!' : 'Successfully added!',
      });
    } catch (er) {
      notification['error']({ message: getErrorMessage(er) });
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <i className="fas fa-cog" />
            <Link to="/configurations">&nbsp; Configurations</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/configurations/countries">Countries</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{id ? 'edit' : 'add'}</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>

      <ARMCard title={getLinkAndTitle('Country', '/configurations/countries')}>
        <Row>
          <Col sm={20} md={10}>
            <ARMForm
              {...layout}
              form={form}
              name="country"
              onFinish={onFinish}
              initialValues={{
                isActive: false,
              }}
              scrollToFirstError
            >
              <Form.Item
                name="code"
                label="Code"
                rules={[
                  {
                    required: true,
                    message: 'This field is required!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'This field is required!',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="dialingCode"
                label="Dialing Code"
                rules={[
                  {
                    required: true,
                    message: 'This field is required!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Space size="small">
                  <ARMButton type="primary" htmlType="submit">
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
export default Country;
