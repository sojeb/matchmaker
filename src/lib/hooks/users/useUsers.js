import { Form, notification } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setUser } from "../../../reducers/user.reducers";
import RoleService from "../../../service/RoleService";
import UsersService from "../../../service/UsersService";
import { getErrorMessage } from "../../common/helpers";

export default function useUsers() {
  const { id } = useParams();
  const [roleData, setRoleData] = useState([]);
  const [roleId, setRoleId] = useState("");
  const navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    getSingleUser(id);
  }, [id]);

  const getSingleUser = async () => {
    try {
      const { data } = await UsersService.getSingleUser(id);
      console.log("I see a single user value: ", data);
      form.setFieldsValue({ ...data });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRole = async () => {
    const { data } = await RoleService.getAllRole();
    setRoleData(data);
  };

  useEffect(() => {
    getAllRole();
  }, []);

  const handleChange = (e) => {
    setRoleId(e);
  };

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (!id) {
      try {
        const { data } = await UsersService.saveUser(values);
        navigate("/configurations/users");
        notification["success"]({
          message: "Successfully added an user",
        });
      } catch (error) {
        notification["error"]({
          message: getErrorMessage(error),
        });
      }
    } else {
      try {
        const { data } = await UsersService.updateUser(id, values);
        navigate("/configurations/users");
        notification["success"]({
          message: "Successfully updated an user",
        });
      } catch (error) {
        notification["error"]({
          message: getErrorMessage(error),
        });
      }
    }
  };

  const handleLogOut = async () => {
    try {
      await UsersService.logOut();
      localStorage.removeItem("userId");
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(""));
      navigate("/login");
    } catch (e) {
      notification["error"]({
        message: getErrorMessage(e),
      });
    }
  };

  return {
    onFinish,
    form,
    id,
    handleChange,
    roleData,
    roleId,
    handleLogOut,
  };
}
