import { EditOutlined, EyeOutlined, FilterOutlined, LockOutlined, RollbackOutlined, UnlockOutlined } from '@ant-design/icons';
import { Breadcrumb, Col, Form, Input, notification, Popconfirm, Row, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getErrorMessage } from '../../../lib/common/helpers';
import { getLinkAndTitle } from '../../../lib/common/TitleOrLink';
import UnitofMeasurementService from '../../../service/UnitofMeasurementService';
import ActiveInactive from '../../common/ActiveInactive';
import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMCard from '../../common/ARMCard';
import ARMTable from '../../common/ARMTable';
import ARMButton from '../../common/buttons/ARMButton';
import CommonLayout from '../../layout/CommonLayout';

const UnitofMeasurementList = () => {
    const { Option } = Select;
    const[status, setStatus] = useState(true)
    const [isActive, setIsActive] = useState(true);
    const [unitofMeasurement, setUnitofMeasurement] = useState([]);
    const activeOrInactive = (activeStatus) => {
        setStatus(activeStatus)
    }
    useEffect(() => {
      getUnitofMeasurement().catch(console.error)
  }, [])
  useEffect(() => {
    getUnitofMeasurement().catch(console.error)
  }, [isActive])

    const   getUnitofMeasurement = async () => {
      try {
          let {data} = await UnitofMeasurementService.getAllUnitofMeasurement(isActive)
          console.log(data)
          setUnitofMeasurement(data.model)
      } catch (er) {
          notification["error"]({message: getErrorMessage(er)});
      }
  }
  const handleStatus = async (id,status) => {
      try {
          const {data} = await UnitofMeasurementService.toggleStatus(id,status);
          await getUnitofMeasurement();
          notification["success"]({
              message: "Status changed successfully!",
          });
      } catch (er) {
          notification["error"]({message: getErrorMessage(er)});
      }
  }



    return (
        <CommonLayout>
              <ARMBreadCrumbs>
        <Breadcrumb separator="/">
        <Breadcrumb.Item>
            {" "}
            <Link to="/store">
              {" "}
              <i className="fas fa-archive" /> &nbsp;Store
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Unit of Measurements</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle("Unit of Measurement LIST", "/store/add-unit-of-measurement", "addBtn")}>
        <Form initialValues={{ pageSize: 10 }}>
          <Row gutter={20}>
            <Col xs={24} md={6}>
              <Form.Item>
                <Input placeholder="Enter Search Text" />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item
                name="pageSize"
                label="Page Size"
                rules={[
                  {
                    message: "Field should not be empty",
                  },
                ]}
              >
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
                  <ARMButton size="middle" type="primary" htmlType="submit">
                    <RollbackOutlined /> Reset
                  </ARMButton>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <ActiveInactive isActive={isActive} setIsActive={setIsActive} />

          {/*<span>Filtered 7 of 7 total module</span>*/}
          <Row className="table-responsive">
            <ARMTable
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
             
                {unitofMeasurement?.map((data, index) => (
                  <tr key={data.id}>
                    <td>{data.code}</td>
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

                        <Link to={`/store/add-unit-of-measurement/${data.id}`}>
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

                        <Popconfirm
                          title="Are you Sure?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() =>
                            handleStatus(data.id,!isActive)
                          }
                        >
                           {
                                                        isActive ?
                                                        <ARMButton type="primary" size="small" style={{
                                                            backgroundColor: '#53a351',
                                                            borderColor: '#53a351',
                                                        }}>
                                                            <UnlockOutlined/>
                                                        </ARMButton>
                                                            :
                                                        <ARMButton type="primary" size="small" danger>
                                                            <LockOutlined/>
                                                        </ARMButton>

                                                    }
                        </Popconfirm>
                      </Space>
                    </td>
                  </tr>
                ))}
              
              </tbody>
            </ARMTable>
          </Row>
        </ARMCard>
        </CommonLayout>
    );
};

export default UnitofMeasurementList;