import { Form, notification } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AircraftModelFamilyService from "../../../service/AircraftModelFamilyService";
import AircraftService from "../../../service/AircraftService";
import SeatingConfigurationService from "../../../service/SeatingConfigurationService";
import { getErrorMessage } from "../../common/helpers";

export function useAircrafts() {
  const [aircrafts, setAircrafts] = useState([]);
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const cardTitle = id ? "Aircraft Edit" : "Aircraft Add";
  const [aircraftModelFamilies, setAircraftModelFamilies] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const res = await AircraftService.getAllAircraft(true);
      setAircrafts(res.data.model.map(({ id, aircraftName }) => ({ id, name: aircraftName })));
    })();
  }, []);
  const allAircraftModels = async () => {
    try {
      const { data } = await AircraftModelFamilyService.getAllAircraftModels(60, {
        query: "",
        isActive: true,
      });
      setAircraftModelFamilies(data.model);
    } catch (error) {
      console.log("aircarft save error: ", error);
      notification["error"]({ message: getErrorMessage(error) });
    }
  };

  const getAircraftById = async (id) => {
    try {
      const { data } = await AircraftService.getAircraftById(id);
      form.setFieldsValue({
        ...data,
        manufactureDateTime: moment(data.manufactureDateTime),
      });
    } catch (error) {
      notification["error"]({ message: getErrorMessage(error) });
    }
  };

  const saveAircraft = async (values) => {
    try {
      await AircraftService.saveAircraft(values);
      notification["success"]({
        message: "Aircraft saved successfully",
      });
      form.resetFields();
      navigate(-1);
    } catch (error) {
      notification["error"]({ message: getErrorMessage(error) });
    }
  };

  const updateAircraft = async (id, data) => {
    try {
      await AircraftService.updateAircraft(id, data);
      notification["success"]({
        message: "Aircraft updated successfully",
      });
      form.resetFields();
      navigate(-1);
    } catch (error) {
      notification["error"]({ message: getErrorMessage(error) });
    }
  };

  const onReset = () => {
    if (id) {
      getAircraftById(id);
    } else {
      form.resetFields();
    }
  };

  const onFinish = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      manufactureDateTime: fieldsValue["manufactureDateTime"]?.format("YYYY-MM-DD HH:mm:ss"),
    };
    id ? updateAircraft(id, values) : saveAircraft(values);
  };
  useEffect(() => {
    allAircraftModels();
  }, [id]);

  useEffect(() => {
    id && getAircraftById(id);
  }, [id]);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = async () => {
    const data = { aircraftModelName: name };
    if (data.aircraftModelName !== "") {
      await AircraftModelFamilyService.saveAircraftModelName(data);
      notification["success"]({
        message: "Aircraft model saved successfully",
      });
      allAircraftModels();
      setName("");
    } else {
      notification["error"]({
        message: "Aircraft model name can not be empty",
      });
    }
  };

  return {
    aircrafts,
    id,
    form,
    navigate,
    cardTitle,
    allAircraftModels,
    onReset,
    onFinish,
    aircraftModelFamilies,
    onNameChange,
    addItem,
    name,
  };
}

export function useSeatingConfiguration() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [form] = Form.useForm();
  const [aircraft, setAircraft] = useState([]);
  const [cabin, setCabin] = useState([]);

  const getAllAircraft = async () => {
    const { data } = await SeatingConfigurationService.getAllAircraft();
    setAircraft(data.model);
  };
  const getAllCabin = async () => {
    const { data } = await SeatingConfigurationService.getAllCAbin();
    setCabin(data);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (values) => {
    if (id) {
      try {
        const single = {
          aircraftCabinId: values.aircraftCabinId,
          noOfSeats: values.noOfSeats,
        };
        const { data } = await SeatingConfigurationService.updateSeatingConfiguration(id, single);
        navigate("/planning/seating/configurations");
        notification["success"]({
          message: "Seating configuration successfully updated",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    } else {
      try {
        const { data } = SeatingConfigurationService.saveSeatingConfiguration(values);
        navigate("/planning/seating/configurations");
        notification["success"]({
          message: "Seating configuration successfully created",
        });
      } catch (er) {
        notification["error"]({ message: getErrorMessage(er) });
      }
    }
  };
  const loadSingleData = async (id) => {
    const { data } = await SeatingConfigurationService.singleData(id);
    form.setFieldsValue({
      cabinId: data.cabinInfo,
      aircraftId: data.aircraftName,
      noOfSeats: data.numOfSeats,
    });
  };
  useEffect(() => {
    loadSingleData(id);
  }, [id]);
  useEffect(() => {
    getAllAircraft();
    getAllCabin();
  }, []);

  return {
    id,
    form,
    onFinish,
    cabin,
    aircraft,
    onReset,
    getAllAircraft,
  };
}

export function useAircraftsModal() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { getAllAircraft } = useSeatingConfiguration();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getAllAircraft();
  }, [getAllAircraft]);

  const onFinish = async (values) => {
    try {
      const { data } = await AircraftService.saveAircraft(values);
      notification["success"]({
        message: "Aircraft saved successfully",
      });

      // const aircraftsId = data.id;

      // const newAircrafts = {
      //   aircraftName: values.aircraftName,
      //   aircraftsId,
      // };

      // setAircraft((prevState) => [newAircrafts, ...prevState]);

      // form.setFieldsValue({ aircraftsId: aircraftsId });
      getAllAircraft();
      setIsModalVisible(false);
    } catch (error) {
      notification["error"]({ message: getErrorMessage(error) });
    }
  };
  return { form, onFinish, showModal, isModalVisible, setIsModalVisible, handleCancel };
}
