import { Breadcrumb, Col, Form, Input, Row, Select } from "antd";
import { Link } from "react-router-dom";
import ARMForm from "../../../lib/common/ARMForm";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import { useSignatures } from "../../../lib/hooks/planning/useSignatures";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";
const { Option } = Select;

export default function AddSignatures() {
  const { employees, onFinish, form } = useSignatures();
  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/planning">
              <i className="fas fa-chart-line" /> &nbsp;Planning
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to="/planning/signatures">Signatures</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Signature</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle("signatures", "/planning/signatures", false)}>
        <Row justify="start">
          <Col lg={12} md={16} sm={20} xs={24}>
            <ARMForm
            form={form}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input employee name",
                  },
                ]}
                name="employeeId"
                label="Employee Name"
              >
                <Select                >
                  {employees.map((employee) => (
                    <Option key={employee.id} value={employee.id}>{employee.name}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="Auth No"
                name="authNo"
                rules={[
                  {
                    required: true,
                    message: "Please input your auth no!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <ARMButton type="primary" htmlType="submit">
                  Submit
                </ARMButton>
              </Form.Item>
            </ARMForm>
          </Col>
        </Row>
      </ARMCard>
    </CommonLayout>
  );
}
