import CommonLayout from '../../layout/CommonLayout';
import {
  Breadcrumb,
  Col,
  Form,
  Input,
  notification,
  Row,
  Select,
  Space,
} from 'antd';
import ARMButton from '../../common/buttons/ARMButton';
import ARMCard from '../../common/ARMCard';
import { getLinkAndTitle } from '../../../lib/common/TitleOrLink';
import { getErrorMessage } from '../../../lib/common/helpers';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import CityService from '../../../service/CityService';
import ARMForm from '../../../lib/common/ARMForm';
import CountryService from '../../../service/CountryService';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;

const CityAdd = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const cardTitle = params.id ? 'City Edit' : 'City Add';
  // const countries = useSelector((state) => state.pagination.country.model);

  const [countries, setCountries] = useState([]);

  const allCountries = async () => {
    try {
      const { data } = await CountryService.getAllCountry(30, {
        query: null,
        isActive: true,
      });
      setCountries(data.model);
      console.log('models: ', data.model);
    } catch (error) {
      console.log('country list error: ', error);
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const saveCity = async (data) => {
    try {
      await CityService.saveCity(data);
      notification['success']({
        message: 'City saved successfully',
      });
      form.resetFields();
      navigate(-1);
    } catch (error) {
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const getCityById = async (id) => {
    try {
      const { data } = await CityService.getCityById(id);
      form.setFieldsValue(data);
    } catch (error) {
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const updateCity = async (id, data) => {
    try {
      await CityService.updateCity(id, data);
      notification['success']({
        message: 'City updated successfully',
      });
      form.resetFields();
      navigate(-1);
    } catch (error) {
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const onReset = () => {
    getCityById(params.id);
  };

  const onFinish = (values) => {
    params.id ? updateCity(params.id, values) : saveCity(values);
  };

  useEffect(() => {
    allCountries();
  }, []);

  useEffect(() => {
    params.id && getCityById(params.id);
  }, [params.id]);

  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            {' '}
            <Link to="/configurations">
              {' '}
              <i className="fas fa-cog" /> &nbsp;Configurations
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to="/configurations/city">Cities</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{params.id ? 'Edit' : 'Add'}</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>

      <ARMCard title={getLinkAndTitle(cardTitle, '/configurations/city/')}>
        <Row>
          <Col span={10}>
            <ARMForm
              {...layout}
              form={form}
              name="city"
              onFinish={onFinish}
              scrollToFirstError
            >
              <Form.Item
                label="Country"
                name="countryId"
                rules={[
                  {
                    required: true,
                    message: 'Please select a country',
                  },
                ]}
              >
                <Select placeholder="Select Country" allowClear>
                  {countries.map((country) => (
                    <Option key={country.id} value={country.id}>
                      {country.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="name"
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
              <Form.Item
                name="zipCode"
                label="Zip Code"
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

export default CityAdd;
