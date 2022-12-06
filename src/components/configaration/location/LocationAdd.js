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
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import CityService from '../../../service/CityService';
import LocationService from '../../../service/LocationService';
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
const { TextArea } = Input;

const LocationAdd = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const cardTitle = id ? 'Location Edit' : 'Location Add';
  // const cities = useSelector((state) => state.pagination.city.model);
  // const countries = useSelector((state) => state.pagination.country.model);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [location, setLocation] = useState({});
  const [resetField, setResetField] = useState({});
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const allCities = async () => {
    try {
      const { data } = await CityService.getAllCity(30, {
        query: '',
        isActive: true,
      });
      setCities(data.model);
      console.log('models: ', data.model);
    } catch (error) {
      console.log('city list error: ', error);
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const allCountries = async () => {
    try {
      const { data } = await CountryService.getAllCountry(30, {
        query: '',
        isActive: true,
      });
      setCountries(data.model);
      console.log('models: ', data.model);
    } catch (error) {
      console.log('country list error: ', error);
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const selectCountry = (country) => {
    setSelectedCountry(country);
    form.setFieldsValue({ ...form, cityId: null });
  };

  const getLocationById = async (id) => {
    try {
      const { data } = await LocationService.getLocationById(id);
      setLocation(data);
    } catch (error) {
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const getCountryId = async (id) => {
    try {
      const { data } = await CityService.getCityById(id);
      form.setFieldsValue({ ...location, countryId: data.countryId });
      setResetField({ ...location, countryId: data.countryId });
      setSelectedCountry(data.countryId);
    } catch (error) {
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const onReset = () => {
    if (id) {
      form.setFieldsValue(resetField);
      setSelectedCountry(resetField.countryId);
    } else {
      form.resetFields();
    }
  };

  const onFinish = async (values) => {
    try {
      if (id) {
        await LocationService.updateLocation(id, values);
      } else {
        await LocationService.saveLocation(values);
      }
      form.resetFields();
      navigate(-1);
      notification['success']({
        message: id ? 'Successfully updated!' : 'Successfully added!',
      });
    } catch (error) {
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  useEffect(() => {
    allCountries();
    allCities();
  }, []);

  useEffect(() => {
    id && getLocationById(id);
    location.cityId && getCountryId(location.cityId);
  }, [id, location.cityId]);

  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            {' '}
            <Link to="/configurations">
              {' '}
              <i className="fas fa-cog" /> &nbsp; Configurations
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to="/configurations/location">Locations</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{id ? 'Edit' : 'Add'}</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>

      <ARMCard title={getLinkAndTitle(cardTitle, '/configurations/location/')}>
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
                name="code"
                label="Code"
                rules={[
                  {
                    required: true,
                    message: 'Field should not be empty',
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
                label="Country"
                name="countryId"
                rules={[
                  {
                    required: true,
                    message: 'Please select an option',
                  },
                ]}
              >
                <Select
                  placeholder="Select Country"
                  allowClear
                  onChange={(country) => selectCountry(country)}
                >
                  {countries.map((country) => (
                    <Option key={country.id} value={country.id}>
                      {country.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="City"
                name="cityId"
                tooltip={!id && 'Please select country first'}
                rules={[
                  {
                    required: true,
                    message: 'Please select an option',
                  },
                ]}
              >
                <Select placeholder="Select City" allowClear>
                  {cities.map(
                    (city) =>
                      city.countryId === selectedCountry && (
                        <Option key={city.id} value={city.id}>
                          {city.name}
                        </Option>
                      )
                  )}
                </Select>
              </Form.Item>

              <Form.Item
                name="address"
                label="Address"
                rules={[
                  {
                    required: true,
                    message: 'Field should not be empty',
                  },
                ]}
              >
                <TextArea rows={4} />
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

export default LocationAdd;
