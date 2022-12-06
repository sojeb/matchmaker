import { Breadcrumb, Col, Form, Input, Row, Select, Space, Divider, Button, Modal } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ARMAircraftAdd from "../../../lib/common/planning/ARMAircraftAdd";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import { useAircrafts, useAircraftsModal, useSeatingConfiguration } from "../../../lib/hooks/planning/aircrafts";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";

const SeatingConfiguration = () => {
  const { showModal, isModalVisible, handleCancel, onFinish: onAircraftsFinish } = useAircraftsModal();
  const { onNameChange, addItem, aircraftModelFamilies, name, onReset: onAirReset, form: onAirForm } = useAircrafts();
  const { id, form, onFinish, cabin, aircraft, onReset } = useSeatingConfiguration();

  return (
    <div>
      <CommonLayout>
        <ARMBreadCrumbs>
          <Breadcrumb separator="/">
            <Breadcrumb.Item>
              <i className="fas fa-chart-line" />
              <Link to="/planning">&nbsp; Planning</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>
              <Link to="/planning/seating/configurations">Seating configurations</Link>
            </Breadcrumb.Item>

            <Breadcrumb.Item>{id ? "edit" : "Add"}</Breadcrumb.Item>
          </Breadcrumb>
        </ARMBreadCrumbs>

        <ARMCard title={getLinkAndTitle(`Seating configuration`, `/planning/seating/configurations`)}>
          <Row>
            <Col span={10}>
              <Form
                form={form}
                name="basic"
                onFinish={onFinish}
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
              >
                <Form.Item
                  name="cabinId"
                  label="Cabin"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select placeholder="--Select cabin--">
                    {cabin?.map((item) => {
                      return (
                        <Option key={item.cabinId} value={item.cabinId}>
                          {item.codeTitle}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item
                  name={["aircraftId"]}
                  label="Aircraft"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    placeholder="Select an aircraft"
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
                          <Button type="primary" onClick={showModal}>
                            Add New Aircraft
                          </Button>
                          <Modal title="Add New Aircraft" centered visible={isModalVisible} onCancel={handleCancel} width={1600} footer={null}>
                            <ARMAircraftAdd onReset={onAirReset} form={onAirForm} onNameChange={onNameChange} addItem={addItem} aircraftModelFamilies={aircraftModelFamilies} name={name} onFinish={onAircraftsFinish} />
                          </Modal>
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
                    {aircraft?.map((item) => {
                      return (
                        <Option key={item.id} value={item.id}>
                          {item.aircraftName}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["noOfSeats"]}
                  label="Number of seat"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ wrapperCol: 16, offset: 8 }}>
                  <ARMButton type="primary" htmlType="submit">
                    {id ? "Update" : "Add"}
                  </ARMButton>{" "}
                  <ARMButton type="primary" onClick={onReset} danger>
                    Reset
                  </ARMButton>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </ARMCard>
      </CommonLayout>
    </div>
  );
};

export default SeatingConfiguration;
