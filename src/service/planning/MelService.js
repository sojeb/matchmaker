import axiosInstance from "./../Api";

const GET_AML = "/aircraft-maintenance-log";
const SEARCH_AML = "/aml-defect-rectification/search";

class MelService {
  getAml() {
    return axiosInstance.get(GET_AML);
  }

  searchDefect(values){
    return axiosInstance.post(SEARCH_AML, values);
  }

  searchRect(values){
    return axiosInstance.post(SEARCH_AML, values);
  }

//   SaveDefectRect(data) {
//     return axiosInstance.post(SAVE_DEFECT_RECT, data);
//   }

//   GetAllDefectRect(active, currentPage) {
//     return axiosInstance.get(`/aml-defect-rectification?active=${active}&page=${currentPage}&size=10`);
//   }

//   GetSingleDefectRect(id) {
//     return axiosInstance.get(GET_SINGLE_DEFECT_RECT + id);
//   }

//   UpdateDefectRect(id, data) {
//     return axiosInstance.put(GET_SINGLE_DEFECT_RECT + id, data);
//   }

//   toggleDefectRectStatus(id, status) {
//     return axiosInstance.patch(`/aml-defect-rectification/${id}?active=${status}`);
//   }
}

export default new MelService();
