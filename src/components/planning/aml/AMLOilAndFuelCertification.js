import { Form, Input, Select } from "antd";
import { signatureTypes } from "../../../lib/hooks/planning/aml";
import RibbonCard from "../../common/forms/RibbonCard";
import React from "react";

export default function AMLOilAndFuelCertification({ signatures }) {
	return (
		<RibbonCard ribbonText="Certification of Oil and Fuel">
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 0, 'amlSignatureId']}
				label={signatureTypes["1"]}
				hidden={true}
			>
				<Input size="small" />
			</Form.Item>
			
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 0, 'signatureType']}
				label={signatureTypes["1"]}
				hidden={true}
			>
				<Input size="small" />
			</Form.Item>
			
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 0, 'signatureId']}
				label={signatureTypes["1"]}
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