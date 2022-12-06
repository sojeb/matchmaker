import { Form, InputNumber } from "antd";
import RibbonCard from "../../common/forms/RibbonCard";
import React from "react";

export default function AmlFuelUpliftCrossCheck() {
	return (
		<RibbonCard ribbonText="Fuel uplift Cross check">
			<Form.Item
				name="refuelDelivery"
				label="Refueling Vehicle Delivery"
			>
				<InputNumber size="small" style={{width: '100%'}} controls={false} addonAfter="in ltr"/>
			</Form.Item>
			
			<Form.Item
				name="specificGravity"
				label="Specific Gravity"
			>
				<InputNumber size="small" style={{width: '100%'}} controls={false}/>
			</Form.Item>
			
			<Form.Item
				name="convertedIn"
				label="Converted In"
			>
				<InputNumber size="small" style={{width: '100%'}} controls={false} addonAfter="Kg/lb"/>
			</Form.Item>
		</RibbonCard>
	)
}