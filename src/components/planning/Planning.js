import CommonLayout from "../layout/CommonLayout";
import { Card, List, Row, Col, Space } from "antd";
import { Link } from "react-router-dom";
import ARMCard from "../common/ARMCard";

const planningSubmodules = [
  {
    name: "Aircraft",
    features: [
      { name: "Aircrafts", url: "aircraft" },
      {
        name: "Seating Configurations",
        url: "seating/configurations",
      },
      { name: "Locations", url: "locations" },
      { name: "Positions", url: "positions" },
      { name: "Models", url: "models" },
      { name: "Parts", url: "parts" },
      { name: "Model Trees", url: "model/trees" },
      { name: "Build Aircraft", url: "aircraft/builds" },
    ],
  },
  {
    name: "Configurations",
    features: [
      { name: "Aircraft Model Family", url: "aircraft-model-family" },
      { name: "Airport", url: "airports" },
      { name: "Cabin (Seat Type)", url: "cabins" },
    ],
  },

    {
        name: "Aircraft Maintenance Log",
        features: [
            {name: "AML", url: "aml"},
            {name: "Signatures", url: "signatures"},
            {name: "Flight Data", url: "flight-data"},
            {name: "Oil Records", url: "oil-records"},
            {name: "Defect & Rectifications", url: "defect-rectifications"},
            {name: "Add MEL", url: "mel"},
            {name: "Task Records", url: "task-records"},
        ],
    },

    {
        name: "Reports",
        features: [
            {name: "MEL", url: "mel-view"},
            {
                name: "Daily Flying Hours & Cycles",
                url: "daily-flying-hours-and-cycles",
            },
        ],
    },
];


export default function Planning() {
    return (
        <CommonLayout>
            <Row gutter={[6, 6]}>
                {planningSubmodules.map((subModule) => (
                    <Col key={subModule.name} md={6} sm={12} xs={24}>
                        <ARMCard title={subModule.name?.toUpperCase()}>
                            <List
                                itemLayout="horizontal"
                                dataSource={subModule.features}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Link style={{width: '100%'}} to={`/planning/${item.url}`}>{item.name}</Link>
                                    </List.Item>
                                )}
                            />
                        </ARMCard>
                    </Col>
                ))}
            </Row>
        </CommonLayout>
    );
}
