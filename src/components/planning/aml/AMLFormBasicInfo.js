import { DatePicker, Form, Input, Select } from "antd";
import React from "react";
import RibbonCard from "../../common/forms/RibbonCard";

export default function AMLFormBasicInfo({ amls, aircrafts, employees, airports}) {
	return (
		<RibbonCard ribbonText="Aircraft Maintenance Log">
			<Form.Item
				name="referenceAmlId"
				label="Ref. AML"
			>
				<Select size="small">
					<Select.Option value="">---Select---</Select.Option>
					{
						amls.map(({id, name}) => <Select.Option value={id} key={id}>{name}</Select.Option>)
					}
				</Select>
			</Form.Item>
			
			<Form.Item
				name="pageNo"
				label="Page No"
				rules={[
					{
						required: true,
						message: 'Page no is required!'
					}
				]}
			>
				<Input size="small"/>
			</Form.Item>
			
			<Form.Item
				name="aircraftId"
				label="Aircraft"
				rules={[
					{
						required: true,
						message: "Aircraft is required!"
					},
				]}
			>
				<Select size="small">
					<Select.Option value="">---Select---</Select.Option>
					{
						aircrafts.map(({id, name}) => <Select.Option value={id} key={id}>{name}</Select.Option>)
					}
				</Select>
			</Form.Item>
			
			<Form.Item
				name="fromAirportId"
				label="From Airport"
			>
				<Select size="small">
					<Select.Option value="">---Select---</Select.Option>
					{
						airports.map(({id, name}) => <Select.Option value={id} key={id}>{name}</Select.Option>)
					}
				</Select>
			</Form.Item>
			
			<Form.Item
				name="toAirportId"
				label="To Airport"
			>
				<Select size="small">
					<Select.Option value="">---Select---</Select.Option>
					{
						airports.map(({id, name}) => <Select.Option value={id} key={id}>{name}</Select.Option>)
					}
				</Select>
			</Form.Item>
			
			<Form.Item
				name="captainId"
				label="Captain"
			>
				<Select size="small">
					<Select.Option value="">---Select---</Select.Option>
					{
						employees.map(({id, name}) => <Select.Option value={id} key={id}>{name}</Select.Option>)
					}
				</Select>
			</Form.Item>
			
			<Form.Item
				name="foId"
				label="FO"
			>
				<Select size="small">
					<Select.Option value="">---Select---</Select.Option>
					{
						employees.map(({id, name}) => <Select.Option value={id} key={id}>{name}</Select.Option>)
					}
				</Select>
			</Form.Item>
			
			<Form.Item
				name="flightNo"
				label="Flight No"
			>
				<Input size="small"/>
			</Form.Item>
			
			<Form.Item
				name="date"
				label="Date"
				rules={[
					{
						required: true,
						message: "Date is required!"
					}
				]}
			>
				<DatePicker size="small" placeholder="" style={{width: '100%'}}/>
			</Form.Item>
			
		</RibbonCard>
	)
}