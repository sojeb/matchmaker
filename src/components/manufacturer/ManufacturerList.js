import ARMCard from '../common/ARMCard';
import CommonLayout from '../layout/CommonLayout';
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
import ARMButton from '../common/buttons/ARMButton';
import { useEffect } from 'react';
import { getErrorMessage } from '../../lib/common/helpers';
import ARMTable from '../common/ARMTable';
import { Link } from 'react-router-dom';
import { getLinkAndTitle } from '../../lib/common/TitleOrLink';
import ResponsiveTable from '../common/ResposnsiveTable';
import {
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  RollbackOutlined,
} from '@ant-design/icons';
import ActiveInactive from '../common/ActiveInactive';
import ARMBreadCrumbs from '../common/ARMBreadCrumbs';
import ManufacturerService from '../../service/ManufacturerService';
import { usePaginate } from '../../lib/hooks/paginations';
import ActiveInactiveButton from '../common/buttons/ActiveInactiveButton';

const { Option } = Select;

const ManufacturerList = () => {
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
  } = usePaginate('manufacturer', '/config/manufacturer/search');

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/store">
              <i className="fas fa-archive" /> &nbsp;Store
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Manufacturers</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>

      <ARMCard
        title={getLinkAndTitle(
          'MANUFACTURES LIST',
          '/store/manufacturer/add',
          true
        )}
      >
        <Form form={form} onFinish={fetchData}>
          <Row gutter={20}>
            <Col xs={24} md={6}>
              <Form.Item name="query">
                <Input placeholder="Enter Manufacture Name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={4}>
              <Form.Item name="size" label="Page Size" initialValue="10">
                <Select id="antSelect">
                  <Option value="1">1</Option>
                  <Option value="3">3</Option>
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
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Skype</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {collection.map((manu) => (
                  <tr key={manu.id}>
                    <td>{manu.name}</td>
                    <td>{manu.phone}</td>
                    <td>{manu.email}</td>
                    <td>{manu.skype}</td>
                    <td>{manu.address}</td>

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

                        <Link to={`/store/manufacturer/edit/${manu.id}`}>
                          {console.log('Id: ', manu.id)}
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
                              await ManufacturerService.toogleStatus(
                                manu.id,
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

export default ManufacturerList;
