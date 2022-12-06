import { Form, Select } from "antd";
import { PAGE_SIZES } from "../../../lib/constants/paginations";
import React from "react";

export default function PageSizesFormItem() {
	return (
		<Form.Item name="size" label="Page Size">
			<Select id="pageSizeSelect">
				{PAGE_SIZES.map(v => <Select.Option key={v} value={v}>{v}</Select.Option>)}
			</Select>
		</Form.Item>
	)
}