import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import CommonLayout from "../../layout/CommonLayout";
import { Col, Form, Input, Row } from "antd";
import ARMButton from "../../common/buttons/ARMButton";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import { useLocations } from "../../../lib/hooks/planning/useLocations";
import ARMForm from "../../../lib/common/ARMForm";

export default function AddLocations() {
  const { id, onFinish, form } = useLocations();

  const handleReset = () => {
    form.resetFields();
  }

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
            <Link to="/planning/locations">Locations</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Location</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle("locations", "/planning/locations", false)}>
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
            name: "",
            description: "",
            remarks: "",
          }}
          autoComplete="off"
          style={{
            backgroundColor: "#ffffff",
          }}
          onFinish={onFinish}
        >
          <Row gutter={[6, 6]} justify="start">
            <Col className="gutter-row" lg={12} xl={12} md={12} sm={24} xs={24}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input you name",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input />
              </Form.Item>

              <Form.Item label="Remarks" name="remarks">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={24} xs={12}>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <ARMButton type="primary" htmlType="submit">
                  {!id ? "Submit" : "Update"}
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
