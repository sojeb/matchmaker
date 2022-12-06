import { PlusOutlined } from "@ant-design/icons";
import { Col, DatePicker, Divider, Form, Input, Row, Select, Space, Typography } from "antd";
import React from "react";
import ARMButton from "../../../components/common/buttons/ARMButton";
import ARMForm from "../ARMForm";
const { Option } = Select;

const ARMAircraftAdd = ({ onNameChange, addItem, id, aircraftModelFamilies, name, onFinish, form, onReset }) => {
  return (
    <ARMForm
      form={form}
      name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
      scrollToFirstError
    >
      <Row justify="center" gutter={10}>
        <Col className="gutter-row" lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            label="Aircraft Model Family"
            name="aircraftModelId"
            rules={[
              {
                required: true,
                message: "Please select an option",
              },
            ]}
          >
            <Select
              placeholder="Select a Aircraft Model Family"
              allowClear
              dropdownRender={(menu) => (
                <>
                  <Space
                    align="center"
                    style={{
                      padding: "4px 8px",
                      width: "100%",
                    }}
                  >
                    <Input placeholder="Add new aircraft model" style={{ width: "100%" }} value={name} onChange={onNameChange} />
                    <Typography.Link
                      onClick={addItem}
                      style={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      <PlusOutlined /> Add New Aircraft Model
                    </Typography.Link>
                  </Space>
                  {menu}
                  <Divider
                    style={{
                      margin: "8px 0",
                    }}
                  />
                </>
              )}
            >
              {aircraftModelFamilies?.map((aircraftModel) => (
                <Option key={aircraftModel.id} value={aircraftModel.id}>
                  {aircraftModel.aircraftModelName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Name"
            name="aircraftName"
            rules={[
              {
                required: true,
                message: "Please input Name",
              },
              {
                max: 255,
                message: "Maximum 255 character allowed",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: false,
                message: "Please input Type",
              },
              {
                max: 255,
                message: "Maximum 255 character allowed",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date Of Manufacture"
            name="manufactureDateTime"
            rules={[
              {
                type: "object",
                required: false,
                message: "Please input Date Of Manufacture",
              },
            ]}
          >
            <DatePicker style={{ width: "100%" }} showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item
            label="Registration"
            name="registration"
            rules={[
              {
                required: false,
                message: "Please input Registration",
              },
              {
                max: 255,
                message: "Maximum 255 character allowed",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Airframe Serial No."
            name="airframeSerial"
            rules={[
              {
                required: false,
                message: "Please input Airframe Serial No.",
              },
              {
                max: 255,
                message: "Maximum 255 character allowed",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col className="gutter-row" lg={12} md={24} sm={24} xs={24}>
          <Form.Item
            name="civilAviationRegistration"
            label="Civil Aviation Registration No:"
            rules={[
              {
                max: 255,
                message: "Maximum 255 character allowed",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="shortName"
            label="Short name of aircraft:"
            rules={[
              {
                max: 255,
                message: "Maximum 255 character allowed",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="airFrameTotalTime" label="Airframe Total Time:">
            <Input />
          </Form.Item>
          <Form.Item name="airframeTotalCycle" label="Airframe Total Cycle:">
            <Input />
          </Form.Item>
          <Form.Item
            name="cabinSeatConfig"
            label="Cabin Seat Configuration:"
            rules={[
              {
                max: 255,
                message: "Maximum 255 character allowed",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="inspectionLocation"
            label="Inspection Location:"
            rules={[
              {
                max: 255,
                message: "Maximum 255 character allowed",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Row justify={"center"} gutter={10}>
        <Col className="gutter-row" lg={18} md={12} sm={14} xs={24}>
          <Form.Item>
            <Space size="small">
              <ARMButton type="primary" htmlType="submit">
                {id ? "Update" : "Submit"}
              </ARMButton>
              <ARMButton onClick={onReset} type="primary" danger>
                Reset
              </ARMButton>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </ARMForm>
  );
};

export default ARMAircraftAdd;
