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
import { getErrorMessage } from '../../../../lib/common/helpers';
import { getLinkAndTitle } from '../../../../lib/common/TitleOrLink';
import { usePaginate } from '../../../../lib/hooks/paginations';
import AircraftService from '../../../../service/AircraftService';
import ActiveInactive from '../../../common/ActiveInactive';
import ARMBreadCrumbs from '../../../common/ARMBreadCrumbs';
import ARMCard from '../../../common/ARMCard';
import ARMTable from '../../../common/ARMTable';
import ActiveInactiveButton from '../../../common/buttons/ActiveInactiveButton';
import ARMButton from '../../../common/buttons/ARMButton';
import ResponsiveTable from '../../../common/ResposnsiveTable';
import CommonLayout from '../../../layout/CommonLayout';

const { Option } = Select;

const Aircraft = () => {
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
  } = usePaginate('aircrafts', '/aircrafts/search');

  useEffect(() => {
    fetchData();
  }, []);

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

          <Breadcrumb.Item>Aircrafts</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>

      <ARMCard
        title={getLinkAndTitle(
          'AIRCRAFT LIST',
          '/planning/aircraft/add',
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
                <Input placeholder="Search Aircraft Name" />
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
                  <th>Aircraft Model Name</th>
                  <th>Type</th>
                  <th>Registration</th>
                  <th>Date of Manufacture</th>
                  <th>Airgframe Seriel No.</th>
                  <th>Airgframe Total Time</th>
                  <th>Airgframe Total Cycle</th>
                  <th>Cabin Seat Configuration</th>
                  <th>Inpection Location</th>
                  <th>Short Name of Aircraft</th>
                  <th>Civil Aviation Registration No</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {collection.map((aircraft) => (
                  <tr key={aircraft.id}>
                    <td>{aircraft.aircraftName}</td>
                    <td>{aircraft.aircraftModelName}</td>
                    <td>{aircraft.type}</td>
                    <td>{aircraft.registration}</td>
                    <td>{aircraft.manufactureDateTime}</td>
                    <td>{aircraft.airframeSerial}</td>
                    <td>{aircraft.airFrameTotalTime}</td>
                    <td>{aircraft.airframeTotalCycle}</td>
                    <td>{aircraft.cabinSeatConfig}</td>
                    <td>{aircraft.inspectionLocation}</td>
                    <td>{aircraft.shortName}</td>
                    <td>{aircraft.civilAviationRegistration}</td>
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

                        <Link to={`/planning/aircraft/edit/${aircraft.id}`}>
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
                              await AircraftService.toggleAircraftStatus(
                                aircraft.id,
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

export default Aircraft;
