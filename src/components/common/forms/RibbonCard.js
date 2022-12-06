import { Badge, Card } from "antd";

export default function RibbonCard({ children, ribbonText, ribbonColor }) {
	const ribbonStyles = '#04AA6DFF';
	const groupStyles = {marginBottom: '1em', paddingTop: '1em'};
	
	return (
		<Badge.Ribbon text={ribbonText} color={ribbonColor || ribbonStyles} placement="start">
			<Card style={groupStyles}>
				{children}
			</Card>
		</Badge.Ribbon>
	)
}