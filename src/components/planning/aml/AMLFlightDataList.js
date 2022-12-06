import { useEngineModelTypes } from "../../../lib/hooks/planning/engine-models";
import { Breadcrumb, Col, DatePicker, Form, Input, notification, Pagination, Row, Select, Space } from "antd";
import { refreshPagination, usePaginate } from "../../../lib/hooks/paginations";
import CommonLayout from "../../layout/CommonLayout";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import { Link } from "react-router-dom";
import ARMCard from "../../common/ARMCard";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import ActiveInactive from "../../common/ActiveInactive";
import ResponsiveTable from "../../common/ResposnsiveTable";
import ARMTable from "../../common/ARMTable";
import React from "react";
import PageSizesFormItem from "../../common/pagination/PageSizesFormItem";
import ARMButton from "../../common/buttons/ARMButton";
import { FilterOutlined, RollbackOutlined } from "@ant-design/icons";
import { useAmls } from "../../../lib/hooks/planning/aml";
import DateTimeConverter from "../../../converters/DateTimeConverter";
import { dateFormat } from "../../../lib/hooks/common";
import ViewButton from "../../common/buttons/ViewButton";
import EditButton from "../../common/buttons/EditButton";
import ActiveInactiveButton from "../../common/buttons/ActiveInactiveButton";
import AMLService from "../../../service/planning/AMLService";
import { getErrorMessage } from "../../../lib/common/helpers";
import { AML_REDUX_KEY, AML_SEARCH_URL } from "./AMLList";
import { useDispatch } from "react-redux";
import amlFlightDataService from "./amlFlightDataService";

export const FLIGHT_DATA_SEARCH_URL = 'flight-data/search'
export const FLIGHT_DATA_REDUX_KEY = 'planning/flightData';

export default function AMLFlightDataList() {
	const {types} = useEngineModelTypes();
	const [form] = Form.useForm();
	const {
		collection,
		page,
		size,
		totalPages,
		totalElements,
		paginate,
		isActive,
		setIsActive,
		fetchData
	} = usePaginate(FLIGHT_DATA_REDUX_KEY, FLIGHT_DATA_SEARCH_URL)
	
	const dispatch = useDispatch();
	const { amls } = useAmls();
	
	const TITLE = 'Flight Data List';
	
	return <CommonLayout>
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
				initialValues={{amlId: '', size: 10}}
				onFinish={fetchData}
			>
				<Row gutter={20}>
					<Col xs={24} md={4}>
						<Form.Item name="amlId">
							<Select
								placeholder="AML"
							>
								<Select.Option value="">---AML---</Select.Option>
								{
									amls.map(type => <Select.Option value={type.id} key={type.id}>{type.name}</Select.Option>)
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
							<th/>
							<th colSpan={3}>Block Time</th>
							<th colSpan={4}>Landing & Take Off</th>
							{/*<th/>*/}
							<th colSpan={2}>
								Ground De-icing/Anti-icing time
							</th>
							<th/>
						</tr>
						<tr>
							<th>AML</th>
							<th>Block On Time</th>
							<th>Block Off Time</th>
							<th>Block Time</th>
							<th>Landing Time</th>
							<th>Take Off Time</th>
							<th>Air Time</th>
							<th>No Of Landing</th>
							<th>Commenced Time</th>
							<th>Completed Time</th>
							<th width="200">Action</th>
						</tr>
						</thead>
						
						<tbody>
						{
							collection.map(({id, pageNo, blockOnTime, blockOffTime, blockTime, landingTime, takeOffTime, airTime, noOfLanding, commencedTime, completedTime, isActive}) => (
								<tr key={id}>
									<td>{pageNo}</td>
									<td>{ dateFormat(blockOnTime) }</td>
									<td>{ dateFormat(blockOffTime) }</td>
									<td>{blockTime}</td>
									<td>{ dateFormat(landingTime) }</td>
									<td>{ dateFormat(takeOffTime) }</td>
									<td>{airTime}</td>
									<td>{noOfLanding}</td>
									<td>{ dateFormat(commencedTime) }</td>
									<td>{ dateFormat(completedTime) }</td>
									<td>
										<Space size="small">
											<Link to={`edit/${id}`}>
												<EditButton/>
											</Link>
											
											
											<ActiveInactiveButton
												isActive={isActive}
												handleOk={async () => {
													try {
														await  amlFlightDataService.toggleStatus(id, isActive);
														dispatch(refreshPagination(FLIGHT_DATA_REDUX_KEY, FLIGHT_DATA_SEARCH_URL))
														notification['success']({message: "Status Changed Successfully!"});
													} catch (e) {
														notification['error']({message: getErrorMessage(e)});
													}
												}}
											/>
										
										</Space>
									</td>
								</tr>
							))
						}
						</tbody>
						
					</ARMTable>
				</ResponsiveTable>
			</Row>
			
			<Row justify="center">
				<Col style={{marginTop: 10}}>
					<Pagination showSizeChanger={false} onShowSizeChange={console.log} pageSize={size} current={page} onChange={paginate}
					            total={totalElements}/>
				</Col>
			</Row>
		</ARMCard>
	</CommonLayout>
}