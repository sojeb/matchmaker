import { Checkbox, Col, Form, InputNumber, notification, Row, Select, Space } from "antd";
import RibbonCard from "../../../common/forms/RibbonCard";
import ARMButton from "../../../common/buttons/ARMButton";
import ARMForm from "../../../../lib/common/ARMForm";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OilRecordsServices from "../../../../service/OilRecordsServices";
import { scrollToTop } from "../../../configaration/company/Company";
import { getErrorMessage } from "../../../../lib/common/helpers";

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};

const {Option} = Select;

export default function AmlOilRecord() {
	
	const [form] = Form.useForm();
	const {id} = useParams()
	const navigate = useNavigate()
	
	const [OilRecords, setOilRecords] = useState({});
	const [amls, setAmls] = useState([])
	
	
	console.log('aml', amls)
	
	
	const getAllAml = () => {
		OilRecordsServices.getAllAml(true)
			.then((response) => {
				setAmls(response.data.model)
			})
			.catch((error) => {
				console.log("something went wrong", error);
			});
	};
	useEffect(() => {
		getAllAml();
		scrollToTop();
	}, []);
	
	// handle reset input fields
	const onReset = () => {
		if (id) {
			form.setFieldsValue({...OilRecords})
		} else {
			form.resetFields()
		}
	};
	
	
	// get major component data by id
	useEffect(() => {
		if (!id) {
			return
		}
		getOilRecordById().catch(console.error)
		
	}, [id])
	
	// revert value
	const revertValue = (value) => {
		if (value === -1) {
			return '';
		}
		
		return value
	}
	
	const revertChecked = value => {
		if (value === -1) {
			return true
		}
		
		return false;
	}
	
	
	// get oil record by id
	const getOilRecordById = async () => {
		try {
			const {data} = await OilRecordsServices.getOilRecordById(id)
			
			setSelectedBox({
				c1: revertChecked(data.hydOil1),
				c2: revertChecked(data.hydOil2),
				c3: revertChecked(data.hydOil3),
				c4: revertChecked(data.engineOil1),
				c5: revertChecked(data.engineOil2),
				c6: revertChecked(data.apuOil),
				c7: revertChecked(data.csdOil1),
				c8: revertChecked(data.csdOil2),
				c9: revertChecked(data.oilRecord),
				c10: revertChecked(data.oilRecord),
			})
			
			const customRevertValue = {
				...data,
				hydOil1: revertValue(data.hydOil1),
				hydOil2: revertValue(data.hydOil2),
				hydOil3: revertValue(data.hydOil3),
				engineOil1: revertValue(data.engineOil1),
				engineOil2: revertValue(data.engineOil2),
				apuOil: revertValue(data.apuOil),
				csdOil1: revertValue(data.csdOil1),
				csdOil2: revertValue(data.csdOil2),
				oilRecord: revertValue(data.oilRecord)
			}
			
			form.setFieldsValue({...customRevertValue})
			setOilRecords({...data})
			
		} catch (er) {
			notification["error"]({message: getErrorMessage(er)});
		}
	}
	
	// convert from form values
	
	const convertValue = (isChecked, value) => {
		if (isChecked) {
			return -1;
		}
		
		if (isNaN(value) || value === null || value === '') {
			return 0;
		}
		
		return value;
	}
	
	
	// post api call using async await
	const onFinish = async (values) => {
		
		const customValue = {
			
			onArrival: {
				amlOilRecordId: 1,
				type: 1,
				hydOil1: convertValue(selectedBox.c1, values.onArrival.hydOil1),
				hydOil2: convertValue(selectedBox.c2, values.hydOil2),
				hydOil3: convertValue(selectedBox.c3, values.hydOil3),
				engineOil1: convertValue(selectedBox.c4, values.engineOil1),
				engineOil2: convertValue(selectedBox.c5, values.engineOil2),
				apuOil: convertValue(selectedBox.c6, values.apuOil),
				csdOil1: convertValue(selectedBox.c7, values.csdOil1),
				csdOil2: convertValue(selectedBox.c8, values.csdOil2),
				oilRecord: convertValue(selectedBox.c9, values.oilRecord),
			},
			
			uplift: {
				amlOilRecordId : 2,
				type: 2,
				hydOil1: convertValue(selectedBox.c10, values.uplift.hydOil1),
				hydOil2: convertValue(selectedBox.c11, values.hydOil2),
				hydOil3: convertValue(selectedBox.c12, values.hydOil3),
				engineOil1: convertValue(selectedBox.c13, values.engineOil1),
				engineOil2: convertValue(selectedBox.c14, values.engineOil2),
				apuOil: convertValue(selectedBox.c15, values.apuOil),
				csdOil1: convertValue(selectedBox.c16, values.csdOil1),
				csdOil2: convertValue(selectedBox.c17, values.csdOil2),
				oilRecord: convertValue(selectedBox.c18, values.oilRecord)
			}
			
			
		}
		
		console.log('custvalues', customValue)
		
		
		try {
			if (id) {
				await OilRecordsServices.updateOilRecord(id, customValue)
			} else {
				let {data} = await OilRecordsServices.saveOilRecord(customValue)
			}
			form.resetFields()
			navigate('/planning/oil-records')
			notification["success"]({
				message: id ? "Successfully updated!" : "Successfully added!",
			});
			
		} catch (er) {
			notification["error"]({message: getErrorMessage(er)});
		}
		
	};
	
	//Title separating
	const TITLE = id ? 'Oil Record Edit' : 'Oil Record Add';
	
	const initialState = {
		c1: false,
		c2: false,
		c3: false,
		c4: false,
		c5: false,
		c6: false,
		c7: false,
		c8: false,
		c9: false,
		c10: false,
		c11: false,
		c12: false,
		c13: false,
		c14: false,
		c15: false,
		c16: false,
		c17: false,
		c18: false,
	};
	
	const [selectedBox, setSelectedBox] = useState(initialState);
	
	
	const toggleCheckBox = (id) =>
		setSelectedBox((prev) => {
			return {...prev, [id]: !prev[id]};
		});
	
	
	return (
		<ARMForm
			{...layout}
			form={form}
			name="oilRecords"
			onFinish={onFinish}
			scrollToFirstError
			initialValues={{
				"onArrival": {
					"type": '',
					"hydOil1": '',
					"hydOil2": '',
					"hydOil3": '',
					"engineOil1": '',
					"engineOil2": '',
					"apuOil": '',
					"csdOil1": '',
					"csdOil2": '',
					"oilRecord": '',
					"amlId": ''
				},
				"down": {
					"type": '',
					"hydOil1": '',
					"hydOil2": '',
					"hydOil3": '',
					"engineOil1": '',
					"engineOil2": '',
					"apuOil": '',
					"csdOil1": '',
					"csdOil2": '',
					"oilRecord": '',
					"amlId": ''
				},
				c1: false,
				c2: false,
				c3: false,
				c4: false,
				c5: false,
				c6: false,
				c7: false,
				c8: false,
				c9: false,
				c10: false,
				c11: false,
				c12: false,
				c13: false,
				c14: false,
				c15: false,
				c16: false,
				c17: false,
				c18: false,
			}}
		>
			<Row>
				<Col lg={12} xl={12} md={12} sm={24} xs={24}>
					
					
					<Form.Item
						label="AML"
						name="amlId"
						rules={[
							{
								required: true,
								message: "Please input AML page no",
							},
						]}
					>
						<Select
							placeholder="Select AML Page"
							allowClear
						
						>
							{amls?.map((aml) => (
								<Option key={aml.aircraftMaintenanceLogId} value={aml.aircraftMaintenanceLogId}>
									{aml.pageNo}
								</Option>
							))}
						</Select>
					</Form.Item>
				
				</Col>
			</Row>
			<RibbonCard ribbonText="On Arrival">
				
				<Row>
					
					<Col sm={20} md={10}>
						
						
						<Form.Item
							
							name={["onArrival", "hydOil1"]}
							label="Hyd Oil1"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							
							
							<InputNumber
								addonAfter={
									<Checkbox id="c1"
									          checked={selectedBox.c1}
									          onChange={() => toggleCheckBox("c1")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c1 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c1 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						
						</Form.Item>
						
						
						<Form.Item
							name={["onArrival", "hydOil2"]}
							label="Hyd Oil2"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							<InputNumber
								addonAfter={
									<Checkbox id="c2"
									          checked={selectedBox.c2}
									          onChange={() => toggleCheckBox("c2")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c2 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c2 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
						
						<Form.Item
							name={["onArrival", "hydOil3"]}
							label="Hyd Oil3"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							<InputNumber
								addonAfter={
									<Checkbox id="c3"
									          checked={selectedBox.c3}
									          onChange={() => toggleCheckBox("c3")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c3 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c3 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
						<Form.Item
							name={["onArrival", "engineOil1"]}
							label="Engine Oil1"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						>
							<InputNumber
								addonAfter={
									<Checkbox id="c4"
									          checked={selectedBox.c4}
									          onChange={() => toggleCheckBox("c4")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c4 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c4 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
					
					
					</Col>
					<Col sm={20} md={10}>
						
						
						<Form.Item
							name={["onArrival", "engineOil2"]}
							label="Engine Oil2"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							<InputNumber
								addonAfter={
									<Checkbox id="c5"
									          checked={selectedBox.c5}
									          onChange={() => toggleCheckBox("c5")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c5 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c5 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
						
						<Form.Item
							name={["onArrival", "apuOil"]}
							label="APU Oil"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							<InputNumber
								addonAfter={
									<Checkbox id="c6"
									          checked={selectedBox.c6}
									          onChange={() => toggleCheckBox("c6")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c6 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c6 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
						
						<Form.Item
							name={["onArrival", "csdOil1"]}
							label="CSD Oil1"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							<InputNumber
								addonAfter={
									<Checkbox id="c7"
									          checked={selectedBox.c7}
									          onChange={() => toggleCheckBox("c7")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c7 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c7 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
						
						
						<Form.Item
							name={["onArrival", "csdOil2"]}
							label="CSD Oil2"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							<InputNumber
								addonAfter={
									<Checkbox id="c8"
									          checked={selectedBox.c8}
									          onChange={() => toggleCheckBox("c8")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c8 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c8 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
						<Form.Item
							name={["onArrival", "oilRecord"]}
							label="Oil Record"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							<InputNumber
								
								addonAfter={
									
									<Checkbox id="c9"
									          checked={selectedBox.c9}
									          onChange={() => toggleCheckBox("c9")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c9 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c9 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
					
					
					</Col>
				
				</Row>
			</RibbonCard>
			
			<RibbonCard ribbonText="Uplift">
				
				<Row>
					
					<Col sm={20} md={10}>
						
						<Form.Item
							name={["uplift", "hydOil1"]}
							label="Hyd Oil1"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							
							
							<InputNumber
								addonAfter={
									<Checkbox id="c10"
									          checked={selectedBox.c10}
									          onChange={() => toggleCheckBox("c10")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c10 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c10 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						
						</Form.Item>
						
						
						<Form.Item
							name={["uplift", "hydOil2"]}
							label="Hyd Oil2"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							<InputNumber
								addonAfter={
									<Checkbox id="c11"
									          checked={selectedBox.c11}
									          onChange={() => toggleCheckBox("c11")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c11 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c11 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
						
						<Form.Item
							name={["uplift", "hydOil3"]}
							label="Hyd Oil3"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							<InputNumber
								addonAfter={
									<Checkbox id="c12"
									          checked={selectedBox.c12}
									          onChange={() => toggleCheckBox("c12")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c12 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c12 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
						<Form.Item
							name={["uplift", "engineOil1"]}
							label="Engine Oil1"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						>
							<InputNumber
								addonAfter={
									<Checkbox id="c13"
									          checked={selectedBox.c13}
									          onChange={() => toggleCheckBox("c13")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c13 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c13 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
					
					
					</Col>
					<Col sm={20} md={10}>
						
						
						<Form.Item
							name={["uplift", "engineOil2"]}
							label="Engine Oil2"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							<InputNumber
								addonAfter={
									<Checkbox id="c14"
									          checked={selectedBox.c14}
									          onChange={() => toggleCheckBox("c14")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c14 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c14 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
						
						<Form.Item
							name={["uplift", "apuOil"]}
							label="APU Oil"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							<InputNumber
								addonAfter={
									<Checkbox id="c15"
									          checked={selectedBox.c15}
									          onChange={() => toggleCheckBox("c15")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c15 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c15 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
						
						<Form.Item
							name={["uplift", "csdOil1"]}
							label="CSD Oil1"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							<InputNumber
								addonAfter={
									<Checkbox id="c16"
									          checked={selectedBox.c16}
									          onChange={() => toggleCheckBox("c16")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c16 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c16 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
						
						
						<Form.Item
							name={["uplift", "csdOil2"]}
							label="CSD Oil2"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							<InputNumber
								addonAfter={
									<Checkbox id="c17"
									          checked={selectedBox.c17}
									          onChange={() => toggleCheckBox("c17")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c17 ? 'Full' : 'Enter oil quantity'}
								disabled={selectedBox.c17 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
						<Form.Item
							name={["uplift", "oilRecord"]}
							label="Fuel Record"
							rules={[
								{
									type: 'number',
									min: 0,
									message: "This field can not be less than 0"
								},
							]}
						
						>
							<InputNumber
								
								addonAfter={
									
									<Checkbox id="c18"
									          checked={selectedBox.c18}
									          onChange={() => toggleCheckBox("c18")}
									
									          style={{marginTop: '5px'}}
									>
										Full
									</Checkbox>
								}
								placeholder={selectedBox.c18 ? 'Full' : 'Enter fuel quantity'}
								disabled={selectedBox.c18 ? true : false}
								type='number'
								style={{width: '100%'}}/>
						</Form.Item>
					
					
					</Col>
					<Col sm={20} md={10}>
						<Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
							<Space>
								<ARMButton size="medium" type="primary" htmlType="submit">
									{id ? 'Update' : 'Submit'}
								</ARMButton>
								<ARMButton onClick={onReset} size="medium" type="primary" danger>
									Reset
								</ARMButton>
							</Space>
						</Form.Item>
					</Col>
				
				</Row>
			</RibbonCard>
		</ARMForm>
	)
	
}