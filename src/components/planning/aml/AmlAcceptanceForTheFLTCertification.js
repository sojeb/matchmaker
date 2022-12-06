import { DatePicker, Form, Input, Select } from "antd";
import { signatureTypes } from "../../../lib/hooks/planning/aml";
import RibbonCard from "../../common/forms/RibbonCard";
import React from "react";
import PropTypes from "prop-types";

export default function AmlAcceptanceForTheFLTCertification({ signatures }) {
	return (
		<RibbonCard ribbonText="Certification of Acceptance for the FLT">
			
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 4, 'amlSignatureId']}
				label={signatureTypes["5"]}
				hidden={true}
			>
				<Input />
			</Form.Item>
			
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 4, 'signatureType']}
				label={signatureTypes["5"]}
				hidden={true}
			>
				<Input />
			</Form.Item>
			
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 4, 'signatureId']}
				label={signatureTypes["5"]}
			>
				<Select size="small">
					<Select.Option value="">---Select---</Select.Option>
					{
						signatures.map(({id, name}) => <Select.Option value={id} key={id}>{name}</Select.Option>)
					}
				</Select>
			</Form.Item>
			
			<Form.Item
				name="ocaTime"
				label="OCA Time"
			>
				<DatePicker size="small" style={{width: '100%'}} placeholder="" showTime/>
			</Form.Item>
		</RibbonCard>
	)
}

AmlAcceptanceForTheFLTCertification.propTypes = {
	signatures: PropTypes.array.isRequired
}