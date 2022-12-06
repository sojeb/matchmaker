import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  PlusOutlined,
  RollbackOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  notification,
} from "antd";
import { Option } from "antd/lib/mentions";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getErrorMessage } from "../../../lib/common/helpers";
import { getLinkAndTitle } from "../../../lib/common/TitleOrLink";
import CabinService from "../../../service/CabinService";
import ActiveInactive from "../../common/ActiveInactive";
import ARMBreadCrumbs from "../../common/ARMBreadCrumbs";
import ARMCard from "../../common/ARMCard";
import ARMTable from "../../common/ARMTable";
import ARMButton from "../../common/buttons/ARMButton";
import CommonLayout from "../../layout/CommonLayout";

const CabinList = () => {
  const handleDelete = (id) => {};
  const [isActive, setIsActive] = useState(true);
  const [cabin, setCabin] = useState([]);
  const [active, setActive] = useState(true);

  const allInactiveCabin = async () => {
    if (isActive == false) {
      const { data } = await CabinService.getAllCabin();
      let temp = [];
      data.map((item, index) => {
        if (item.activeStatus == false) {
          temp.push(item);
        }
      });
      setCabin(temp);
    } else {
      console.log("error");
    }
  };

  const getAllCabin = async () => {
    try {
      if (isActive == true) {
        const { data } = await CabinService.getAllCabin();
        let temp = [];
        data.map((item, index) => {
          if (item.activeStatus == true) {
            temp.push(item);
          }
        });
        setCabin(temp);
      } else {
        console.log("error");
      }
    } catch (er) {}
  };
  const handleStatus = async (id) => {
    const { data } = await CabinService.singleData(id);
    if (data.isActive == true) {
      try {
        const single = {
          cabinId: id,
          activeStatus: false,
        };
        const { data } = await CabinService.changeStatus(single);
        getAllCabin();
        notification["success"]({
          message: "Cabin inactivated successfully",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    } else {
      try {
        const single = {
          cabinId: id,
          activeStatus: true,
        };
        const { data } = await CabinService.changeStatus(single);
        notification["success"]({
          message: "Cabin activated successfully",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    }
  };
  useEffect(() => {
    if (isActive == false) {
      allInactiveCabin();
    }
  });

  useEffect(() => {
    getAllCabin();
  }, [isActive == true]);
  return (
    <CommonLayout>
      <ARMBreadCrumbs>
        <Breadcrumb separator="/">
          <Breadcrumb.Item>
            <i className="fas fa-chart-line" />
            <Link to="/planning">&nbsp; Planning</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Cabins</Breadcrumb.Item>
        </Breadcrumb>
      </ARMBreadCrumbs>
      <ARMCard title={getLinkAndTitle("CABINS", "/planning/add/cabin", true)}>
        <ActiveInactive isActive={isActive} setIsActive={setIsActive} />

        <Row className="table-responsive">
          <ARMTable>
            <thead>
              <tr>
                <th>Cabin</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cabin.map((cabin, index) => (
                <tr key={index}>
                  <td>{cabin.codeTitle}</td>

                  <td>
                    <Space size="small">
                      <Link to={`/planning/edit/cabin/${cabin.cabinId}`}>
                        <ARMButton
                          type="primary"
                          size="small"
                          style={{
                            backgroundColor: "#6e757c",
                            borderColor: "#6e757c",
                          }}
                        >
                          <EditOutlined />
                        </ARMButton>
                      </Link>
                      {cabin.activeStatus == true ? (
                        <Popconfirm
                          title="Are you sure want to inactive this ?"
                          onConfirm={() => handleStatus(cabin.cabinId)}
                        >
                          <ARMButton
                            type="primary"
                            size="small"
                            style={{
                              backgroundColor: "#53a351",
                              borderColor: "#53a351",
                            }}
                          >
                            <UnlockOutlined />
                          </ARMButton>
                        </Popconfirm>
                      ) : (
                        <Popconfirm
                          title="Are you sure want to active this ?"
                          onConfirm={() => handleStatus(cabin.cabinId)}
                        >
                          <ARMButton
                            type="primary"
                            size="small"
                            style={{
                              backgroundColor: "#FF0000",
                              borderColor: "#53a351",
                            }}
                          >
                            <UnlockOutlined />
                          </ARMButton>
                        </Popconfirm>
                      )}
                    </Space>
                  </td>
                </tr>
              ))}
            </tbody>
          </ARMTable>
        </Row>
      </ARMCard>
    </CommonLayout>
  );
};

export default CabinList;
