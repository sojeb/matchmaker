import { Layout } from "antd";
import AppHeader from "./AppHeader";
import React from "react";
import { useAppContext } from "../../contexts/apps";
import PropTypes from 'prop-types';

const { Content } = Layout;

export default function DashboardLayout({ children }) {
	const {logo, collapsed, setCollapsed} = useAppContext();
	
	return (
		<Layout style={{ minHeight: '100vh'}} className="site-layout">
			{/* <AppHeader collapsed={collapsed} setCollapsed={setCollapsed}/> */}
			<Content
				style={{
					margin: '1em'
				}}
			>
				{children}
			</Content>
		</Layout>
	)
}

DashboardLayout.defaultProps = {
	children: <h1>No Content</h1>
}

DashboardLayout.propTypes = {
	children: PropTypes.element.isRequired
}