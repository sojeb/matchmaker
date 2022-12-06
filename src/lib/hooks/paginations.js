import { useDispatch, useSelector } from "react-redux";
import API from "../../service/Api";
import {
  paginationObjectTemplate,
  setIsActive as setIsActivePagination,
  setPagination,
} from "../../reducers/paginate.reducers";
import { useEffect } from "react";
import { Form } from "antd";

export const refreshPagination = (key, url) => async (dispatch, getState) => {
  const state = getState();
  const obj = paginationSelector(key)(state);
  const { model, ...params } = obj;
  dispatch(fetchPagination(key, url, params));
};

export const fetchPagination = (key, url, params) => async (dispatch) => {
  const response = await API.post(url, params, {
    params: {
      page: params.page,
      size: params.size,
    },
  });
  dispatch(setPagination({ key, data: { ...response.data, ...params } }));
};

const paginationSelector = (key) => (state) => {
  if (state.pagination.hasOwnProperty(key)) {
    return state.pagination[key];
  }

  return paginationObjectTemplate;
};

export function usePaginate(key, url) {
  const dispatch = useDispatch();
  const data = useSelector(paginationSelector(key));
  const [form] = Form.useForm();
  const {
    model: collection,
    currentPage,
    totalPages,
    totalElements,
    page,
    isActive,
    size,
  } = data;

  const setIsActive = (isActive) => {
    dispatch(setIsActivePagination({ key, isActive }));
    const values = form.getFieldsValue();
    fetchData({ isActive, ...values });
  };

  const fetchData = (params = {}) => {
    const data = {
      page: 1,
      size: 10,
      isActive,
      ...params,
    };

    dispatch(fetchPagination(key, url, data));
  };

  useEffect(() => {
    const { model, ...rest } = data;
    console.log({ rest });
    form.setFieldsValue({ ...rest });

    if (!collection?.length) {
      dispatch(setPagination({ key, data: paginationObjectTemplate }));
      fetchData();
    }
  }, []);

  const paginate = (page) => {
    const values = form.getFieldsValue();
    fetchData({ isActive, page, ...values });
  };

  const refreshPagination = () => {
    const values = form.getFieldsValue();
    fetchData({ isActive, page, ...values });
  };

  const resetFilter = () => {
    form.resetFields();
    fetchData({
      isActive,
      page: 1,
    });
  };

  return {
    form,
    paginate,
    page,
    fetchData,
    collection,
    currentPage,
    totalPages,
    totalElements,
    isActive,
    setIsActive,
    refreshPagination,
    resetFilter,
    size: Number(size),
  };
}
