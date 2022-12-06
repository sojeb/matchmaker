import ARMButton from "./ARMButton";
import { LockOutlined, QuestionCircleFilled, UnlockOutlined } from "@ant-design/icons";
import React from "react";
import { Modal } from "antd";
import PropTypes from "prop-types";
import { NOOP } from "../../../lib/common/helpers";

const { confirm } = Modal;

export default function ActiveInactiveButton({ isActive, confirmText, handleOk, ...rest }) {
	
	const clickHandler = () => {
		confirm({
			content: confirmText,
			type: "warning",
			icon: <QuestionCircleFilled />,
			onOk: handleOk
		})
	}
	
	return isActive ? (
		<ARMButton
			type="primary"
			size="small"
			style={{
				backgroundColor: '#53a351',
				borderColor: '#53a351',
			}}
			onClick={clickHandler}
			{...rest}
		>
			<UnlockOutlined />
		</ARMButton>
	) : (
		<ARMButton onClick={clickHandler} type="primary" size="small" danger>
			<LockOutlined />
		</ARMButton>
	)
}

ActiveInactiveButton.defaultProps = {
	confirmText: <h3>Are You sure to change status?</h3>,
	handleOk: NOOP
}

ActiveInactiveButton.propTypes = {
	handleOk: PropTypes.func
}

