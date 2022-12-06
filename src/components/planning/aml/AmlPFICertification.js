import { DatePicker, Form, Input, Select } from "antd";
import { signatureTypes } from "../../../lib/hooks/planning/aml";
import RibbonCard from "../../common/forms/RibbonCard";
import React from "react";
import PropTypes from "prop-types";

export default function AmlPFICertification({ signatures, airports }) {
	return (
		<RibbonCard ribbonText="Certification for PRE FLIGHT INSPECTION (PFI)">
			
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 3, 'amlSignatureId']}
				label={signatureTypes["4"]}
				hidden={true}
			>
				<Input />
			</Form.Item>
			
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 3, 'signatureType']}
				label={signatureTypes["4"]}
				hidden={true}
			>
				<Input />
			</Form.Item>
			
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 3, 'signatureId']}
				label={signatureTypes["4"]}
			>
				<Select size="small">
					<Select.Option value="">---Select---</Select.Option>
					{
						signatures.map(({id, name}) => <Select.Option value={id} key={id}>{name}</Select.Option>)
					}
				</Select>
			</Form.Item>
			
			<Form.Item
				name="preFlightInspectionAirportId"
				label="PFI Station"
			>
				<Select size="small">
					<Select.Option value="">---Select---</Select.Option>
					{
						airports.map(({id, name}) => <Select.Option value={id} key={id}>{name}</Select.Option>)
					}
				</Select>
			</Form.Item>
			
			<Form.Item
				name="pfiTime"
				label="PFI Time"
			>
				<DatePicker size="small" style={{width: '100%'}} placeholder="" showTime/>
			</Form.Item>
		</RibbonCard>
	)
}


AmlPFICertification.propTypes = {
	signatures: PropTypes.array.isRequired,
	airports: PropTypes.array.isRequired
}