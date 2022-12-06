import { Form, notification } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationsService from "../../../service/planning/configurations/LocationsService";
import { getErrorMessage } from "../../common/helpers";

export function useLocations() {
  const [form] = Form.useForm();
  const [isActive, setIsActive] = useState(true);
  const [location, setLocation] = useState({});

  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [allLocations, setAllLocations] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
 
  useEffect(() => {
    getAllLocation();
  }, [isActive, currentPage]);

  const getAllLocation = async () => {
    try {
      const { data } = await LocationsService.getAllLocations(isActive, currentPage);
      setAllLocations(data.model);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (e) {
      notification["error"]({
        message: getErrorMessage(e),
      });
    }
  };

  const getSingleLocation = async (id) => {
    try {
      const { data } = await LocationsService.getSingleLocation(id);
      console.log(data);
      setLocation(data);
    } catch (e) {
      notification["error"]({
        message: getErrorMessage(e),
      });
    }
  };

  const singleLocation = useCallback(async () => {
    if (id === undefined) return;
    try {
      const { data } = await LocationsService.getSingleLocation(id);
      form.setFieldsValue({ ...data });
    } catch (e) {
      notification["error"]({
        message: getErrorMessage(e),
      });
    }
  }, [id]);

  useEffect(() => {
    singleLocation();
  }, [singleLocation]);

  const onFinish = async (values) => {
    if (!id) {
      try {
        const { data } = await LocationsService.saveLocation(values);
        navigate("/planning/locations");
        notification["success"]({
          message: "Successfully added location",
        });
      } catch (error) {
        notification["error"]({
          message: getErrorMessage(error),
        });
      }
    } else {
      try {
        const { data } = await LocationsService.updateLocation(id, values);
        navigate("/planning/locations");
        notification["success"]({
          message: "Successfully updated location",
        });
      } catch (error) {
        notification["error"]({
          message: getErrorMessage(error),
        });
      }
    }
  };

  const handleStatus = async (id, isActive) => {
    try {
      const { data } = await LocationsService.toggleStatus(id, isActive);
      getAllLocation();
      notification["success"]({
        message: "Status changed successfully!",
      });
    } catch (er) {
      notification["error"]({ message: getErrorMessage(er) });
    }
  };

  return {
    id,
    isActive,
    setIsActive,
    getSingleLocation,
    location,
    onFinish,
    form,
    getAllLocation,
    allLocations,
    handleStatus,
    totalPages,
    setTotalPages,
    currentPage,
    setCurrentPage,
  };
}
