import { getLinkAndTitle } from "../../../../lib/common/TitleOrLink";
import ARMForm from "../../../../lib/common/ARMForm";
import { formLayout } from "../../../../lib/constants/form";
import { Col, DatePicker, Form, InputNumber, Row, Select, Space } from "antd";
import ARMButton from "../../../common/buttons/ARMButton";
import ARMCard from "../../../common/ARMCard";
import React, { useEffect, useState } from "react";
import { useAmlFlightDataAdd } from "../../../../lib/hooks/planning/aml";
import API from "../../../../service/Api";

export default function FlightDataForm() {
	const { id, form, onReset, onFinish, isEdit, submitting } = useAmlFlightDataAdd();

	return (
		<ARMForm
			{...formLayout}
			form={form}
			name="flightData"
			// preserve={true}
			onFinish={onFinish}
			initialValues={{
				amlId: '',
				noOfLanding: '',
				blockOnTime: '',
				blockOffTime: '',
				landingTime: '',
				takeOffTime: '',
				commencedTime: '',
				completedTime: ''
			}}
			scrollToFirstError
		>
			
			<Row>
				<Col sm={24} md={12}>
					
					
					<Form.Item
						name="blockOnTime"
						label="Block On Time"
						rules={[
							{
								required: true,
								message: "Block On Time is Required!"
							},
						]}
					>
						<DatePicker size="small" placeholder={''} style={{ width: '100%'}} showTime/>
					</Form.Item>
					
					<Form.Item
						name="blockOffTime"
						label="Block Off Time"
						rules={[
							{
								required: true,
								message: "Block Off Time is Required!"
							},
						]}
					>
						<DatePicker size="small" placeholder={''} style={{ width: '100%'}} showTime/>
					</Form.Item>
					
					<Form.Item
						name="takeOffTime"
						label="Take Off Time"
						rules={[
							{
								required: true,
								message: "Take off time is required!"
							},
						]}
					>
						<DatePicker size="small" placeholder={''} style={{ width: '100%'}} showTime/>
					</Form.Item>
					
					<Form.Item
						name="landingTime"
						label="Landing Time"
						rules={[
							{
								required: true,
								message: "Landing time is required!"
							},
						]}
					>
						<DatePicker size="small" placeholder={''} style={{ width: '100%'}} showTime/>
					</Form.Item>
				</Col>
				
				<Col sm={24} md={12}>
					<Form.Item
						name="noOfLanding"
						label="No Of Landing"
						rules={[
							{
								required: true,
								message: "No of landing is required!"
							},
						]}
					>
						<InputNumber size="small" step={1} style={{ width: '100%'}} controls={false}/>
					</Form.Item>
					
					<Form.Item
						name="commencedTime"
						label="Commenced Time"
					>
						<DatePicker size="small" placeholder={''} style={{ width: '100%'}} showTime/>
					</Form.Item>
					
					<Form.Item
						name="completedTime"
						label="Completed Time"
					>
						<DatePicker size="small" placeholder={''} style={{ width: '100%'}} showTime/>
					</Form.Item>
				</Col>
			</Row>
			
			
			<Row>
				<Col sm={24} md={12}>
					<Form.Item wrapperCol={{...formLayout.wrapperCol, offset: 8}}>
						<Space>
							<ARMButton loading={submitting} size="small" type="primary" htmlType="submit">
								{isEdit ? 'Update' : 'Add'}
							</ARMButton>
							<ARMButton onClick={onReset} size="small" type="primary" danger>
								Reset
							</ARMButton>
						</Space>
					</Form.Item>
				</Col>
			</Row>
		
		</ARMForm>
	)
}