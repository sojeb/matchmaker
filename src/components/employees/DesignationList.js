import ARMCard from '../common/ARMCard';
import CommonLayout from '../layout/CommonLayout';
import {
  Breadcrumb,
  Col,
  Form,
  Input,
  notification,
  Popconfirm,
  Row,
  Select,
  Space,
} from 'antd';
import ARMButton from '../common/buttons/ARMButton';
import { useEffect, useState } from 'react';
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
  UnlockOutlined,
} from '@ant-design/icons';
import ActiveInactive from '../common/ActiveInactive';
import ARMBreadCrumbs from '../common/ARMBreadCrumbs';
import ManufacturerService from '../../service/ManufacturerService';
import { SyncErpData } from '../../lib/common/SyncErpData';
import ErpService from '../../service/ErpService';

const { Option } = Select;


const DesignationList = () => {
  const [departments, setDepartments] = useState([])
  const getErpData = async()=>{
    try{
      const {data} = await ErpService.getErpData("designation/")
      setDepartments(data.model)
      console.log("Erp data = ", data)
    }
    catch(error){
  
    }
  }

  useEffect(() => {
    getErpData();
  }, []);
  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/employees">
              <i className="fas fa-archive" /> &nbsp;employees
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Designations</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>

      <ARMCard title={SyncErpData('DESIGNATIONS LIST', getErpData)}>
        <Form initialValues={{ pageSize: 10 }}>
          <Row gutter={20}>
            <Col xs={24} md={6}>
              <Form.Item>
                <Input placeholder="Search" />
              </Form.Item>
            </Col>

            <Col xs={24} md={4}>
              <Form.Item
                name="pageSize"
                label="Page Size"
                rules={[
                  {
                    message: 'Field should not be empty',
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

        


        <Row className="table-responsive">
          <ResponsiveTable>
            <ARMTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Code</th>
                  <th>Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dep) => (
                  <tr key={dep.id}>
                    <td>{dep.name}</td>
                    <td>{dep.code}</td>
                    <td>{dep.info}</td>
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
                      </Space>
                    </td>
                  </tr>
                ))}
              </tbody>
            </ARMTable>
          </ResponsiveTable>
        </Row>
      </ARMCard>
    </CommonLayout>
  );
};

export default DesignationList;
