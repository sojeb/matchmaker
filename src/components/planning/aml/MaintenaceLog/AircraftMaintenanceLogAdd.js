import { useAMLAdd } from "../../../../lib/hooks/planning/aml";
import useSignatures from "../../../../lib/hooks/planning/signatures";
import CommonLayout from "../../../layout/CommonLayout";
import ARMBreadCrumbs from "../../../common/ARMBreadCrumbs";
import { Breadcrumb, Col, Collapse, Form, Row, Space } from "antd";
import { Link } from "react-router-dom";
import ARMCard from "../../../common/ARMCard";
import { getLinkAndTitle } from "../../../../lib/common/TitleOrLink";
import ARMForm from "../../../../lib/common/ARMForm";
import { formLayout } from "../../../../lib/constants/form";
import AMLFormBasicInfo from "../AMLFormBasicInfo";
import AmlFuelUpliftCrossCheck from "../AmlFuelUpliftCrossCheck";
import AMLOilAndFuelCertification from "../AMLOilAndFuelCertification";
import AMLRVSMAndFLTCertification from "../AMLRVSMAndFLTCertification";
import AmlEtopsFltCertification from "../AmlEtopsFltCertification";
import AmlPFICertification from "../AmlPFICertification";
import AmlAcceptanceForTheFLTCertification from "../AmlAcceptanceForTheFLTCertification";
import ARMButton from "../../../common/buttons/ARMButton";
import React from "react";
import { SIGN_TYPES } from "../AMLAdd";
import FlightDataForm from "./FlightDataForm";
import AmlOilRecord from "./AmlOilRecord";
import DefectRectificationsForm from "./DefectRectificationsForm";

export default function AircraftMaintenanceLogAdd() {
	const {id, form, aircrafts, airports, employees, amls, onReset, onFinish, submitting} = useAMLAdd();
	const {signatures} = useSignatures();
	const TITLE = id ? 'AML Edit' : 'AML Add';
	
	const getCollapsible = () => {
		return !!id ? "header" : "disabled";
	}
	
	return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            {" "}
            <Link to="/planning">
              {" "}
              <i className="fas fa-chart-line" />
              &nbsp; Planning
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to="/planning/aml">AML</Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>{TITLE}</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>

      <ARMCard title={getLinkAndTitle(TITLE, "/planning/aml")}>
        <Collapse>
          <Collapse.Panel key="aml" header="AML">
            <ARMForm
              {...formLayout}
              form={form}
              name="aml"
              onFinish={onFinish}
              initialValues={{
                referenceAmlId: "",
                aircraftId: "",
                fromAirportId: "",
                toAirportId: "",
                preFlightInspectionAirportId: "",
                captainId: "",
                foId: "",
                pfiTime: "",
                ocaTime: "",
                pageNo: "", // mandatory
                flightNo: "",
                date: "", // mandatory
                refuelDelivery: "",
                specificGravity: "",
                convertedIn: "",
                isActive: true,
                maintenanceLogSignatureDtoList: [
                  {
                    amlSignatureId: "",
                    signatureId: "",
                    signatureType: SIGN_TYPES.CERTIFICATION_FOR_OIL_AND_FUEL,
                  },
                  {
                    amlSignatureId: "",
                    signatureId: "",
                    signatureType: SIGN_TYPES.CERTIFICATION_FOR_RVSM_FLT,
                  },
                  {
                    amlSignatureId: "",
                    signatureId: "",
                    signatureType: SIGN_TYPES.CERTIFICATION_FOR_ETOPS_FLT,
                  },
                  {
                    amlSignatureId: "",
                    signatureId: "",
                    signatureType: SIGN_TYPES.CERTIFICATION_FOR_PFI,
                  },
                  {
                    amlSignatureId: "",
                    signatureId: "",
                    signatureType: SIGN_TYPES.CERTIFICATION_FOR_FLT,
                  },
                ],
              }}
              scrollToFirstError
            >
              <Row gutter={[12, 12]}>
                <Col sm={24} md={12}>
                  <AMLFormBasicInfo amls={amls} employees={employees} aircrafts={aircrafts} airports={airports} />

                  <AmlFuelUpliftCrossCheck />
                </Col>

                <Col sm={24} md={12}>
                  <AMLOilAndFuelCertification signatures={signatures} />

                  <AMLRVSMAndFLTCertification signatures={signatures} />

                  <AmlEtopsFltCertification signatures={signatures} />

                  <AmlPFICertification signatures={signatures} airports={airports} />

                  <AmlAcceptanceForTheFLTCertification signatures={signatures} />
                </Col>
              </Row>

              <Row>
                <Col sm={24} md={12}>
                  <Form.Item wrapperCol={{ ...formLayout.wrapperCol, offset: 8 }}>
                    <Space>
                      <ARMButton loading={submitting} size="small" type="primary" htmlType="submit">
                        {id ? "Update" : "Add"}
                      </ARMButton>
                      <ARMButton onClick={onReset} size="small" type="primary" danger>
                        Reset
                      </ARMButton>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </ARMForm>
          </Collapse.Panel>

          <Collapse.Panel collapsible={getCollapsible()} key="defectAndRectification" header="Defect And Rectification">
            <DefectRectificationsForm />
          </Collapse.Panel>

          <Collapse.Panel collapsible={getCollapsible()} key="flightData" header="Flight Data">
            <FlightDataForm />
          </Collapse.Panel>

          <Collapse.Panel collapsible={getCollapsible()} key="oilRecords" header="Oil Records">
            <AmlOilRecord />
          </Collapse.Panel>
        </Collapse>
      </ARMCard>
    </CommonLayout>
  );
}