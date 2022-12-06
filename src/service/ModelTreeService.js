import axiosInstance from "./Api";
const GET_ALL_MODEL = "model";
const GET_ALL_POSITION = "position";
const GET_ALL_LOCATION = "aircraft-location";
const SAVE_MODEL_TREE = "model-tree";
const SINGLE_DATA = "model-tree";
const UPDATE_MODEL_TREE = "model-tree";

class ModelTreeService {
  getAllModels() {
    return axiosInstance.get(GET_ALL_MODEL);
  }
  getAllLocation() {
    return axiosInstance.get(GET_ALL_LOCATION);
  }
  getAllPosition() {
    return axiosInstance.get(GET_ALL_POSITION);
  }
  saveModelTree(values) {
    return axiosInstance.post(SAVE_MODEL_TREE, values);
  }
  updateModelTree(id, values) {
    return axiosInstance.put(UPDATE_MODEL_TREE + "/" + id, values);
  }
  singleData(id) {
    return axiosInstance.get(SINGLE_DATA + "/" + id);
  }
  searchModelTree(values) {
    return axiosInstance.post(`model-tree/search?page=1&size=10`, values);
  }
  changeStatus(id, isActive) {
    return axiosInstance.patch(`model-tree/${id}?active=${isActive}`);
  }
}
export default new ModelTreeService();
