import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import EngineModelService from "../../../service/EngineModelService";
import CommonLayout from "../../layout/CommonLayout";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import { Breadcrumb, Col, Descriptions, Row } from "antd";
import ARMCard from "../../common/ARMCard";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import AMLService from "../../../service/planning/AMLService";
import { signatureTypes } from "../../../lib/hooks/planning/aml";
import RibbonCard from "../../common/forms/RibbonCard";
import ViewItem from "../../common/view/ViewItem";
import { type } from "@testing-library/user-event/dist/type";

export default function AMLView() {
	const {id} = useParams();
	const TITLE = 'AML View';
	
	const [aml, setAml] = useState({
		signatureList: [{
			signatureName: '',
			authNo: ''
		}, {
			signatureName: '',
			authNo: ''
		}, {
			signatureName: '',
			authNo: ''
		}, {
			signatureName: '',
			authNo: ''
		}, {
			signatureName: '',
			authNo: ''
		}]
	});
	
	useEffect(() => {
		
		if(!id) return;
		
		(async () => {
			const res = await AMLService.fetchById(id);
			setAml({...res.data})
		})();
		
	}, [id])
	
	const {signatureList} = aml;
	
	const getAuthNo = ({signatureName = '', authNo = ''}) => {
		return `${signatureName} - ${authNo}`
	}
	
	return <CommonLayout>
		<ARMBreadCrumbs>
			<Breadcrumb separator="/">
				<Breadcrumb.Item> <Link to='/planning'> <i className="fas fa-chart-line"/>&nbsp; Planning
				</Link></Breadcrumb.Item>
				
				<Breadcrumb.Item><Link to='/planning/aml'>
					AML List
				</Link>
				</Breadcrumb.Item>
				
				<Breadcrumb.Item>
					{TITLE}
				</Breadcrumb.Item>
			</Breadcrumb>
		</ARMBreadCrumbs>
		
		<ARMCard
			title={
				getLinkAndTitle(TITLE, '/planning/aml')
			}
		>
			<Row gutter={[12, 12]}>
				<Col sm={24} md={12}>
					<RibbonCard ribbonText="Aircraft Maintenance Log">
						<ViewItem label="Page No">{aml.pageNo}</ViewItem>
						<ViewItem label="Aircraft">{aml.aircraftName}</ViewItem>
						<ViewItem label="From Airport">{aml.fromAirportIataCode}</ViewItem>
						<ViewItem label="To Airport">{aml.toAirportIataCode}</ViewItem>
						<ViewItem label="Captain">{aml.captainName}</ViewItem>
						<ViewItem label="First Officer">{aml.firstOfficerName}</ViewItem>
						<ViewItem label="Flight No">{aml.flightNo}</ViewItem>
						<ViewItem label="Date">{aml.date}</ViewItem>
					</RibbonCard>
					
					<RibbonCard ribbonText="Fuel uplift Cross check">
						<ViewItem label="Refueling Vehicle Delivery">{aml.refuelDelivery}</ViewItem>
						<ViewItem label="Specific Gravity">{aml.specificGravity}</ViewItem>
						<ViewItem label="Converted In">{aml.convertedIn}</ViewItem>
					</RibbonCard>
				</Col>
				
				<Col sm={24} md={12}>
					<RibbonCard ribbonText="Certification of Oil and Fuel">
						<ViewItem label={signatureTypes["1"]}>
							{
								signatureList && signatureList.length > 0 && getAuthNo(signatureList[0])
							}
						</ViewItem>
					</RibbonCard>
					
					<RibbonCard ribbonText="Certification for RVSM FLT Sector">
						<ViewItem label={signatureTypes["2"]}>
							{
								signatureList && signatureList.length > 1 && getAuthNo(signatureList[1])
							}
						</ViewItem>
					</RibbonCard>
					
					<RibbonCard ribbonText="Certification for ETOPS FLT">
						<ViewItem label={signatureTypes["3"]}>
							{
								signatureList && signatureList.length > 2 && getAuthNo(signatureList[2])
							}
						</ViewItem>
					</RibbonCard>
					
					<RibbonCard ribbonText="Certification for PRE FLIGHT INSPECTION (PFI)">
						<ViewItem label={signatureTypes["4"]}>
							{
								signatureList && signatureList.length > 3 && getAuthNo(signatureList[3])
							}
						</ViewItem>
						<ViewItem label="PFI Station">{aml.preFlightInspectionIataCode}</ViewItem>
						<ViewItem label="PFI Time">{aml.pfiTime}</ViewItem>
					</RibbonCard>
					
					<RibbonCard ribbonText="Certification of Acceptance for the FLT">
						<ViewItem label={signatureTypes["5"]}>
							{
								signatureList && signatureList.length > 4 && getAuthNo(signatureList[4])
							}
						</ViewItem>
						<ViewItem label="OCA Time">{aml.ocaTime}</ViewItem>
					</RibbonCard>
				</Col>
			</Row>
		</ARMCard>
	</CommonLayout>
}