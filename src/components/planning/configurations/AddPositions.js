import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import CommonLayout from "../../layout/CommonLayout";
import { Col, Form, Input, Row } from "antd";
import ARMButton from "../../common/buttons/ARMButton";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import { usePostions } from "../../../lib/hooks/planning/usePositions";
import ARMForm from "../../../lib/common/ARMForm";

export default function AddPositions() {
  const { id, onFinish, form, handleReset } = usePostions();
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
            <Link to="/planning/positions">Positions</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Position</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle("positions", "/planning/positions", false)}>
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

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <ARMButton size="medium" type="primary" htmlType="submit">
                  {!id ? "Submit" : "Update"}
                </ARMButton>{" "}
                <ARMButton onClick={handleReset} size="medium" type="primary" danger>
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
