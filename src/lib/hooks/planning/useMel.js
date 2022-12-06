import { Form, notification } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import MelService from "../../../service/planning/MelService";
import { getErrorMessage } from "../../common/helpers";

export function useMel() {
  const [aml, setAml] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [defects, setDefects] = useState([]);
  const [rects, setRects] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getDefectRect();
  }, []);

  const getDefectRect = async () => {
    const { data } = await MelService.getAml();
    setAml(data.model);
  };

  const handleDefectSearch = async (e) => {
    const pageNo = e.target.innerText;
    try {
      const { data } = await MelService.searchDefect({ pageNo: pageNo, isActive: true });
      setDefects(data.model);
    } catch (e) {
      notification["error"]({ message: getErrorMessage(e) });
    }
  };

  const handleRectSearch = async (e) => {
    const pageNo = e.target.innerText;
    try {
      const { data } = await MelService.searchRect({ pageNo: pageNo, isActive: true });
      setRects(data.model);
    } catch (e) {
      notification["error"]({ message: getErrorMessage(e) });
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const handleReset = () => {
    form.resetFields();
  };

  return {
    aml,
    isActive,
    setIsActive,
    handleDefectSearch,
    handleRectSearch,
    defects,
    rects,
    onFinish,
    handleReset,
    form,
  };
}
