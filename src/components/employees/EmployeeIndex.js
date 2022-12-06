import CommonLayout from "../layout/CommonLayout";
import {Card, List, Row, Col, Space} from "antd";
import {Link} from "react-router-dom";
import ARMCard from "../common/ARMCard";

const employeeSubmodules = [


    {
        name: 'Configurations',
        features: [
            { name: 'Department', url: 'departments'},
            { name: 'Section', url: 'sections'},
            { name: 'Designation', url: 'designations'},
            { name: 'Employee', url: 'employee'},

        ]
    },



]

export default function EmployeeIndex() {
    return (
        <CommonLayout>
            <Row gutter={[6, 6]}>

                {
                    employeeSubmodules.map(subModule => (
                        <Col md={6} sm={12} xs={24}>
                            <ARMCard title={subModule.name.toUpperCase()}>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={subModule.features}
                                    renderItem={item => (
                                        <List.Item>
                                            <Link to={`/employees/${item.url}`}>
                                                {item.name}
                                            </Link>
                                        </List.Item>
                                    )}
                                />
                            </ARMCard>
                        </Col>
                    ))
                }
            </Row>

        </CommonLayout>
    )
}