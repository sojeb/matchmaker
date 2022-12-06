import { Breadcrumb, Col, DatePicker, Form, Row, Select } from "antd";
import { Link } from "react-router-dom";
import ARMCard from "../../common/ARMCard";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMForm from "../../../lib/common/ARMForm";
import { useMel } from "../../../lib/hooks/planning/useMel";

const { Option } = Select;

export default function AddMel() {
  const { onFinish, form, id, handleReset, aml, defects, handleDefectSearch, handleRectSearch, rects } = useMel();

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
            <Link to="/planning/mel">MEL</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>MEL</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle("ADD MEL", "/planning/mel", false)}>
        <ARMForm
          form={form}
          name="basic"
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 12,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          style={{
            backgroundColor: "#ffffff",
          }}
          onFinish={onFinish}
        >
          <Row gutter={[16, 6]} justify="start ">
            <Col className="gutter-row" lg={12} xl={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input intermediate AML",
                  },
                ]}
                label="Intermediate AML"
              >
                <Select defaultValue="--select--" onClick={handleDefectSearch}>
                  {aml?.map((aml) => (
                    <Option key={aml.aircraftMaintenanceLogId} value={aml.aircraftMaintenanceLogId}>
                      {aml.pageNo}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Defects" name="intermediateDfId">
                <Select defaultValue="--select--">
                  {defects?.map((defect) => (
                    <Option key={defect.id} value={defect.id}>
                      {defect.seqNo}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Category" name="category">
                <Select defaultValue="--select--">
                  <Option value={1}>A</Option>
                  <Option value={2}>B</Option>
                  <Option value={3}>C</Option>
                  <Option value={4}>D</Option>
                </Select>
              </Form.Item>
              <Form.Item name="dueDate" label="Due date">
                <DatePicker style={{ width: "100%" }} placeholder="" />
              </Form.Item>
              <Form.Item name="clearedDate" label="Cleared date">
                <DatePicker style={{ width: "100%" }} placeholder="" />
              </Form.Item>
              <Form.Item label="Status" name="status">
                <Select defaultValue="--select--">
                  <Option value={1}>Open</Option>
                  <Option value={2}>Close</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col className="gutter-row" lg={12} xl={12} md={12} sm={24} xs={24}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input intermediate AML",
                  },
                ]}
                label="Corrective AML"
              >
                <Select defaultValue="--select--" onClick={handleRectSearch}>
                  {aml?.map((aml) => (
                    <Option key={aml.aircraftMaintenanceLogId} value={aml.aircraftMaintenanceLogId}>
                      {aml.pageNo}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Rectifications" name="correctiveDfId">
                <Select defaultValue="--select--">
                  {rects?.map((rect) => (
                    <Option key={rect.id} value={rect.id}>
                      {rect.seqNo}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="melDate" label="MEL date">
                <DatePicker style={{ width: "100%" }} placeholder="" />
              </Form.Item>
            </Col>
            <Col className="gutter-row" lg={12} xl={12} md={12} sm={24} xs={24}>
              <Form.Item
                wrapperCol={{
                  offset: 12,
                  span: 12,
                }}
              >
                <ARMButton type="primary" htmlType="submit">
                  {id ? "Update" : "Submit"}
                </ARMButton>{" "}
                <ARMButton onClick={handleReset} type="primary" danger>
                  Reset
                </ARMButton>
              </Form.Item>
            </Col>
          </Row>
        </ARMForm>
      </ARMCard>
    </CommonLayout>
  );
}
