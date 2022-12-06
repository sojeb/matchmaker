import { Form, Input, Select } from "antd";
import { signatureTypes } from "../../../lib/hooks/planning/aml";
import React from "react";
import RibbonCard from "../../common/forms/RibbonCard";
import PropTypes from "prop-types";

export default function AmlEtopsFltCertification({ signatures }) {
	return (
		<RibbonCard ribbonText="Certification for ETOPS FLT">
			
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 2, 'amlSignatureId']}
				label={signatureTypes["3"]}
				hidden={true}
			>
				<Input />
			</Form.Item>
			
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 2, 'signatureType']}
				label={signatureTypes["3"]}
				hidden={true}
			>
				<Input />
			</Form.Item>
			
			<Form.Item
				name={['maintenanceLogSignatureDtoList', 2, 'signatureId']}
				label={signatureTypes["3"]}
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

AmlEtopsFltCertification.propTypes = {
	signatures: PropTypes.array.isRequired
}