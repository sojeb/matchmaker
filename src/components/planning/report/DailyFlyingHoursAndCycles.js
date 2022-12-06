import React from "react";
import { Breadcrumb, Col, Form, Input, Row, Select, Space, DatePicker, Typography, Badge } from "antd";
import ARMTable from "../../common/ARMTable";
import CommonLayout from "../../layout/CommonLayout";
import ARMCard from "../../common/ARMCard";
import ARMButton from "../../common/buttons/ARMButton";
import { Link } from "react-router-dom";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import { FilterOutlined, RollbackOutlined, } from "@ant-design/icons";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ResponsiveTable from "../../common/ResposnsiveTable";
import PageSizesFormItem from "../../common/pagination/PageSizesFormItem";
import { useAircrafts } from "../../../lib/hooks/planning/aircrafts";
import DateTimeConverter from "../../../converters/DateTimeConverter";

export default function DailyFlyingHoursAndCycles() {
	
	const [form] = Form.useForm();
	const {aircrafts} = useAircrafts();
	
	const fetchFilter = values => {
		const data = {
			aircraftId: values.aircraftId,
			startDate: DateTimeConverter.momentDateToString(values.dateRange[0]),
			endDate: DateTimeConverter.momentDateToString(values.dateRange[1])
		}
		
		console.log({data})
	}
	
	const resetFilter = () => {
	
	}
	
	const TITLE = 'Daily Flying Hours And Cycles';
	
	return (
		<CommonLayout>
			<ARMBreadCrumbs>
				<Breadcrumb separator="/">
					<Breadcrumb.Item>
						{' '}
						<Link to="/planning">
							{' '}
							<i className="fas fa-chart-line"/> &nbsp;Planning
						</Link>
					</Breadcrumb.Item>
					
					<Breadcrumb.Item>{TITLE}</Breadcrumb.Item>
				</Breadcrumb>
			</ARMBreadCrumbs>
			<ARMCard
				title={TITLE}
			>
				
				<Form
					form={form}
					name="filter-form"
					initialValues={{aircraftId: '', dateRange: []}}
					onFinish={fetchFilter}
				>
					<Row gutter={20}>
						
						<Col xs={24} md={6}>
							<Form.Item name="aircraftId">
								<Select
									placeholder="Select Model Type"
								>
									<Select.Option value="">---Select---</Select.Option>
									{
										aircrafts.map(type => <Select.Option value={type.id} key={type.id}>{type.name}</Select.Option>)
									}
								</Select>
							</Form.Item>
						</Col>
						
						<Col xs={24} md={6}>
							<Form.Item name="dateRange">
								<DatePicker.RangePicker style={{width: '100%'}}/>
							</Form.Item>
						</Col>
						
						
						<Col xs={24} md={8}>
							<Form.Item>
								<Space>
									<ARMButton size="middle" type="primary" htmlType="submit">
										<FilterOutlined name="filter"/> Filter
									</ARMButton>
									<ARMButton
										size="middle"
										type="primary"
										onClick={resetFilter}
									>
										<RollbackOutlined name="reset"/> Reset
									</ARMButton>
								</Space>
							</Form.Item>
						</Col>
					</Row>
				
				</Form>
				
				<Row justify="center">
					<Col span={12} offset={6}>
						<Typography.Title level={3}>DAILY FLYING HOURS AND CYC DESCRIPTION</Typography.Title>
					</Col>
					
					<Col span={16}>
						<Row justify="space-between">
							<Col>
								<Typography.Title level={5} type="secondary">
									AIRCRAFT IN BANGLADESH
								</Typography.Title>
								
								<Space>
									<Typography.Title level={5} type="secondary">
										HOURS:
										<Badge
											overflowCount={Infinity}
											count="2000"
											style={{backgroundColor: '#52c41a', borderRadius: 0}}
										/>
									</Typography.Title>
									
									<Typography.Title level={5} type="secondary">
										CYC:
										<Badge
											overflowCount={Infinity}
											count="2000"
											style={{backgroundColor: '#52c41a', borderRadius: 0}}
										/>
									</Typography.Title>
								</Space>
							
							
							</Col>
							
							<Col>
								<Typography.Title level={5} type="secondary">
									TOTAL AIRCRAFT
								</Typography.Title>
								
								<Space>
									<Typography.Title level={5} type="secondary">
										TAT:
										<Badge
											overflowCount={Infinity}
											count="2000"
											style={{backgroundColor: '#52c41a', borderRadius: 0}}
										/>
									</Typography.Title>
									
									<Typography.Title level={5} type="secondary">
										TCY:
										<Badge
											overflowCount={Infinity}
											count="2000"
											style={{backgroundColor: '#52c41a', borderRadius: 0}}
										/>
									</Typography.Title>
								</Space>
							</Col>
							
							<Col>
								<Typography.Title level={5} type="secondary">
									"A CHK" REMN. HRS
								</Typography.Title>
								
								<Space>
									<Typography.Title level={5} type="secondary">
										HRS:
										<Badge
											overflowCount={Infinity}
											count="2000"
											style={{backgroundColor: '#52c41a', borderRadius: 0}}
										/>
									</Typography.Title>
								</Space>
							</Col>
						
						</Row>
					</Col>
				</Row>
				
				<Row className="table-responsive">
					<ResponsiveTable>
						<ARMTable>
							<thead>
							<tr>
								<th>DATE</th>
								<th>AML NO</th>
								<th>SECTOR</th>
								<th>FLT NO.</th>
								<th>BLOCK OFF</th>
								<th>BLOCK ON</th>
								<th>BLOCK TIME</th>
								<th>T/OFF</th>
								<th>LDG</th>
								<th>CYC</th>
								<th>SECTOR HRS.</th>
								<th>TAT</th>
								<th>TCY</th>
								<th>ENG#1</th>
								<th>ENG#2</th>
								<th>APU</th>
							</tr>
							</thead>
							<tbody>
							
							</tbody>
						</ARMTable>
					</ResponsiveTable>
				</Row>
			</ARMCard>
		</CommonLayout>
	);
};
