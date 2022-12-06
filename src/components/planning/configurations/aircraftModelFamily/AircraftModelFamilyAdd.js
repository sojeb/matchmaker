import CommonLayout from '../../../layout/CommonLayout';
import { Breadcrumb, Col, Form, Input, notification, Row, Space } from 'antd';
import ARMButton from '../../../common/buttons/ARMButton';
import ARMCard from '../../../common/ARMCard';
import { getLinkAndTitle } from '../../../../lib/common/TitleOrLink';
import AircraftModelFamilyService from '../../../../service/AircraftModelFamilyService';
import { getErrorMessage } from '../../../../lib/common/helpers';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ARMBreadCrumbs from '../../../common/ARMBreadCrumbs';
import ARMForm from '../../../../lib/common/ARMForm';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const AircraftModelFamilyAdd = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const cardTitle = params.id
    ? 'Aircraft Model Family Edit'
    : 'Aircraft Model Family Add';

  const saveAircraftModelName = async (data) => {
    try {
      await AircraftModelFamilyService.saveAircraftModelName(data);
      notification['success']({
        message: 'Aircraft model name saved successfully',
      });
      form.resetFields();
      navigate(-1);
    } catch (error) {
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const getAircraftModelById = async (id) => {
    try {
      const { data } = await AircraftModelFamilyService.getAircraftModelById(
        id
      );
      form.setFieldsValue(data);
    } catch (error) {
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const updateAircraftModelName = async (id, data) => {
    try {
      await AircraftModelFamilyService.updateAircraftName(id, data);
      notification['success']({
        message: 'Aircraft model name updated successfully',
      });
      form.resetFields();
      navigate(-1);
    } catch (error) {
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const onReset = () => {
    getAircraftModelById(params.id);
  };

  const onFinish = (values) => {
    params.id
      ? updateAircraftModelName(params.id, values)
      : saveAircraftModelName(values);
  };

  useEffect(() => {
    params.id && getAircraftModelById(params.id);
  }, [params.id]);

  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            {' '}
            <Link to="/planning">
              {' '}
              <i className="fas fa-chart-line" />
              &nbsp; Planning
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to="/planning/aircraft-model-family">
              Aircraft Model Families
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{params.id ? 'Edit' : 'Add'}</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>

      <ARMCard
        title={getLinkAndTitle(
          cardTitle,
          '/planning/aircraft-model-family/'
        )}
      >
        <Row>
          <Col span={10}>
            <ARMForm
              {...layout}
              form={form}
              name="aircraftFamilyModel"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                name="aircraftModelName"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'This field is required!',
                  },
                  {
                    max: 255,
                    message: 'Maximum 255 character allowed',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Space size="small">
                  <ARMButton type="primary" htmlType="submit">
                    {params.id ? 'Update' : 'Submit'}
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

export default AircraftModelFamilyAdd;
