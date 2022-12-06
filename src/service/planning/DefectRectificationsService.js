import axiosInstance from "./../Api";

const GET_ALL_AML = "/aircraft-maintenance-log";
const SAVE_DEFECT_RECT = "/aml-defect-rectification/bulk-create";
const GET_SINGLE_DEFECT_RECT = "/aml-defect-rectification/";
const SEARCH_DEFECT_RECT = "/aml-defect-rectification/search";

class DefectRectService {
  getAllAml() {
    return axiosInstance.get(GET_ALL_AML);
  }

  saveDefectRect(data) {
    return axiosInstance.post(SAVE_DEFECT_RECT, data);
  }

  getAllDefectRect(active, currentPage) {
    return axiosInstance.get(`/aml-defect-rectification?active=${active}&page=${currentPage}&size=10`);
  }

  getSingleDefectRect(id) {
    return axiosInstance.get(GET_SINGLE_DEFECT_RECT + id);
  }

  updateDefectRect(id, data) {
    return axiosInstance.put(GET_SINGLE_DEFECT_RECT + id, data);
  }

  toggleDefectRectStatus(id, status) {
    return axiosInstance.patch(`/aml-defect-rectification/${id}?active=${status}`);
  }

  searchDefectRect(values) {
    return axiosInstance.post(SEARCH_DEFECT_RECT, values);
  }

}

export default new DefectRectService();
