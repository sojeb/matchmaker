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
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLinkAndTitle } from '../../../lib/common/TitleOrLink';
import CompanyService from '../../../service/CompanyService';
import ActiveInactive from '../../common/ActiveInactive';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMCard from '../../common/ARMCard';
import ARMTable from '../../common/ARMTable';
import ARMButton from '../../common/buttons/ARMButton';
import CommonLayout from '../../layout/CommonLayout';
import { getErrorMessage } from '../../../lib/common/helpers';
import { usePaginate } from '../../../lib/hooks/paginations';
import ActiveInactiveButton from '../../common/buttons/ActiveInactiveButton';

const { Option } = Select;

const CompanyLists = () => {
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
  } = usePaginate('companies', '/companies/search');

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
              <i className="fas fa-cog ant-menu-item-icon" />{' '}
              &nbsp;Configarations
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Companies</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard
        title={getLinkAndTitle(
          'COMPANY LIST',
          '/configurations/companies/add',
          'addBtn'
        )}
      >
        <Form form={form} onFinish={fetchData}>
          <Row gutter={20}>
            <Col xs={24} md={6}>
              <Form.Item name="query">
                <Input placeholder="Enter Company Name" />
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
          <ARMTable
            scroll={{
              x: 500,
              y: 300,
            }}
          >
            <thead>
              <tr>
                <th>Company Name</th>
                <th>addressLine 1</th>
                <th>addressLine 2</th>
                <th>addressLine 3</th>
                <th>Country</th>
                <th>City</th>
                <th>Phone Number</th>
                <th>Fax</th>
                <th>Email</th>
                <th>Contact Person</th>
                <th>Base Currency</th>
                <th>Local Currency</th>
                <th>Shipment Address 1</th>
                <th>Shipment Address 2</th>
                <th>Shipment Address 3</th>
                <th>Company URL</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {collection.map((company, index) => (
                <tr key={index}>
                  <td>{company.companyName}</td>
                  <td>{company.addressLineOne}</td>
                  <td>{company.addressLineTwo}</td>
                  <td>{company.addressLineThree}</td>
                  <td>{company.Country}</td>
                  <td>{company.City}</td>
                  <td>{company.phone}</td>
                  <td>{company.fax}</td>
                  <td>{company.email}</td>
                  <td>{company.contactPerson}</td>
                  <td>{company.baseCurrency}</td>
                  <td>{company.localCurrency}</td>
                  <td>{company.shipmentAddressOne}</td>
                  <td>{company.shipmentAddressTwo}</td>
                  <td>{company.shipmentAddressThree}</td>
                  <td>{company.companyUrl}</td>

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
                      <ARMButton
                        type="primary"
                        size="small"
                        style={{
                          backgroundColor: '#6e757c',
                          borderColor: '#6e757c',
                        }}
                      >
                        <Link
                          to={`/configurations/companies/add/${company.id}`}
                        >
                          <EditOutlined />
                        </Link>
                      </ARMButton>

                      <ActiveInactiveButton
                        isActive={isActive}
                        handleOk={async () => {
                          try {
                            await CompanyService.toggleStatus(
                              company.id,
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
        </Row>

        <Row>
          {collection.length === 0 ? (
            <Col style={{ margin: '30px auto' }}>
              <Empty />
            </Col>
          ) : null}
        </Row>

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
      </ARMCard>
    </CommonLayout>
  );
};

export default CompanyLists;
