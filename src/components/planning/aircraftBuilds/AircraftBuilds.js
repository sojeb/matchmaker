import {
  Breadcrumb,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  notification,
  Row,
  Select,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { boolean } from "yup";
import { getErrorMessage } from "../../../lib/common/helpers";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import AircraftBuildsService from "../../../service/AircraftBuildsService";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";
import moment from "moment";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

const AircraftBuilds = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const [location, setLocation] = useState([]);

  const [aircraft, setAircraft] = useState([]);
  const [part, setPart] = useState([]);
  const [model, setModel] = useState([]);
  const [higherModel, setHigherModel] = useState([]);
  const [higherPart, setHigherPart] = useState([]);
  const [position, setPosition] = useState([]);

  const [higherModelId, setHigherModelId] = useState();
  const [modelId, setModelId] = useState();

  const [isOver, setIsOver] = useState(false);
  const [isShop, setIsShop] = useState(false);

  const [p, setP] = useState();
  const [l, setL] = useState();
  const [aicrfatId, setAircraftId] = useState();

  // const formValues = form.getFieldsValue();
  // const aicfatId = formValues?.aircraftId;

  console.log({ aicrfatId });

  const getAircraftId = (e) => {
    setAircraftId(e);
  };
  const getHigherModelId = (e) => {
    console.log("higher", e);
    setHigherModelId(e);
  };
  const getModelId = (e) => {
    console.log("model", e);
    setModelId(e);
  };

  useEffect(() => {
    getAllAircraft();
  }, []);

  useEffect(() => {
    if (aicrfatId) {
      getAllHigherModel(aicrfatId);
    }
  }, [aicrfatId]);

  useEffect(() => {
    if (higherModelId) {
      getAllModel();
      getAllHigherPart();
    }
    return;
  }, [higherModelId]);

  useEffect(() => {
    if (modelId) {
      getAllPart();
    }
    return;
  }, [modelId]);

  useEffect(() => {
    if (higherModelId && modelId) {
      getLocation();
    }
  }, [higherModelId, modelId]);

  const onChange = () => {
    setIsOver(!isOver);
  };
  const onShopChange = () => {
    setIsShop(!isShop);
  };

  useEffect(() => {
    loadSingleData(id);
  }, [id]);

  const loadSingleData = async (id) => {
    try {
      const { data } = await AircraftBuildsService.singleData(id);
      setIsOver(data.isOverhauled);
      setIsShop(data.isShopVisited);
      setAircraftId(data.aircraftId);
      setHigherModelId(data.higherModelId);
      setModelId(data.modelId);
      console.log("air", data.aircraftId);
      console.log("d", data);
      // const partId = data.aircraftPart.partId;
      // const hPartId = data.aircraftHigherPart.partId;
      // const hPartNo = data.aircraftHigherPart.partNo;
      // setHigherPart([data.aircraftHigherPart]);
      // setPart([data.aircraftPart]);
      // setModel([data]);
      // setHigherModel([
      //   {
      //     modelName: data.higherModelName,
      //     modelId: data.higherModelId,
      //   },
      // ]);
      // setLocation([data]);
      // console.log("h", higherModel);
      setLocation([
        {
          locationId: data.locationId,
          locationName: data.locationName,
          positionId: data.positionId,
          positionName: data.positionName,
        },
      ]);
      setModel([{ modelId: data.modelId, modelName: data.modelName }]);
      setHigherPart([{ partId: data.higherPartId, partNo: data.higherPartNo }]);
      setHigherModel([
        {
          modelName: data.higherModelName,
          modelId: data.higherModelId,
        },
      ]);
      form.setFieldsValue({
        ...data,

        attachDate: moment(data.attachDate),
        comManufactureDate: data.comManufactureDate
          ? moment(data.comManufactureDate)
          : null,
        comCertificateDate: data.comCertificateDate
          ? moment(data.comCertificateDate)
          : null,
      });
    } catch (er) {}
  };

  const getLocation = async () => {
    try {
      const { data } = await AircraftBuildsService.getLocationAndPosition(
        modelId,
        higherModelId
      );
      setLocation(data);
    } catch (er) {}
  };

  const getAllAircraft = async () => {
    try {
      const { data } = await AircraftBuildsService.getAllAircraft();
      setAircraft(data.model);
    } catch (er) {}
  };

  const getAllHigherModel = async (aicrfatId) => {
    try {
      const { data } =
        await AircraftBuildsService.getAllHigherModelByAircraftId(aicrfatId);
      setHigherModel(data);
    } catch (er) {}
  };

  const getAllHigherPart = async () => {
    try {
      const { data } = await AircraftBuildsService.getAllHigherPartByModelId(
        higherModelId
      );
      setHigherPart(data);
    } catch (er) {}
  };

  const getAllModel = async () => {
    try {
      const { data } = await AircraftBuildsService.getAllModelByHigherModelId(
        higherModelId
      );
      setModel(data);
    } catch (er) {}
  };

  const getAllPart = async () => {
    try {
      const { data } = await AircraftBuildsService.getAllPartByModelId(modelId);
      setPart(data);
    } catch (er) {}
  };
  const getPostionIdByLocationId = (locationId) => {
    let data = location.find((l) => l.locationId == locationId);
    console.log("Selected object", data);

    console.log("location ID: ", locationId);
    console.log("Position ID: ", data.positionId);

    setL(data.positionId);
    form.setFieldsValue({ ...form, positionId: data.positionId });
  };

  const getLocationIdByPositionId = (positionId) => {
    let data = location.find((p) => p.positionId == positionId);
    console.log("Selected object", data);

    console.log("Position ID: ", positionId);
    console.log("Location ID: ", data.locationId);

    setP(data.locationId);
    form.setFieldsValue({ ...form, locationId: data.locationId });
  };

  const onFinish = async (values) => {
    // let splitData = values.locationId.split("-");
    // let po = splitData[1];
    if (id) {
      const frmate = {
        ...values,
        locationId: values.locationId,
        positionId: values.positionId,
        isOverhauled: isOver,
        isShopVisited: isShop,

        aircraftPart: {
          id: values.aircraftPartId,
          partId: values.partId,
          higherPartId: values.higherPartId,
        },
        attachDate: values["attachDate"].format("YYYY-MM-DD"),
        comManufactureDate:
          values.comManufactureDate != null
            ? values["comManufactureDate"].format("YYYY-MM-DD")
            : null,
        comCertificateDate:
          values.comCertificateDate != null
            ? values["comCertificateDate"].format("YYYY-MM-DD")
            : null,
      };
      try {
        const { data } = await AircraftBuildsService.updateAircarftBuild(
          id,
          frmate
        );
         navigate("/planning/aircraft/builds");
         
        notification["success"]({
          message: "Aircraft Builds successfully updated",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    } else {
      const frmate = {
        ...values,
        locationId: values.locationId,
        positionId: values.positionId,
        isOverhauled: isOver,
        isShopVisited: isShop,

        aircraftPart: {
          partId: values.partId,
          higherPartId: values.higherPartId,
        },

        attachDate: values["attachDate"].format("YYYY-MM-DD"),
        comManufactureDate:
          values.comManufactureDate != null
            ? values["comManufactureDate"].format("YYYY-MM-DD")
            : null,
        comCertificateDate:
          values.comCertificateDate != null
            ? values["comCertificateDate"].format("YYYY-MM-DD")
            : null,
      };
      try {
        const { data } = await AircraftBuildsService.saveAircraftBuild(frmate);
        navigate("/planning/aircraft/builds");
        notification["success"]({
          message: "Aircraft Builds successfully created",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    }
  };
  const onReset = async () => {};

  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            {" "}
            <Link to="/planning">
              {" "}
              <i className="fas fa-chart-line" />
              &nbsp; Planning
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to="/planning/aircraft/builds">Aircraft Builds</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>Aircraft Build</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard
        title={getLinkAndTitle("Aircraft Builds", "/planning/aircraft/builds")}
      >
        <Form
          {...layout}
          form={form}
          initialValues={{
            higherSerial: "",
            serial: "",
          }}
          name="AircraftBuilds"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Row gutter={[6, 6]}>
            <Col sm={22} md={12}>
              <Form.Item
                name="aircraftId"
                label="Aircraft"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  onChange={(e) => getAircraftId(e)}
                  placeholder="--Select Aircraft--"
                  showSearch
                  filterOption={(inputValue, option) =>
                    option.children
                      .toString("")
                      .toLowerCase()
                      .includes(inputValue.toLowerCase())
                  }
                >
                  {aircraft?.map((item) => {
                    return (
                      <Select.Option key={item.id} value={item.id}>
                        {item.aircraftName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="higherModelId"
                label="Higher Model"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="--Select Higher Model--"
                  onChange={(e) => getHigherModelId(e)}
                >
                  {higherModel?.map((item) => {
                    return (
                      <Select.Option key={item.modelId} value={item.modelId}>
                        {item.modelName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="higherPartId"
                label="Higher Part"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="--Select Higher Part--">
                  {higherPart?.map((item) => {
                    return (
                      <Select.Option key={item.partId} value={item.partId}>
                        {item.partNo}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="higherSerialNo"
                label="Higher Serial No"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="modelId"
                label="Model"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="--Select Model--"
                  onChange={(e) => getModelId(e)}
                >
                  {model?.map((item) => {
                    return (
                      <Select.Option key={item.modelId} value={item.modelId}>
                        {item.modelName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name="partId"
                label="Part"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="--Select Part--">
                  {part?.map((item) => {
                    return (
                      <Select.Option key={item.partId} value={item.partId}>
                        {item.partNo}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name="serialNo"
                label="Serial No"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="locationId"
                label="Location"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="--Select Location--"
                  onChange={getPostionIdByLocationId}
                >
                  {location?.map((item) => {
                    return (
                      <Select.Option
                        key={item.locationId}
                        value={item.locationId}
                      >
                        {item.locationName} 
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="positionId"
                label="Position"
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select
                  placeholder="--Select Location--"
                  onChange={getLocationIdByPositionId}
                >
                  {location?.map((item) => {
                    return (
                      <Select.Option
                        key={item.positionId}
                        value={item.positionId}
                      >
                        {item.positionName} 
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name="tsnHour"
                label="Tsn Hour  "
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="tsnCycle"
                label="Tsn Hour Cycle "
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col sm={22} md={12}>
              <Row style={{ marginLeft: "10px" }}>
                <Col md={10} offset={4}>
                  <Form.Item
                    name="isOverhauled"
                    label="Is Overhauled "
                    valuePropName="checked"
                    style={{ marginBottom: "12px" }}
                    rules={[
                      {
                        type: boolean,
                      },
                    ]}
                  >
                    &nbsp; <Checkbox checked={isOver} onChange={onChange} />
                  </Form.Item>
                </Col>
                <Col md={10}>
                  <Form.Item
                    name="isShopVisited"
                    label="Is Shop Visited "
                    valuePropName="checked"
                    style={{ marginBottom: "12px" }}
                    rules={[
                      {
                        type: boolean,
                      },
                    ]}
                  >
                    &nbsp; <Checkbox checked={isShop} onChange={onShopChange} />
                  </Form.Item>
                </Col>
              </Row>

              {isOver == true ? (
                <>
                  <Form.Item
                    name="tsoHour"
                    label="Tso Hour "
                    style={{ marginBottom: "12px" }}
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="tsoCycle"
                    label="Tso Cycle"
                    style={{ marginBottom: "12px" }}
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="tslsvHour"
                    label="Tslsv Hour "
                    style={{ marginBottom: "12px" }}
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="tslsvCycle"
                    label="Tslsv Cycle  "
                    style={{ marginBottom: "12px" }}
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </>
              ) : null}

              {isShop == true && isOver == false ? (
                <>
                  <Form.Item
                    name="tslsvHour"
                    label="Tslsv Hour "
                    style={{ marginBottom: "12px" }}
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name="tslsvCycle"
                    label="Tslsv Cycle  "
                    style={{ marginBottom: "12px" }}
                    rules={[
                      {
                        required: false,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </>
              ) : null}

              <Form.Item
                name="fitLifeHour"
                label="Fit Life Hour "
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="fitLifeCycle"
                label="Fit Life Cycle  "
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="attachDate"
                label="Attach Date "
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="comManufactureDate"
                label="Com Manifacture Date  "
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item
                name="comCertificateDate"
                label="Com Certificate Date  "
                style={{ marginBottom: "12px" }}
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={22} md={12}>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Space size="small">
                  <ARMButton size="medium" type="primary" htmlType="submit">
                    {id ? "Update" : "Submit"}
                  </ARMButton>
                  <ARMButton
                    onClick={onReset}
                    size="medium"
                    type="primary"
                    danger
                  >
                    Reset
                  </ARMButton>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </ARMCard>
    </CommonLayout>
  );
};

export default AircraftBuilds;
