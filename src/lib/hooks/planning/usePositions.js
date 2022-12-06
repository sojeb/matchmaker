import { Form, notification } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import LocationsService from "../../../service/planning/configurations/LocationsService";
import PositionsService from "../../../service/planning/configurations/PositionsService";
import { getErrorMessage } from "../../common/helpers";

export function usePostions() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const [isActive, setIsActive] = useState(true);
  const [position, setPosition] = useState({});
  const [allPositions, setAllPositions] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getAllPositions();
  }, [isActive, currentPage]);

  useEffect(() => {
    getSinglePosition();
  }, [id]);

  const getAllPositions = async () => {
    try {
      const { data } = await PositionsService.getAllPositions(isActive, currentPage);
      setAllPositions(data.model);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (e) {
      notification["error"]({
        message: getErrorMessage(e),
      });
    }
  };

  const onFinish = async (values) => {
    if (!id) {
      try {
        const { data } = await PositionsService.savePosition(values);
        notification["success"]({
          message: "Successfully added position",
        });
        navigate("/planning/positions");
      } catch (e) {
        notification["error"]({
          message: getErrorMessage(e),
        });
      }
    } else {
      try {
        const { data } = await PositionsService.updatePosition(id, values);
        notification["success"]({
          message: "Successfully updated position",
        });
        navigate("/planning/positions");
      } catch (e) {
        notification["error"]({
          message: getErrorMessage(e),
        });
      }
    }
  };

  const handleReset = () => {
    if (id) {
      form.setFieldsValue({ ...position });
    } else {
      form.resetFields();
    }
  };

  const getSinglePosition = async () => {
    const { data } = await PositionsService.getSinglePosition(id);
    setPosition({ ...data });
    form.setFieldsValue({ ...data });
  };

  const handleStatus = async (id, isActive) => {
    try {
      const { data } = await PositionsService.toggleStatus(id, isActive);
      getAllPositions();
      notification["success"]({
        message: "Status changed successfully!",
      });
    } catch (er) {
      notification["error"]({ message: getErrorMessage(er) });
    }
  };

  return {
    id,
    allPositions,
    form,
    handleReset,
    onFinish,
    isActive,
    setIsActive,
    handleStatus,
    totalPages,
    currentPage,
    setCurrentPage,
  };
}
