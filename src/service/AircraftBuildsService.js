import axiosInstance from "./Api";
const GET_ALL_AIRCRAFT = "aircrafts";
const GET_ALL_HIGHER_MODEL_BY_AIRCRAFTID = "model/aircraft";
const GET_ALL_MODEL_BY_HIGHER_MODELID = "model-tree/model";
const GET_ALL_HIGHER_PART_BY_MODELID = "part/model";
const GET_ALL__PART_BY_MODELID = "part/model";
const SAVE_AIRCRAFT_BUILD = "aircraft-build";
const GET_LOCATION_AND_POSITION_BY_HIGHER_MODEL_AND_MODELID =
  "model-tree/higher-model";
const GET_SINGLE_DATA = "aircraft-build";
class AircraftBuildsService {
  getAllAircraft() {
    return axiosInstance.get(GET_ALL_AIRCRAFT);
  }
  getAllHigherModelByAircraftId(id) {
    return axiosInstance.get(GET_ALL_HIGHER_MODEL_BY_AIRCRAFTID + "/" + id);
  }
  getAllModelByHigherModelId(id) {
    return axiosInstance.get(GET_ALL_MODEL_BY_HIGHER_MODELID + "/" + id);
  }
  getAllHigherPartByModelId(id) {
    return axiosInstance.get(GET_ALL_HIGHER_PART_BY_MODELID + "/" + id);
  }
  getAllPartByModelId(id) {
    return axiosInstance.get(GET_ALL__PART_BY_MODELID + "/" + id);
  }
  saveAircraftBuild(values) {
    return axiosInstance.post(SAVE_AIRCRAFT_BUILD, values);
  }
  singleData(id) {
    return axiosInstance.get(GET_SINGLE_DATA + "/" + id);
  }
  getLocationAndPosition(mId, hId) {
    console.log("test", mId, hId);
    return axiosInstance.get(
      GET_LOCATION_AND_POSITION_BY_HIGHER_MODEL_AND_MODELID +
        "/" +
        hId +
        "/" +
        `model` +
        "/" +
        mId
    );
  }
  updateAircarftBuild(id, values) {
    return axiosInstance.put(SAVE_AIRCRAFT_BUILD + "/" + id, values);
  }
  searchAircraftBuild(values) {
    return axiosInstance.post(`aircraft-build/search?page=1&size=10`, values);
  }
  changeStatus(id, active) {
    return axiosInstance.patch(`aircraft-build/${id}?active=${active}`);
  }
}
export default new AircraftBuildsService();
