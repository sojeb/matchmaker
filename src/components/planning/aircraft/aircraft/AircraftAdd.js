import CommonLayout from "../../../layout/CommonLayout";
import { Breadcrumb, Space } from "antd";
import ARMCard from "../../../common/ARMCard";
import { Link } from "react-router-dom";
import { getLinkAndTitle } from "../../../../lib/common/TitleOrLink";
import ARMBreadCrumbs from "../../../common/ARMBreadCrumbs";
import { useAircrafts } from "../../../../lib/hooks/planning/aircrafts";
import ARMAircraftAdd from "../../../../lib/common/planning/ARMAircraftAdd";

const AircraftAdd = () => {const { onNameChange, addItem, id, cardTitle, aircraftModelFamilies, name, onFinish, form, onReset } = useAircrafts();


  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <Link to="/planning">
              <i className="fas fa-chart-line" />
              &nbsp; Planning
            </Link>
          </Breadcrumb.Item>

          <Breadcrumb.Item>
            <Link to="/planning/aircraft">Aircrafts</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{id ? "Edit" : "Add"}</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>

      <Space
        direction="vertical"
        size="medium"
        style={{
          display: "flex",
        }}
      >
        <ARMCard title={getLinkAndTitle(cardTitle, "/planning/aircraft/")}>
          <ARMAircraftAdd onNameChange={onNameChange} addItem={addItem} id={id} aircraftModelFamilies={aircraftModelFamilies} name={name} onFinish={onFinish} form={form} onReset={onReset} />
        </ARMCard>
      </Space>
    </CommonLayout>
  );
};

export default AircraftAdd;
