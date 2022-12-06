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
import { getErrorMessage } from '../../../lib/common/helpers';
import { getLinkAndTitle } from '../../../lib/common/TitleOrLink';
import CountryService from '../../../service/CountryService';
import ActiveInactive from '../../common/ActiveInactive';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMCard from '../../common/ARMCard';
import ARMTable from '../../common/ARMTable';
import ARMButton from '../../common/buttons/ARMButton';
import ResponsiveTable from '../../common/ResposnsiveTable';
import CommonLayout from '../../layout/CommonLayout';
import { usePaginate } from '../../../lib/hooks/paginations';
import ActiveInactiveButton from '../../common/buttons/ActiveInactiveButton';

const { Option } = Select;

const CountryTable = () => {
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
  } = usePaginate('country', '/countries/search');

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <i className="fas fa-cog" />
            <Link to="/configurations">&nbsp; Configurations</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Countries</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>

      <ARMCard
        title={getLinkAndTitle(
          'Country List',
          '/configurations/add-countries',
          'addBtn'
        )}
      >
        <Form form={form} onFinish={fetchData}>
          <Row gutter={20}>
            <Col xs={24} md={6}>
              <Form.Item name="query">
                <Input placeholder="Search country name or code" />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item name="size" label="Page Size" initialValue="10">
                <Select id="antSelect">
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
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

        <ResponsiveTable>
          <ARMTable>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Dialing Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {collection?.map((data) => (
                <tr key={data.id}>
                  <td>{data.code}</td>
                  <td>{data.name}</td>
                  <td>{data.dialingCode}</td>
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

                      <Link to={`/configurations/add-countries/${data.id}`}>
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
                            await CountryService.toggleStatus(
                              data.id,
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

export default CountryTable;
