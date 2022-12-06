import CommonLayout from "../layout/CommonLayout";
import {
    Breadcrumb,
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    notification,
    Row,
    Select,
    Space
} from "antd";
import ARMCard from "../common/ARMCard";
import ARMButton from "../common/buttons/ARMButton";
import {Link, useNavigate, useParams} from "react-router-dom";
import ModuleService from "../../service/ModuleService";
import {getErrorMessage} from "../../lib/common/helpers";
import React, {useEffect, useState} from "react";
import {getLinkAndTitle} from "../../lib/common/TitleOrLink";
import ARMBreadCrumbs from "../common/ARMBreadCrumbs";
import ARMForm from "../../lib/common/ARMForm";
import TextArea from "antd/es/input/TextArea";
import RibbonCard from "../common/forms/RibbonCard";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import styled from "styled-components";

const {Option} = Select;

const FormControl = styled.div`
           .ant-form-item-control{
                 max-width: 100% !important;
            }
    `

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const CandidateAdd = () => {

    const {id} = useParams()
    const navigate  =useNavigate()
    const [form] = Form.useForm();

    const [candidate,setCandidate] = useState({})

    const OPTIONS = ['S.S.C', 'H.S.C', 'Bsc', 'Msc','Others'];
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));


    useEffect(() => {
        if (!id) {
            //form.resetFields()
            return
        }
        //getCandidateById().catch(console.error)

    }, [id])

    const getCandidateById = async () => {
        try {
            const {data} = await ModuleService.getModuleById(id)+
            form.setFieldsValue({...data})
            setCandidate({...data})
            //console.log("single module",data)

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    }

    const onFinish = async (values) => {
        console.log("values", values)
        try {
            if (id) {

            } else {

            }
            form.resetFields()
           // navigate('/configurations/modules')
            notification["success"]({
                message: id ? "Successfully updated!" : "Successfully added!",
            });

        } catch (er) {
            notification["error"]({message: getErrorMessage(er)});
        }
    };

    const onReset = () => {
        if (id) {
            form.setFieldsValue({...candidate})
        } else {
            form.resetFields();
        }
    }

    return (
        <CommonLayout>
            <ARMBreadCrumbs>
                <Breadcrumb separator="/">
                    <Breadcrumb.Item>
                        <i className="fas fa-user" />
                        <Link to='/candidate'>
                            &nbsp; Candidate
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {id ? 'Edit' : 'Add'}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </ARMBreadCrumbs>

            <ARMForm
                {...layout}
                form={form}
                name="candidateInfos"
                onFinish={onFinish}
                initialValues={{
                    isActive: true,
                    educationDetails: [{}],
                    siblings: [{}],
                    familyMembers: [{}]
                }}
                scrollToFirstError
                labelWrap
            >

            <ARMCard title={
                getLinkAndTitle('Candidate', '/candidates')
            }
            >
                    <RibbonCard ribbonText="Basic Information">
                        <Row gutter={[5,5]} style={{marginBottom:'7px'}}>
                            <Col sm={24} md={11}>
                                <Form.Item
                                    className="mb-5"
                                    name="name"
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                            message: "This field is required!"
                                        },
                                    ]}
                                >
                               <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="age"
                                    label="Age"
                                >
                                    <InputNumber style={{width: '100%'}} />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="height"
                                    label="Height"
                                    rules={[
                                        {
                                            required: true,
                                            message: "This field is required!"
                                        },
                                    ]}
                                >
                                   <InputNumber style={{width: '100%'}}/>
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="complexion"
                                    label="Complexion"
                                >
                                    <InputNumber style={{width: '100%'}}/>
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="weight"
                                    label="Weight"
                                >
                                    <InputNumber style={{width: '100%'}}/>
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="dob"
                                    label="Date of Birth"
                                >
                                    <DatePicker style={{width: '100%'}} />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="guardianNumber"
                                    label="Guardian Number"
                                >
                                    <InputNumber style={{width: '100%'}}/>
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="candidateNumber"
                                    label="Candidate Number"
                                >
                                    <InputNumber style={{width: '100%'}}/>
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="totalNumber"
                                    label="Total Number"
                                >
                                    <InputNumber style={{width: '100%'}}/>
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="currentAddress"
                                    label="Current Address"
                                >
                                    <TextArea />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="permanentAddress"
                                    label="Permanent Address"
                                  /*  rules={[
                                        {
                                            required: true,
                                            message: "This field is required!"
                                        },
                                    ]}*/
                                >
                                    <TextArea />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="fatherName"
                                    label="Father Name"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="fatherIsAlive"
                                    valuePropName="checked"
                                    label="Father IsAlive?"
                                >
                                    <Checkbox/>
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="motherName"
                                    label="Mother Name"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="motherIsAlive"
                                    valuePropName="checked"
                                    label="Mother IsAlive?"
                                >
                                    <Checkbox />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="fatherInfo"
                                    label="Father Info"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="motherInfo"
                                    label="Mother Info"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="imageUrl"
                                    label="Image Url"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="nidCardUrl"
                                    label="Nid Card Url"
                                >
                                    <Input />
                                </Form.Item>

                            </Col>
                            <Col sm={24} md={11}>
                                <Form.Item
                                    className="mb-5"
                                    name="hobby"
                                    label="Hobby"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="propertyDetails"
                                    label="Property Details"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="futurePlan"
                                    label="Future Plan"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="email"
                                    label="Email"
                                      rules={[
                                         {
                                           type: "email"
                                         },
                                     ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="divorceReason"
                                    label="Divorce Reason"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="occupation"
                                    label="Occupation"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="fatherProfession"
                                    label="Father Profession"
                                >
                                    <Select placeholder="..select professon..">
                                        <Option value="1">Doctor</Option>
                                        <Option value="2">Engineer</Option>
                                        <Option value="0">Other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="motherProfession"
                                    label="Mother Profession"
                                >
                                    <Select placeholder="..select professon..">
                                        <Option value="1">Doctor</Option>
                                        <Option value="2">Engineer</Option>
                                        <Option value="0">Other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="fatherEducation"
                                    label="Father Education"
                                >
                                    <Select placeholder="..select education..">
                                        <Option value="1">Bsc</Option>
                                        <Option value="2">Msc</Option>
                                        <Option value="0">Other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="motherEducation"
                                    label="Mother Education"
                                >
                                    <Select placeholder="..select education..">
                                        <Option value="1">Bsc</Option>
                                        <Option value="2">Msc</Option>
                                        <Option value="0">Other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="parentMaritalStatus"
                                    label="Parent Marital Status"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="userMaritalStatus"
                                    label="User Marital Status"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="bloodGroup"
                                    label="Blood Group"
                                >
                                   <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="religion"
                                    label="Religion"
                                >
                                    <Select placeholder="..Select your religion..">
                                        <Option value="1">Muslim</Option>
                                        <Option value="2">Hindu</Option>
                                        <Option value="0">Other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="nature"
                                    label="Nature"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="currentDistrict"
                                    label="Current District"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="gender"
                                    label="Gender"
                                >
                                    <Input placeholder="Write Male or Female..."/>
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="citizenship"
                                    label="Citizenship"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="homeDistrict"
                                    label="Home District"
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="candidateProfession"
                                    label="Profession"
                                >
                                    <Select placeholder="..Select your profession..">
                                        <Option value="1">Doctor</Option>
                                        <Option value="2">Engineer</Option>
                                        <Option value="0">Other</Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    className="mb-5"
                                    name="salary"
                                    label="Salary"
                                >
                                    <InputNumber style={{width: '100%'}} />
                                </Form.Item>

                            </Col>
                        </Row>
                        <RibbonCard ribbonText="Candidate Complexion" ribbonColor="magenta">
                            <Row>
                                <Col sm={24} md={11}>
                                    <Form.Item
                                        className="mb-5"
                                        name={["candidateComplexion","color"]}
                                        label="Color"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col sm={24} md={11}>
                                    <Form.Item
                                        className="mb-5"
                                        name={["candidateComplexion","hair"]}
                                        label="Hair"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </RibbonCard>

                        <FormControl>
                            <RibbonCard ribbonText="Candidate Education" ribbonColor="purple">
                                <Form.List name="educationDetails">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField },index) => (
                                                <Row gutter={16} key={index}>
                                                    <Col xs={24} sm={24} md={6}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'exam']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'required...',
                                                                },
                                                            ]}
                                                        >
                                                            <Select placeholder="Select Exam...">
                                                                <Option value="ssc">S.S.C</Option>
                                                                <Option value="hsc">H.S.C</Option>
                                                                <Option value="bsc">B.S.C</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} sm={24} md={6}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'institutionName']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'required...',
                                                                },
                                                            ]}
                                                        >
                                                            <Select placeholder="Select Institution Name...">
                                                                <Option value="1">DU</Option>
                                                                <Option value="2">JU</Option>
                                                                <Option value="3">Others</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} sm={24} md={4}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'passingGrade']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'required...',
                                                                },
                                                            ]}
                                                        >
                                                            <Select placeholder="Select passing grade...">
                                                                <Option value="1">A+</Option>
                                                                <Option value="2">A</Option>
                                                                <Option value="3">B</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} sm={24} md={5}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'passingYear']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'required...',
                                                                },
                                                            ]}
                                                        >
                                                            <DatePicker style={{width: '100%'}} placeholder="Passing year..."/>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} sm={12} md={3} className="minus_button">
                                                        <Button danger onClick={() => remove(name)}>
                                                            <MinusCircleOutlined  />
                                                        </Button>
                                                    </Col>
                                                </Row>

                                            ))}
                                            <Form.Item>
                                                <Button type="primary" onClick={() => add()} icon={<PlusOutlined />}>
                                                    Add field
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </RibbonCard>
                        </FormControl>

                        <FormControl>
                            <RibbonCard ribbonText="Candidate Siblings" ribbonColor="cyan">
                                <Form.List name="siblings">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField },index) => (
                                                <Row gutter={16} key={index}>
                                                    <Col xs={24} sm={24} md={5}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'siblingName']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'required...',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Siblings name..."/>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} sm={24} md={3}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'siblingPosition']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'required...',
                                                                },
                                                            ]}
                                                        >
                                                            <InputNumber style={{width: '100%'}} placeholder="Siblings position..."/>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} sm={24} md={4}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'education']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'required...',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Siblings education..."/>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} sm={24} md={5}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'profession']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'required...',
                                                                },
                                                            ]}
                                                        >
                                                            <Select placeholder="Siblings Profession...">
                                                                <Option value="1">Doctor</Option>
                                                                <Option value="2">Engineer</Option>
                                                                <Option value="0">Others</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} sm={24} md={4}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'maritalStatus']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'required...',
                                                                },
                                                            ]}
                                                        >
                                                            <Select placeholder="Marital Status...">
                                                                <Option value="1">Married</Option>
                                                                <Option value="2">Unmarried</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} sm={12} md={3} className="minus_button">
                                                        <Button danger onClick={() => remove(name)}>
                                                            <MinusCircleOutlined  />
                                                        </Button>
                                                    </Col>
                                                </Row>

                                            ))}
                                            <Form.Item>
                                                <Button type="primary" onClick={() => add()} icon={<PlusOutlined />}>
                                                    Add field
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </RibbonCard>
                        </FormControl>

                        <FormControl>
                            <RibbonCard ribbonText="Family members" ribbonColor="volcano">
                                <Form.List name="familyMembers">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField },index) => (
                                                <Row gutter={16} key={index}>
                                                    <Col xs={24} sm={24} md={4}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'name']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'required...',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Name..."/>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} sm={24} md={4}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'relationToCandidate']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'required...',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Relation to Candidate..."/>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} sm={24} md={4}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'familyMemberProfession']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'required...',
                                                                },
                                                            ]}
                                                        >
                                                            <Select placeholder="Family member Profession...">
                                                                <Option value="1">Doctor</Option>
                                                                <Option value="2">Engineer</Option>
                                                                <Option value="0">Others</Option>
                                                            </Select>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} sm={24} md={4}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'exam']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'required...',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Exam..."/>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} sm={24} md={5}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'details']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'required...',
                                                                },
                                                            ]}
                                                        >
                                                            <TextArea placeholder="write Details..."/>
                                                        </Form.Item>
                                                    </Col>

                                                    <Col xs={24} sm={12} md={3} className="minus_button">
                                                        <Button danger onClick={() => remove(name)}>
                                                            <MinusCircleOutlined  />
                                                        </Button>
                                                    </Col>
                                                </Row>

                                            ))}
                                            <Form.Item>
                                                <Button type="primary" onClick={() => add()} icon={<PlusOutlined />}>
                                                    Add field
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </RibbonCard>
                        </FormControl>
                    </RibbonCard>

            </ARMCard>

            <ARMCard title="Partner Expectations">
                <RibbonCard ribbonText="Partner Expectation" ribbonColor="green">
                    <Row gutter={[5,5]}>
                        <Col sm={24} md={11}>
                            <Form.Item
                                className="mb-5"
                                name={["partnerExpectation","hobby"]}
                                label="Hobby"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                className="mb-5"
                                name={["partnerExpectation","heightUpper"]}
                                label="Height Upper"
                                /*  rules={[
                                      {
                                          required: true,
                                          message: "This field is required!"
                                      },
                                  ]}*/
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                className="mb-5"
                                name={["partnerExpectation","heightLower"]}
                                label="Height Lower"
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                className="mb-5"
                                name={["partnerExpectation","educations"]}
                                label="Education"
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="expected education..."
                                    value={selectedItems}
                                    onChange={setSelectedItems}
                                    style={{
                                        width: '100%',
                                    }}
                                    maxTagCount={5}
                                >
                                    {filteredOptions.map((item) => (
                                        <Select.Option key={item} value={item}>
                                            {item}
                                        </Select.Option>
                                    ))}
                                </Select>

                            </Form.Item>

                        </Col>
                        <Col sm={24} md={11}>
                            <Form.Item
                                className="mb-5"
                                name={["partnerExpectation","widthUpper"]}
                                label="Width Upper"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                className="mb-5"
                                name={["partnerExpectation","widthLower"]}
                                label="Width Lower"
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                className="mb-5"
                                name={["partnerExpectation","familyStatus"]}
                                label="Family Status"
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>
                    <RibbonCard ribbonText="Partner Complexion" ribbonColor="magenta">
                        <Row>
                            <Col sm={24} md={11}>
                                <Form.Item
                                    className="mb-5"
                                    name={["partnerExpectation","partnerComplexion","color"]}
                                    label="Color"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col sm={24} md={11}>
                                <Form.Item
                                    className="mb-5"
                                    name={["partnerExpectation","partnerComplexion","hair"]}
                                    label="Hair"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                    </RibbonCard>
                </RibbonCard>
                <Row className="mt-5">
                    <Col sm={20} md={10}>
                        <Form.Item wrapperCol={{...layout.wrapperCol, offset: 0}}>
                            <Space size="small">
                                <ARMButton type="primary" htmlType="submit">
                                    {id ? 'Update' : 'Submit'}
                                </ARMButton>
                                <ARMButton onClick={onReset} type="primary" danger>
                                    Reset
                                </ARMButton>
                            </Space>
                        </Form.Item>
                    </Col>
                </Row>
            </ARMCard>

        </ARMForm>

        </CommonLayout>
    )
}
export default CandidateAdd