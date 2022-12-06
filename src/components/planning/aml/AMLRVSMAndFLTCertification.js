import { DatePicker, Form, Input, Select } from "antd";
import { signatureTypes } from "../../../lib/hooks/planning/aml";
import RibbonCard from "../../common/forms/RibbonCard";
import React from "react";

export default function AMLRVSMAndFLTCertification({ signatures }) {
	return (
		<RibbonCard ribbonText="Certification for RVSM FLT Sector">
			
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 1, 'amlSignatureId']}
				label={signatureTypes["1"]}
				hidden={true}
			>
				<Input />
			</Form.Item>
			
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 1, 'signatureType']}
				label={signatureTypes["1"]}
				hidden={true}
			>
				<Input />
			</Form.Item>
			
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 1, 'signatureId']}
				label={signatureTypes["2"]}
			>
				<Select size="small">
					<Select.Option value="">---Select---</Select.Option>
					{
						signatures.map(({id, name}) => <Select.Option value={id} key={id}>{name}</Select.Option>)
					}
				</Select>
			</Form.Item>
			
		</RibbonCard>
	)
}