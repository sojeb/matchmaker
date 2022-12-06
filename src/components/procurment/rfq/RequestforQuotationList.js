import { Breadcrumb, Col, Empty, Form, Input, notification, Pagination, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CommonLayout from '../../layout/CommonLayout';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMCard from '../../common/ARMCard';
import { getLinkAndTitle } from '../../../lib/common/TitleOrLink';
import { EditOutlined, EyeOutlined, FilterOutlined, RollbackOutlined } from '@ant-design/icons';
import ARMButton from '../../common/buttons/ARMButton';
import ActiveInactive from '../../common/ActiveInactive';
import ResponsiveTable from '../../common/ResposnsiveTable';
import ARMTable from '../../common/ARMTable';
import ActiveInactiveButton from '../../common/buttons/ActiveInactiveButton';
import { usePaginate } from '../../../lib/hooks/paginations';
import RequestforQuotationService from '../../../service/procurment/RequestforQuotationService'
import { getErrorMessage } from '../../../lib/common/helpers';
const RequestforQuotationList = () => {
  const { Option } = Select;

  useEffect(() => {
    fetchData();
  }, []);

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
  } = usePaginate('quoteRequests', '/quote-requests/search');

  console.log("quote-requests", collection)
  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <i className="fa fa-shopping-basket" />
            <Link to="/procurment">&nbsp;Procurment</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Request for Quotations(RFQ)</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>

      <ARMCard
        title={getLinkAndTitle(
          'Request for Quotations(RFQ) List',
          '/procurment/add-request-for-quotation',
          'addBtn'
        )}
      >
        <Form form={form} onFinish={fetchData}>
          <Row gutter={20}>
            <Col xs={24} md={6}>
              <Form.Item name="query">
                <Input placeholder="Enter RFQ No. " />
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

        <ActiveInactive
          isActive={isActive} setIsActive={setIsActive}
        />

        <ResponsiveTable>
          <ARMTable>
            <thead>
              <tr>
                <th>RFQ No.</th>
                <th>Company Name</th>
                <th>Request Date</th>
                <th>Respond Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {collection?.map((data) => (
                <tr key={data.id}>
                  <td>{data.rfqNo}</td>
                  <td>{data.companyName}</td>
                  <td>{data.requestDate}</td>
                  <td>{data.respondDate}</td>
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

                      <Link to={`/procurment/add-request-for-quotation/${data.id}`}>
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
                            await RequestforQuotationService.toggleStatus(
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

export default RequestforQuotationList;