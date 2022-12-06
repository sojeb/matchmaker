import { Form, notification } from "antd";
import { useEffect, useState } from "react";
import UsersService from "../../../service/UsersService";
import { getErrorMessage } from "../../common/helpers";

export function useUsersSearch() {
  const [allUsers, setAllUsers] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllUsers();
    onFinish();
  }, []);

  const getAllUsers = async () => {
    try {
      const { data } = await UsersService.getAllUsers();
      setAllUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    onFinish();
  }, [isActive]);

  const onFinish = async (values) => {
    const searchValue = {
      isActive: isActive,
      firstName: values ? values.firstName : "",
      roleId: values ? values.roleId : "",
    };
    try {
      const { data } = await UsersService.searchUsers(searchValue);
      setAllUsers(data.model);
    } catch (error) {
      console.log(error);
    }
  };

  const onActiveStatus = async (values) => {
    try {
      console.log(values);
    } catch (e) {
      console.log(e);
    }
  };

  const handleStatus = async (id, isActive) => {
    try {
      const { data } = await UsersService.toggleStatus(id, isActive);
      await onFinish(isActive);
      notification["success"]({
        message: "Status changed successfully!",
      });
    } catch (er) {
      notification["error"]({ message: getErrorMessage(er) });
    }
  };

  return {
    allUsers,
    setAllUsers,
    getAllUsers,
    onFinish,
    form,
    isActive,
    setIsActive,
    onActiveStatus,
    handleStatus,
  };
}
