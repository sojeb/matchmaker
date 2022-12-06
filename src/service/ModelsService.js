import axiosInstance from "./Api";
const SAVE_MODELS = "model";
const UPDATE_MODELS = "model";
const GET_ALL_AIRCRAFT = "aircraft/models";
const SINGLE_DATA = "model";
const GET_ALL_MODELS = "model";
const MODEL_TYPE = "model-type";
class ModelsService {
  getAllAircraftModel() {
    return axiosInstance.get(GET_ALL_AIRCRAFT);
  }
  saveModels(values) {
    return axiosInstance.post(SAVE_MODELS, values);
  }
  updateModels(id, value) {
    return axiosInstance.put(UPDATE_MODELS + "/" + id, value);
  }
  getAllModels(active) {
    return axiosInstance.get(`model?page=1&size=10&active=${active}`);
  }

  singleData(id) {
    return axiosInstance.get(SINGLE_DATA + "/" + id);
  }
  changeStatus(id, isActive) {
    return axiosInstance.patch(`model/${id}?active=${isActive}`);
  }
  searchModels(values) {
    return axiosInstance.post(`model/search?page=1&size=10`, values);
  }
  getAllModelType() {
    return axiosInstance.get(MODEL_TYPE);
  }
}
export default new ModelsService();
