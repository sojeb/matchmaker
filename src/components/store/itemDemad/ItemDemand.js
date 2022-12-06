import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Col, DatePicker, Form, Input, notification, Radio, Row, Select, Space, Upload } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import ARMBreadCrumbs from '../../common/ARMBreadCrumbs';
import ARMCard from '../../common/ARMCard';
import ARMButton from '../../common/buttons/ARMButton';
import CommonLayout from '../../layout/CommonLayout';
import ARMForm from '../../../lib/common/ARMForm';
import ShortUniqueId from 'short-unique-id';
import moment from 'moment';
import DepartmentService from '../../../service/DepartmentService';
import { getErrorMessage } from '../../../lib/common/helpers';
import { useSelector } from 'react-redux';
import ItemDemandService from '../../../service/ItemDemandService';
// const normFile = (e) => {
//   console.log('Upload event:', e);

//   if (Array.isArray(e)) {
//     return e;
//   }

//   return e?.fileList;
// };


import DebounceSelect from "../../common/DebounceSelect";
import ModuleService from "../../../service/ModuleService";
import UnitofMeasurementService from '../../../service/UnitofMeasurementService';

const ItemDemand = () => {

  const [form] = Form.useForm();
  const [visiable, setVisiable] = useState([true]);
  const [valuee, setValuee] = useState([]);
  const [uomValue, setUomValue] = useState([]);
  const [department, setDepartment] = useState([]);
  const { Option } = Select;
  const { id } = useParams()
  const navigate = useNavigate()

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const priority = [
    {
      name: 'IOR',
      value: 1
    },
    {
      name: 'AOG',
      value: 2
    },
    {
      name: 'Normal',
      value: 3
    },
    {
      name: 'Critical',
      value: 4
    }
  ]
const partId=[
  {
    id:1,
    name:"Tire"
  },
  {
    id:2,
    name:"Wings"
  },
  {
    id:3,
    name:"Votvoti"
  }
]



    // let ui = new ShortUniqueId({ length: 8 });
  let ui = new ShortUniqueId({
    dictionary: [
      '0', '1', '2', '3',
      '4', '5', '6', '7',
      '8', '9', 'A', 'B',
      'C', 'D', 'E', 'F',
    ],
  });
  let randomDemandNo = (ui() + "/" + new Date().getFullYear())

  const getDepartment = async () => {
    try {
      let { data } = await DepartmentService.getAllDepartment(true)
      setDepartment(data.model)

    } catch (er) {
      notification["error"]({ message: getErrorMessage(er) });
    }
  }
  let airCraft = useSelector((state) => state.aircrafts.model);
  useEffect(() => {
    getDepartment().catch(console.error)

  }, [])


  // const onFinish = async (values) => {
  //   
  //   try {

  //     let { data } = await ItemDemandService.saveItemDemand(modifiedValue)
  //     form.resetFields()
  //     notification["success"]({
  //       message: "Successfully added!",
  //     });

  //   } catch (er) {
  //     notification["error"]({ message: getErrorMessage(er) });
  //   }
  //   console.log("submit", modifiedValue);
  // }

  // const onReset = () => {
  //   form.resetFields();
  // }

  


  useEffect(() => {
      if (!id) {
          return
      }
      getItemDemandById().catch(console.error)

  }, [id])

  const getItemDemandById = async () => {
      try {
          const { data } = await ItemDemandService.getItemDemandById(id)
           console.log("edit data",data)
        //    let partNo= data.storeDemandDetailsDtoList.map((m)=>{
        //  return{
        //   label:"wings",
        //   value: m.id,
        //   disabled: undefined
        //  }})
        //  let unitMeasurementId=data.storeDemandDetailsDtoList.map((m)=>{
        
        //   )
        //    })

          //  console.log("muggi",unitMeasurementId)
          let dtoList = data.storeDemandDetailsDtoList.map((list) => {
            return  {
                quantityRequired: list.quantityRequired,
                aircraftItem: list.aircraftItem ,
                partNo:{

                },
                unitMeasurementId:{
                  
                    label:list.unitMeasurementCode,
                    value: list.unitMeasurementId,
                    key:list.unitMeasurementId,
                    disabled: undefined
                   
                }
              }
            })
            // dtoList={
            //   ...dtoList,
            //   // partNo:unitMeasurementId,
            //   unitMeasurementId:unitMeasurementId
            // }
          let modifiedData=  {
          
                isInternalDept: data.isInternalDept,
                departmentId : data.departmentId,
                demandNo:data.demandNo,
                priority:data.priority,
                aircraftId: data.aircraftId,
                demandDate:data.demandDate,
                demandDesc:data.demandDesc
            }
      
            //  setValue({...value,label: , value:})
          modifiedData={
            ...modifiedData,
            storeDemandDetailsDtoList:dtoList
          };
          console.log("get modified data",modifiedData);
          
          // form.setFieldsValue({ ...modifiedData })
      } catch (er) {
          notification["error"]({ message: getErrorMessage(er) });
      }
  }

  const onFinish = async (values) => {
      console.log(values.storeDemandDetailsDtoList)
// console.log("value",value)

      let dtoList = values.storeDemandDetailsDtoList.map((list) => {
      return  {
          partNo: list.partNo.value,
          quantityRequired: list.quantityRequired,
          unitMeasurementId: list?.unitMeasurementId?.value || null,
          aircraftItem: list.aircraftItem 
        }
      })

    const modifiedValue = {
          ...values,
          demandDate: values['demandDate']?.format('YYYY-MM-DD'),
          storeDemandDetailsDtoList: dtoList
        };

        // console.log("VALUEEEE",modifiedValue)
      try {
          if (id) {
              await ItemDemandService.updateItemDemand(id, modifiedValue)
          } else {
              let { data } = await ItemDemandService.saveItemDemand(modifiedValue)
          }
          form.resetFields()
          notification["success"]({
              message: id ? "Successfully updated!" : "Successfully added!",
          });

      } catch (er) {
          notification["error"]({ message: getErrorMessage(er) });
      }
  };

  const onReset = () => {
      form.resetFields();
  }


  const fetchUserList = async (searchText) => {
  
    let data = partId.map((part) => ({
        label: part.name,
        value: part.id
    }))
    return Promise.resolve(data);

  }
  const fetcUomList = async (searchText) => {
    let {data}= await UnitofMeasurementService.getAllUnitofMeasurement(true)
    console.log("uom",data)
    let Uom = data.model.map((uom) => ({
        label: uom.code,
        value: uom.id
    }))
    return Promise.resolve(Uom);

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
          <Breadcrumb.Item>

            &nbsp;Item Demands

          </Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard
        title="Item Demand"
      >
        <ARMForm
          {...layout}
          form={form}
          name="basic"
          initialValues={{}}
          onFinish={onFinish}
          autoComplete="off"
          style={{
            backgroundColor: "#ffffff",
          }}
        >
          <Row>
            <Col sm={20} md={10} >
              <Form.Item
                name="isInternalDept"
                label="Select Department"
                initialValue={true}
              >
                {/* <Radio.Group onChange={() => setVisiable(!visiable)} > */}
                <Radio.Group>
                  <Radio value={true}>Internal</Radio>
                  <Radio value={false}>External</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="departmentId"
                label="Department Code"
                rules={[
                  {
                    required: true,
                    message: "This field is required!"
                  },
                ]}
              >
                <Select
                  allowClear
                  placeholder="--Select Department Code--"
                >
                  {department?.map((data, index) => (
                    <Option key={index} value={data.id}>{data.code}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="demandNo"
                label="Demand No"
                rules={[
                  {
                    required: true,
                    message: "This field is required!"
                  },
                ]}
                initialValue={randomDemandNo}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="priority"
                label="Priority"
              >
                <Select
                  allowClear
                  placeholder="--Select Priority--"
                >
                  {
                    priority?.map((data, index) => (
                      <Option key={index} value={data.value}>{data.name}</Option>
                    ))
                  }
                </Select>
              </Form.Item>


            </Col>
            <Col sm={20} md={10}>
              <Form.Item
                name="aircraftId"
                label="Air Craft"
              >
                <Select
                  allowClear
                  placeholder="--Select Aircraft--"
                >
                  {
                    airCraft.map((data, index) => (
                      <Option key={index} value={data.id}>{data.aircraftName}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
              <Form.Item
                name="demandDate"
                label="Demand On"
                initialValue={moment()}
              >
                <DatePicker style={{ width: '100%' }} size='medium'

                  format="YYYY-MM-DD"

                ></DatePicker>
              </Form.Item>

              <Form.Item
                name="demandDesc"
                label="Reason of Demand"
                style={{ marginBottom: "3px" }}
              >

                <TextArea />
              </Form.Item>
              {/* <Form.Item
                name="attachment"
                label="Upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                hidden={visiable}
              initialValue={null}
              >
                <Upload name="logo" action="" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item> */}
            </Col>
          </Row>

          <ARMCard
            title={"Item Demand Details"}
            style={{ marginTop: "10px" }}
          >
            <Form.List name="storeDemandDetailsDtoList"
            >

            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: 'flex',
                      marginBottom:4,
                    }}
                    size={30}
                    align="baseline"
                    wrap
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'partNo']}
                    >
                   {/*<Input placeholder="Part No" />*/}
                    <DebounceSelect
                        showSearch
                        value={valuee}
                        placeholder="Part No"
                        fetchOptions={fetchUserList}
                        onChange={(newValue) => {
                          setValuee(newValue);
                        }}
                        style={{
                          width: '250px',
                        }}
                    />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'aircraftItem']}

                    >
                      <Input placeholder="Aircraft Item" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'quantityRequired']}
                      rules={[
                        {
                          required: true,
                          message: 'This field is required!',
                        },
                      ]}
                    >
                      <Input placeholder="QTY" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'unitMeasurementId']}

                    >
                      {/* <Input placeholder="UOM" /> */}
                      <DebounceSelect
                        showSearch
                        value={uomValue}
                        placeholder="UOM"
                        fetchOptions={fetcUomList}
                        onChange={(newValue) => {
                       
                          setUomValue(newValue);
                        }}
                        style={{
                          width: '250px',
                        }}
                    />
             
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item wrapperCol={{ ...layout.labelCol }}>
                  <ARMButton type="primary" onClick={() => add()} block icon={<PlusOutlined />}>Add</ARMButton>


                  </Form.Item>
                </>
              )}
            </Form.List>
          </ARMCard>
          <Row>
            <Col sm={20} md={10}>
              <Form.Item style={{ marginTop: '10px' }} wrapperCol={{ ...layout.wrapperCol }}>
                <Space size="small">
                  <ARMButton type="primary" htmlType="submit">
                  {id ? 'Update' : 'Submit'}
                  </ARMButton>
                  <ARMButton
                    onClick={onReset}
                    type="primary"
                    danger
                  >
                    Reset
                  </ARMButton>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </ARMForm>
      </ARMCard>
    </CommonLayout>
  );
};

export default ItemDemand;