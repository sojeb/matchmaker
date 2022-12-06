import React from "react";
import { Breadcrumb, Col, DatePicker, Form, Input, Pagination, Row, Select, Space, notification } from "antd";
import ARMTable from "../../common/ARMTable";
import CommonLayout from "../../layout/CommonLayout";
import ARMCard from "../../common/ARMCard";
import { Link } from "react-router-dom";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";

import ActiveInactive from "../../common/ActiveInactive";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ResponsiveTable from "../../common/ResposnsiveTable";
import EditButton from "../../common/buttons/EditButton";
import ViewButton from "../../common/buttons/ViewButton";
import ActiveInactiveButton from "../../common/buttons/ActiveInactiveButton";
import { refreshPagination, usePaginate } from "../../../lib/hooks/paginations";
import PageSizesFormItem from "../../common/pagination/PageSizesFormItem";
import ARMButton from "../../common/buttons/ARMButton";
import { FilterOutlined, RollbackOutlined } from "@ant-design/icons";
import { useAircrafts } from "../../../lib/hooks/planning/aircrafts";
import { useAirports } from "../../../lib/hooks/planning/airports";
import AMLService from "../../../service/planning/AMLService";
import { getErrorMessage } from "../../../lib/common/helpers";
import { useDispatch } from "react-redux";

export const AML_SEARCH_URL = 'aircraft-maintenance-log/search';
export const AML_REDUX_KEY = 'amls';
const TITLE = 'AML List';

export default function AMLList() {
	const [form] = Form.useForm();
	const {collection, page, totalPages, size, totalElements, paginate, isActive, setIsActive, fetchData} = usePaginate(AML_REDUX_KEY, AML_SEARCH_URL)
	const {airports} = useAirports();
	const {aircrafts} = useAircrafts();
	const dispatch = useDispatch();
	
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
					
					<Breadcrumb.Item>
						{TITLE}
					</Breadcrumb.Item>
				</Breadcrumb>
			</ARMBreadCrumbs>
			
			<ARMCard
				title={getLinkAndTitle(TITLE, "add", true)}
			>
				<Form
					form={form}
					name="filter-form"
					initialValues={{pageNo: '', aircraftId: '', flightNo: '', fromDate: '', toDate: '', fromAirportId: '', toAirportId: '', size: 10}}
					onFinish={fetchData}
				>
					<Row gutter={20}>
						<Col xs={24} md={4}>
							<Form.Item name="pageNo">
								<Input placeholder="Page No"/>
							</Form.Item>
						</Col>
						
						<Col xs={24} md={4}>
							<Form.Item name="aircraftId">
								<Select
									placeholder="Aircraft"
								>
									<Select.Option value="">---Aircraft---</Select.Option>
									{
										aircrafts.map(type => <Select.Option value={type.id} key={type.id}>{type.name}</Select.Option>)
									}
								</Select>
							</Form.Item>
						</Col>
						
						<Col xs={24} md={4}>
							<Form.Item name="flightNo">
								<Input placeholder="Flight No"/>
							</Form.Item>
						</Col>
						
						<Col xs={24} md={4}>
							<Form.Item
								name="fromDate"
							>
								<DatePicker placeholder="From Date" style={{width: '100%'}}/>
							</Form.Item>
						</Col>
						
						<Col xs={24} md={4}>
							<Form.Item
								name="toDate">
								<DatePicker placeholder="To Date" style={{width: '100%'}}/>
							</Form.Item>
						</Col>
						
						<Col xs={24} md={4}>
							<Form.Item name="fromAirportId">
								<Select
									placeholder="From Airport"
								>
									<Select.Option value="">---From Airport---</Select.Option>
									{
										airports.map(type => <Select.Option value={type.id} key={type.id}>{type.name}</Select.Option>)
									}
								</Select>
							</Form.Item>
						</Col>
						
						<Col xs={24} md={4}>
							<Form.Item name="toAirportId">
								<Select
									placeholder="To Airport"
								>
									<Select.Option value="">---To Airport---</Select.Option>
									{
										airports.map(type => <Select.Option value={type.id} key={type.id}>{type.name}</Select.Option>)
									}
								</Select>
							</Form.Item>
						</Col>
						
						<Col xs={24} md={5} lg={4}>
							<PageSizesFormItem/>
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
										onClick={() => {
											form.resetFields();
											fetchData();
										}}
									>
										<RollbackOutlined name="reset"/> Reset
									</ARMButton>
								</Space>
							</Form.Item>
						</Col>
					</Row>
				</Form>
				
				
				<ActiveInactive isActive={isActive} setIsActive={setIsActive}/>
				
				<Row className="table-responsive">
					<ResponsiveTable>
						<ARMTable>
							<thead>
							<tr>
								<th>Page No</th>
								<th>Aircraft</th>
								<th>Flight No</th>
								<th>Date</th>
								<th>From Airport</th>
								<th>To Airport</th>
								<th width="200">Action</th>
							</tr>
							</thead>
							<tbody>
							
							{
								collection.map(model => <tr key={model.aircraftMaintenanceLogId}>
									<td>{model.pageNo}</td>
									<td>{model.aircraftName}</td>
									<td>{model.flightNo}</td>
									<td>{model.date}</td>
									<td>{model.fromAirportIataCode}</td>
									<td>{model.toAirportIataCode}</td>
									<td>
										<Space size="small">
											<Link to={`view/${model.aircraftMaintenanceLogId}`}>
												<ViewButton/>
											</Link>
											
											<Link to={`edit/${model.aircraftMaintenanceLogId}`}>
												<EditButton/>
											</Link>
											
											
											<ActiveInactiveButton
												isActive={isActive}
												handleOk={async () => {
													try {
														await AMLService.toggleStatus(model.aircraftMaintenanceLogId, model.isActive);
														dispatch(refreshPagination(AML_REDUX_KEY, AML_SEARCH_URL))
														notification['success']({message: "Status Changed Successfully!"});
													} catch (e) {
														notification['error']({message: getErrorMessage(e)});
													}
												}}
											/>
										
										</Space>
									</td>
								</tr>)
							}
							
							</tbody>
						</ARMTable>
					</ResponsiveTable>
				</Row>
				
				<Row justify="center">
					<Col style={{marginTop: 10}}>
						<Pagination showSizeChanger={false} onShowSizeChange={console.log} pageSize={size} current={page} onChange={paginate} total={totalElements}/>
					</Col>
				</Row>
			</ARMCard>
		</CommonLayout>
	);
};
