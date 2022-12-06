import {
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import {
  Breadcrumb,
  Col,
  Empty,
  Form,
  Input,
  notification,
  Pagination,
  Row,
  Select,
  Space,
} from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getErrorMessage } from '../../../lib/common/helpers';
import { getLinkAndTitle } from '../../../lib/common/TitleOrLink';
import { usePaginate } from '../../../lib/hooks/paginations';
import LocationService from '../../../service/LocationService';
import ActiveInactive from '../../common/ActiveInactive';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMCard from '../../common/ARMCard';
import ARMTable from '../../common/ARMTable';
import ActiveInactiveButton from '../../common/buttons/ActiveInactiveButton';
import ARMButton from '../../common/buttons/ARMButton';
import ResponsiveTable from '../../common/ResposnsiveTable';
import CommonLayout from '../../layout/CommonLayout';

const { Option } = Select;

const Location = () => {
  const {
    form,
    collection,
    page,
    totalElements,
    paginate,
    isActive,
    setIsActive,
    fetchData,
    refreshPagination,
    resetFilter,
    size,
  } = usePaginate('locations', '/store/locations/search');

  useEffect(() => {
    fetchData();
  }, []);

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

          <Breadcrumb.Item>Locations</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>

      <ARMCard
        title={getLinkAndTitle(
          'Location List',
          '/configurations/location/add',
          'add'
        )}
      >
        <Form form={form} onFinish={fetchData}>
          <Row gutter={20}>
            <Col xs={24} md={6}>
              <Form.Item
                name="query"
                rules={[
                  {
                    max: 255,
                    message: 'Maximum 255 character allowed',
                  },
                ]}
              >
                <Input placeholder="Search location code" />
              </Form.Item>
            </Col>

            <Col xs={24} md={4}>
              <Form.Item name="size" label="Page Size" initialValue="10">
                <Select id="antSelect">
                  <Option value="10">10</Option>
                  <Option value="20">20</Option>
                  <Option value="30">30</Option>
                  <Option value="40">40</Option>
                  <Option value="50">50</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item>
                <Space>
                  <ARMButton size="middle" type="primary" htmlType="submit">
                    <FilterOutlined /> Filter
                  </ARMButton>
                  <ARMButton
                    size="middle"
                    type="primary"
                    htmlType="submit"
                    onClick={resetFilter}
                  >
                    <RollbackOutlined /> Reset
                  </ARMButton>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <ActiveInactive isActive={isActive} setIsActive={setIsActive} />

        <Row className="table-responsive">
          <ResponsiveTable>
            <ARMTable>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {collection?.map((location) => (
                  <tr key={location.id}>
                    <td>{location.code}</td>
                    <td>{location.address}</td>
                    <td>
                      <Space size="small">
                        <ARMButton
                          type="primary"
                          size="small"
                          style={{
                            backgroundColor: '#4aa0b5',
                            borderColor: '#4aa0b5',
                          }}
                        >
                          <EyeOutlined />
                        </ARMButton>

                        <Link
                          to={`/configurations/location/edit/${location.id}`}
                        >
                          <ARMButton
                            type="primary"
                            size="small"
                            style={{
                              backgroundColor: '#6e757c',
                              borderColor: '#6e757c',
                            }}
                          >
                            <EditOutlined />
                          </ARMButton>
                        </Link>

                        <ActiveInactiveButton
                          isActive={isActive}
                          handleOk={async () => {
                            try {
                              await LocationService.toggleLocationStatus(
                                location.id,
                                !isActive
                              );
                              notification['success']({
                                message: 'Status Changed Successfully!',
                              });
                              refreshPagination();
                            } catch (e) {
                              notification['error']({
                                message: getErrorMessage(e),
                              });
                            }
                          }}
                        />
                      </Space>
                    </td>
                  </tr>
                ))}
              </tbody>
            </ARMTable>
          </ResponsiveTable>
        </Row>

        {collection.length === 0 ? (
          <Row>
            <Col style={{ margin: '30px auto' }}>
              <Empty />
            </Col>
          </Row>
        ) : (
          <Row justify="center">
            <Col style={{ marginTop: 10 }}>
              <Pagination
                showSizeChanger={false}
                onShowSizeChange={console.log}
                pageSize={size}
                current={page}
                onChange={paginate}
                total={totalElements}
              />
            </Col>
          </Row>
        )}
      </ARMCard>
    </CommonLayout>
  );
};

export default Location;
