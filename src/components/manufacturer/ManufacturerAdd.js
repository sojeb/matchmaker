import ARMCard from '../common/ARMCard';
import CommonLayout from '../layout/CommonLayout';
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
import ARMButton from '../common/buttons/ARMButton';
import { useEffect, useState } from 'react';
import { getErrorMessage } from '../../lib/common/helpers';
import { Link,useNavigate, useParams } from 'react-router-dom';
import { getLinkAndTitle } from '../../lib/common/TitleOrLink';
import ARMBreadCrumbs from '../common/ARMBreadCrumbs';
import SupplierService from '../../service/SupplierService';
import ManufacturerService from '../../service/ManufacturerService';
import CountryService from '../../service/CountryService';
import ARMForm from '../../lib/common/ARMForm';

const { Option } = Select;
const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const ManufacturerAdd = () => {
  const params = useParams();
  console.log('id: ',params.id);
  const [form] = Form.useForm();
  const navigate  =useNavigate()
  const cardTitle = params.id ? 'Manufacturer edit' : 'Manufacturer add';

  const [isCityDisabled, setIsCityDisabled] = useState(true);
  const [cities, setCity] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryOriginName, setCountryOriginName] = useState('');
  const getAllCity = async () => {
    try {
      const { data } = await ManufacturerService.getAllCity();
      console.log('all cities = ', data);
      setCity(data.model);
    } catch (error) {
      console.log('cities error: ', error);
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const getAllCountry = async () => {
    try {
      const { data } = await ManufacturerService.getAllCountry();
      console.log('all countries = ', data);
      setCountries(data.model);
    } catch (error) {
      console.log('cities error: ', error);
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const savaManufacturer = async (data) => {
    try {
      await ManufacturerService.saveManufacturer(data);
      navigate('/store/manufacturer/list');
      notification['success']({ message: 'Manufacturer saved successfully' });
      form.resetFields();
      
    } catch (error) {
      console.log('store save error: ', error);
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const getManufacturerById = async (id) => {
    try {
      const { data } = await ManufacturerService.getManufacturerById(id);

      form.setFieldsValue({
        ...data,
         countryId: data.city.countryId,
        countryOriginId: data.countryOrigin.id,
        prefix:data.phone.slice(0,4),
        phone:data.phone.slice(4),
        cityId: data.city.id,
      });
      //setCountryOriginName(data.countryOrigin.name)
      if (form.getFieldValue('countryId') != '') {
        setIsCityDisabled(false);
      } else {
        setIsCityDisabled(true);
      }
      console.log('edit man: ', {
        ...data,
        countryOriginId: data.countryOrigin.id,
        cityId: data.city.id,
      });
    } catch (error) {
      console.log('edit error: ', error);
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const updateManufacturer = async (id, data) => {
    try {
      await ManufacturerService.updateManufacturer(id, data);
      navigate('/store/manufacturer/list');
      notification['success']({ message: 'Manufacturer updated successfully' });
      form.resetFields();
    } catch (error) {
      console.log('store update error: ', error);
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const onFinish = (values) => {
    console.log('Dialing code is correct ? = ', values);
    params.id
      ? updateManufacturer(params.id, values)
      : savaManufacturer(values);
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({ countryId: '' });
    params.id && getManufacturerById(params.id);
    getAllCity();
    getAllCountry();
  }, [params.id]);

  const handleCountryChange = async (value) => {
    try {
      const { data } = await CountryService.getCountryById(value);
      setCity(data.cities);
      console.log('all cities by corresponding country = ', data);
    } catch (error) {}
    console.log('selected country = ', value);
    const disable = value === undefined ? true : false;
    setIsCityDisabled(disable);
  };

  const dialingCodes = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 80,
        }}
      >
        {countries.map((country) => {
          return (
            <Option key={country.dialingCode} value={country.dialingCode}>{country.dialingCode}</Option>
          );
        })}
      </Select>
    </Form.Item>
  );

  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/store">
              <i className="fas fa-archive" /> &nbsp;Store
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to="/store/manufacturer/list">Manufacturers</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Manufacturer Add</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>

      <ARMCard title={getLinkAndTitle(cardTitle, '/store/manufacturer/list')}>
        <ARMForm
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        >
          <Row justify="center" gutter={10}>
            <Col className="gutter-row" lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Field should not be empty',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="countryId"
                label="Country"
                rules={[
                  {
                    required: true,
                    message: 'Field should not be empty',
                  },
                ]}
              >
                <Select
                  onChange={handleCountryChange}
                  placeholder="Select Origin Country"
                  allowClear
                >
                  {countries.map((country) => (
                    <Option key={country.id} value={country.id}>
                      {country.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="cityId"
                label="City"
                rules={[
                  {
                    required: true,
                    message: 'Field should not be empty',
                  },
                ]}
              >
                <Select
                  disabled={isCityDisabled}
                  placeholder="Select City"
                  allowClear
                >
                  {cities.map((city) => (
                    <Option key={city.id} value={city.id}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!',
                  },
                ]}
              >
                <Input addonBefore={dialingCodes} />
              </Form.Item>

              <Form.Item name="emergencyContact" label="Emergency Contact">
                <Input />
              </Form.Item>

              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>

              <Form.Item name="skype" label="Skype">
                <Input />
              </Form.Item>
            </Col>

            <Col className="gutter-row" lg={10} md={24} sm={24} xs={24}>
              <Form.Item name="website" label="Website">
                <Input />
              </Form.Item>

              <Form.Item name="clientList" label="Client List">
                <Input />
              </Form.Item>

              <Form.Item name="itemsBuild" label="Items Build">
                <Input />
              </Form.Item>

              <Form.Item name="loadingPort" label="Loading Port">
                <Input />
              </Form.Item>

              <Form.Item name="countryOriginId" label="Country Origin">
                <Select placeholder="Select origin country" allowClear>
                  {countries.map((country) => (
                    <Option key={country.id} value={country.id}>
                      {country.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item name="address" label="Address">
                <TextArea rows={4} />
              </Form.Item>
            </Col>
          </Row>

          <Row justify={'center'} gutter={10}>
            <Col className="gutter-row" lg={16} md={12} sm={14} xs={24}>
              <Form.Item>
                <Space size="medium">
                  <ARMButton
                    style={{ marginRight: '5px' }}
                    type="primary"
                    htmlType="submit"
                  >
                    {params.id ? 'Update' : 'Submit'}
                  </ARMButton>
                  <ARMButton onClick={onReset} type="primary" danger>
                    Reset
                  </ARMButton>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </ARMForm>
      </ARMCard>
    </CommonLayout>
  );
};

export default ManufacturerAdd;
