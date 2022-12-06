import ARMCard from '../../common/ARMCard';
import CommonLayout from '../../layout/CommonLayout';
import { Breadcrumb, Form, Input, notification, Space } from 'antd';
import ARMButton from '../../common/buttons/ARMButton';
import { useEffect, useState } from 'react';
import { getErrorMessage } from '../../../lib/common/helpers';
import OfficeService from '../../../service/OfficeService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getLinkAndTitle } from '../../../lib/common/TitleOrLink';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMForm from '../../../lib/common/ARMForm';
import LocationService from '../../../service/LocationService';
import DebounceSelect from '../../common/DebounceSelect';

const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 7,
  },
};

const OfficeAdd = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const cardTitle = params.id ? 'Office Edit' : 'Office Add';

  const [selectedLocation, setSelectedLocation] = useState([]);

  const saveStore = async (data) => {
    try {
      await OfficeService.saveStore(data);
      notification['success']({ message: 'Store saved successfully' });
      form.resetFields();
      navigate(-1);
    } catch (error) {
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const getStoreById = async (id) => {
    try {
      const { data } = await OfficeService.getStoreById(id);
      form.setFieldsValue(data);
      setSelectedLocation([
        {
          value: data.locationId,
          label: data.locationCode,
        },
      ]);
    } catch (error) {
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const updateStore = async (id, data) => {
    try {
      await OfficeService.updateStore(id, data);
      notification['success']({ message: 'Store updated successfully' });
      form.resetFields();
      navigate(-1);
    } catch (error) {
      notification['error']({ message: getErrorMessage(error) });
    }
  };

  const onFinish = (values) => {
    params.id
      ? updateStore(params.id, {
          ...values,
          locationId: values.locationId.value,
        })
      : saveStore({ ...values, locationId: values.locationId.value });
  };

  const onReset = () => {
    getStoreById(params.id);
  };

  useEffect(() => {
    params.id && getStoreById(params.id);
  }, [params.id]);

  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            {' '}
            <Link to="/configurations">
              {' '}
              <i className="fas fa-cog" /> &nbsp;Configuration
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to="/configurations/office">Offices</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{params.id ? 'Edit' : 'Add'}</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>

      <ARMCard title={getLinkAndTitle(cardTitle, '/configurations/office')}>
        <ARMForm
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
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
            name="locationId"
            label="Location"
            rules={[
              {
                required: true,
                message: 'Field should not be empty',
              },
            ]}
          >
            <DebounceSelect
              debounceTimeout={1000}
              mapper={(v) => ({
                value: v.id,
                label: v.code,
              })}
              showSearch
              value={selectedLocation}
              placeholder="---Select Location---"
              url="/store/locations/search"
              selectedValue={selectedLocation}
              onChange={(newValue) => {
                setSelectedLocation(newValue);
              }}
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item name="address" label="Address">
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
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
      </ARMCard>
    </CommonLayout>
  );
};

export default OfficeAdd;
