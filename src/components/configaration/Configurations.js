import CommonLayout from "../layout/CommonLayout";
import { Card, List, Typography, Row, Col } from "antd";
import { Link } from "react-router-dom";
import ARMCard from "../common/ARMCard";

const menus = {
	config: [
		{name: 'Country', url: 'countries'},
		{name: 'City', url: 'city'},
		{name: 'Location', url: 'location'},
		{name: 'Office', url: 'office'},
		{name: 'Company', url: 'companies'},
		{name: 'External Department', url: 'external-department'},
	],

	admin: [
		{name: 'Users', url: 'users'},
		{name: 'Roles', url: 'roles'},
		{name: 'Access Rights', url: 'roles/access-rights'},
		{name: 'Module', url: 'modules'},
		{name: 'Sub module', url: 'sub-modules'},
		{name: 'Sub module Item', url: 'sub-module-items'},
		{name:'Workflow Actions', url:"workflow-actions"},
		{name: 'Approval Settings', url: 'approval-setting'},
		{name: 'Notification Settings', url: 'notification-setting'},
	],
}

export default function Configurations() {
	return (
		<CommonLayout>
			<Row gutter={[6,6]}>
				<Col md={6} sm={12} xs={24}>
					<ARMCard title="CONFIGURATION">
						<List
							itemLayout="horizontal"
							dataSource={menus.config}
							renderItem={item => (
								<List.Item>
									<Link style={{width: '100%'}} to={`/configurations/${item.url}`}>
										{item.name}
									</Link>
								</List.Item>
							)}
						/>
					</ARMCard>
				</Col>
				
				<Col md={6} sm={12} xs={24}>
					<ARMCard title="ADMINISTRATION">
						<List
							itemLayout="horizontal"
							dataSource={menus.admin}
							renderItem={item => (
								<List.Item>
									<Link style={{width: '100%'}} to={`/configurations/${item.url}`}>
										{item.name}
									</Link>
								</List.Item>
							)}
						/>
					</ARMCard>
				</Col>
				
			</Row>
		</CommonLayout>
	)
}