import { Form, notification } from "antd";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AirportService from "../../../service/AirportService";
import SignaturesService from "../../../service/planning/configurations/SignaturesService";
import DefectRectificationsService from "../../../service/planning/DefectRectificationsService";
import { getErrorMessage } from "../../common/helpers";
import moment from "moment";
import DateTimeConverter from "../../../converters/DateTimeConverter";

export function useDefect() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [isActive, setIsActive] = useState(true);
  const [airports, setAirports] = useState([]);
  const [signatures, setSignatures] = useState([]);
  const [aml, setAml] = useState([]);
  const navigate = useNavigate();
  const [allDefectRect, setAllDefectRect] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [singleDefectRect, setSingleDefectRect] = useState({});

  useEffect(() => {
    getAllSignatures();
    getAllAirports();
    getAllAml();
  }, []);

  const getAllSignatures = async () => {
    try {
      const { data } = await SignaturesService.getAllSignatures(isActive);
      setSignatures(data.model);
    } catch (e) {
      notification["error"]({
        message: getErrorMessage(e),
      });
    }
  };

  const getAllAirports = async () => {
    try {
      const { data } = await AirportService.getAllAirport();
      setAirports(data);
    } catch (e) {
      notification["error"]({
        message: getErrorMessage(e),
      });
    }
  };

  const getAllAml = async () => {
    try {
      const { data } = await DefectRectificationsService.getAllAml();
      setAml(data.model);
    } catch (e) {
      notification["error"]({
        message: getErrorMessage(e),
      });
    }
  };

  const handleReset = () => {
    if (id) {
      form.setFieldsValue({ ...singleDefectRect, defectSignTime: DateTimeConverter.stringToMomentDateTime(singleDefectRect.defectSignTime), rectSignTime: DateTimeConverter.stringToMomentDateTime(singleDefectRect.rectSignTime) });
    } else {
      form.resetFields();
    }
  };

  const onFinish = async (values) => {
    const customValues = [
      {
        ...values[0],
        amlId: values.amlId,
        defectSignTime: DateTimeConverter.momentDateTimeToString(values[0].defectSignTime),
        rectSignTime: DateTimeConverter.momentDateTimeToString(values[0].rectSignTime),
      },
      {
        ...values[1],
        amlId: values.amlId,
        defectSignTime: DateTimeConverter.momentDateTimeToString(values[1].defectSignTime),
        rectSignTime: DateTimeConverter.momentDateTimeToString(values[1].rectSignTime),
      },
    ];
    if (!id) {
      const { data } = await DefectRectificationsService.saveDefectRect(customValues);
      navigate("/planning/defect-rectifications");
      notification["success"]({
        message: "Successfully added defects & rectifications",
      });
    } else {
      const { data } = await DefectRectificationsService.updateDefectRect(id, customValues);
      navigate("/planning/defect-rectifications");
      notification["success"]({
        message: "Successfully updated defects & rectifications",
      });
    }
  };

  useEffect(() => {
    getAllDefectRect();
  }, [isActive, currentPage]);

  const getAllDefectRect = async () => {
    const { data } = await DefectRectificationsService.getAllDefectRect(isActive, currentPage);
    setTotalPages(data.totalPages);
    setCurrentPage(data.currentPage);
    setAllDefectRect(data.model);
  };

  const handleStatus = async (id, status) => {
    try {
      const { data } = await DefectRectificationsService.toggleDefectRectStatus(id, status);
      getAllDefectRect();
      notification["success"]({
        message: "Status changed successfully!",
      });
    } catch (er) {
      notification["error"]({ message: getErrorMessage(er) });
    }
  };

  const getSingleDefectRect = useCallback(async () => {
    if (id === undefined) return;
    if (!id) return;
    try {
      const { data } = await DefectRectificationsService.getSingleDefectRect(id);
      form.setFieldsValue({ ...data, defectSignTime: DateTimeConverter.stringToMomentDateTime(data.defectSignTime), rectSignTime: DateTimeConverter.stringToMomentDateTime(data.rectSignTime) });
      setSingleDefectRect(data);
    } catch (e) {
      notification["error"]({
        message: getErrorMessage(e),
      });
    }
  }, [id]);

  useEffect(() => {
    getSingleDefectRect();
  }, [getSingleDefectRect]);

  const onSearch = async (values) => {
    try {
      const { data } = await DefectRectificationsService.searchDefectRect({ pageNo: values.pageNo, isActive: true });
      setAllDefectRect(data.model);
    } catch (e) {
      notification["error"]({ message: getErrorMessage(e) });
    }
  };

  return {
    form,
    isActive,
    setIsActive,
    signatures,
    airports,
    onFinish,
    id,
    aml,
    allDefectRect,
    totalPages,
    currentPage,
    setCurrentPage,
    handleStatus,
    singleDefectRect,
    handleReset,
    onSearch,
  };
}
